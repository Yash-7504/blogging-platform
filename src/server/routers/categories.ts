import { z } from "zod";
import { db, categories } from "../db";
import { router, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";

const baseCategory = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const categoriesRouter = router({
  list: publicProcedure.query(async () => {
    return await db.select().from(categories).orderBy(categories.name);
  }),
  create: publicProcedure.input(baseCategory).mutation(async ({ input }) => {
    const slug = slugify(input.name);
    const [created] = await db
      .insert(categories)
      .values({ ...input, slug })
      .returning();
    return created;
  }),
  bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
    const [row] = await db.select().from(categories).where(eq(categories.slug, input.slug)).limit(1);
    return row ?? null;
  }),
  update: publicProcedure
    .input(z.object({ slug: z.string(), data: baseCategory }))
    .mutation(async ({ input }) => {
      const newSlug = slugify(input.data.name);
      const res = await db
        .update(categories)
        .set({ ...input.data, slug: newSlug })
        .where(eq(categories.slug, input.slug))
        .returning();
      return res[0] ?? null;
    }),
  delete: publicProcedure.input(z.object({ slug: z.string() })).mutation(async ({ input }) => {
    await db.delete(categories).where(eq(categories.slug, input.slug));
    return { ok: true } as const;
  }),
});


