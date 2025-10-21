import { z } from "zod";
import { db, posts, postsToCategories, categories } from "../db";
import { router, publicProcedure } from "../trpc";
import { and, desc, eq, inArray, sql } from "drizzle-orm";


// Types - Updated to match database schema
interface PostWithCategories {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: Date;
  featuredImage?: string | null; 
  categories: { slug: string; name: string }[];
}


// Schemas
const basePost = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  published: z.boolean().default(false),
  featuredImage: z.string().optional(), // Add this
  categorySlugs: z.array(z.string()).default([]),
});


const paginationSchema = z.object({
  category: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
});


function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}


const postsRouter = router({
  listAll: publicProcedure
    .query(async () => {
      const allPosts = await db
        .select({
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
          content: posts.content,
          published: posts.published,
          createdAt: posts.createdAt,
          featuredImage: posts.featuredImage, 
        })
        .from(posts)
        .orderBy(desc(posts.createdAt));


      // Get categories for all posts
      const postCategories = await db
        .select({
          postId: postsToCategories.postId,
          slug: categories.slug,
          name: categories.name,
        })
        .from(postsToCategories)
        .leftJoin(categories, eq(postsToCategories.categoryId, categories.id));


      // Group categories by post ID
      const categoriesByPostId = postCategories.reduce((acc, curr) => {
        if (!curr.slug || !curr.name) return acc;
        if (!acc[curr.postId]) {
          acc[curr.postId] = [];
        }
        acc[curr.postId].push({
          slug: curr.slug,
          name: curr.name,
        });
        return acc;
      }, {} as Record<number, { slug: string; name: string }[]>);


      // Combine posts with their categories
      return allPosts.map(post => ({
        ...post,
        published: post.published ?? false, // Coerce null to false
        createdAt: post.createdAt ?? new Date(), // Coerce null to current date
        categories: categoriesByPostId[post.id] || []
      }));
    }),


  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      // Get post
      const [post] = await db
        .select({
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
          content: posts.content,
          published: posts.published,
          createdAt: posts.createdAt,
          featuredImage: posts.featuredImage, 
        })
        .from(posts)
        .where(eq(posts.slug, input.slug))
        .limit(1);


      if (!post) {
        throw new Error("Post not found");
      }


      // Get categories for the post
      const postCategories = await db
        .select({
          slug: categories.slug,
          name: categories.name,
        })
        .from(postsToCategories)
        .leftJoin(categories, eq(postsToCategories.categoryId, categories.id))
        .where(eq(postsToCategories.postId, post.id));


      // Filter out any null values and cast to required type
      const validCategories = postCategories
        .filter((cat): cat is { slug: string; name: string } => 
          cat.slug !== null && cat.name !== null
        );


      return {
        ...post,
        published: post.published ?? false, // Coerce null to false
        createdAt: post.createdAt ?? new Date(), // Coerce null to current date
        categories: validCategories,
      } satisfies PostWithCategories;
    }),


  list: publicProcedure
    .input(paginationSchema)
    .query(async ({ input }) => {
      const offset = (input.page - 1) * input.limit;


      // Base fields for posts query
      const fields = {
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        createdAt: posts.createdAt,
        published: posts.published,
        featuredImage: posts.featuredImage, 
      };


      // Start with base query
      const baseQuery = db.select(fields).from(posts);
      const countBaseQuery = db.select({ count: sql<number>`count(*)::int` }).from(posts);


      // Build category filter if needed
      if (input.category) {
        const postIds = await db
          .selectDistinct({ postId: postsToCategories.postId })
          .from(postsToCategories)
          .leftJoin(categories, eq(postsToCategories.categoryId, categories.id))
          .where(eq(categories.slug, input.category));
        
        if (postIds.length === 0) {
          return {
            posts: [],
            totalPages: 0,
            currentPage: input.page,
            totalPosts: 0
          };
        }
        
        const postIdValues = postIds.map(p => p.postId);
        
        // Execute queries with category filter
        const [countResult] = await countBaseQuery.where(inArray(posts.id, postIdValues));
        const totalPosts = Number(countResult?.count || 0);
        const totalPages = Math.ceil(totalPosts / input.limit);


        const results = await baseQuery
          .where(inArray(posts.id, postIdValues))
          .orderBy(desc(posts.createdAt))
          .limit(input.limit)
          .offset(offset);


        return {
          posts: results.map(post => ({
            ...post,
            published: post.published ?? false,
            createdAt: post.createdAt ?? new Date(),
          })),
          totalPages,
          currentPage: input.page,
          totalPosts
        };
      }


      // Execute queries without category filter
      const [countResult] = await countBaseQuery;
      const totalPosts = Number(countResult?.count || 0);
      const totalPages = Math.ceil(totalPosts / input.limit);


      const results = await baseQuery
        .orderBy(desc(posts.createdAt))
        .limit(input.limit)
        .offset(offset);


      return {
        posts: results.map(post => ({
          ...post,
          published: post.published ?? false,
          createdAt: post.createdAt ?? new Date(),
        })),
        totalPages,
        currentPage: input.page,
        totalPosts
      };
    }),
    
  getPost: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      // Get post
      const [post] = await db
        .select({
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
          content: posts.content,
          published: posts.published,
          createdAt: posts.createdAt,
          featuredImage: posts.featuredImage, 
        })
        .from(posts)
        .where(eq(posts.slug, input.slug))
        .limit(1);


      if (!post) {
        throw new Error("Post not found");
      }


      // Get categories
      const postCategories = await db
        .select({
          slug: categories.slug,
          name: categories.name,
        })
        .from(postsToCategories)
        .leftJoin(categories, eq(postsToCategories.categoryId, categories.id))
        .where(eq(postsToCategories.postId, post.id));


      // Filter out any null values and cast to required type
      const validCategories = postCategories
        .filter((cat): cat is { slug: string; name: string } => 
          cat.slug !== null && cat.name !== null
        );


      return {
        ...post,
        published: post.published ?? false, // Coerce null to false
        createdAt: post.createdAt ?? new Date(), // Coerce null to current date
        categories: validCategories,
      } satisfies PostWithCategories;
    }),


  create: publicProcedure
    .input(basePost)
    .mutation(async ({ input }) => {
      // Generate slug from title
      const slug = slugify(input.title);


      // Insert post
      const [post] = await db
        .insert(posts)
        .values({
          title: input.title,
          slug,
          content: input.content,
          published: input.published,
          featuredImage: input.featuredImage, 
          createdAt: new Date(),
        })
        .returning();


      // Get category IDs
      if (input.categorySlugs.length > 0) {
        const categoryIds = await db
          .select({ id: categories.id })
          .from(categories)
          .where(inArray(categories.slug, input.categorySlugs));


        // Insert post-category relationships
        if (categoryIds.length > 0) {
          await db
            .insert(postsToCategories)
            .values(
              categoryIds.map((cat) => ({
                postId: post.id,
                categoryId: cat.id,
              }))
            );
        }
      }


      return post;
    }),


  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: basePost,
      })
    )
    .mutation(async ({ input }) => {
      const { id, data } = input;


      // Update post
      const [updatedPost] = await db
        .update(posts)
        .set({
          title: data.title,
          content: data.content,
          published: data.published,
          featuredImage: data.featuredImage, 
        })
        .where(eq(posts.id, id))
        .returning();


      // Handle categories update
      if (data.categorySlugs.length > 0) {
        // Get category IDs
        const categoryIds = await db
          .select({ id: categories.id })
          .from(categories)
          .where(inArray(categories.slug, data.categorySlugs));


        // Delete existing relationships
        await db
          .delete(postsToCategories)
          .where(eq(postsToCategories.postId, id));


        // Insert new relationships
        if (categoryIds.length > 0) {
          await db
            .insert(postsToCategories)
            .values(
              categoryIds.map((cat) => ({
                postId: id,
                categoryId: cat.id,
              }))
            );
        }
      }


      return updatedPost;
    }),
    
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      // Delete post-category relationships first
      await db
        .delete(postsToCategories)
        .where(eq(postsToCategories.postId, input.id));


      // Delete the post
      const [deletedPost] = await db
        .delete(posts)
        .where(eq(posts.id, input.id))
        .returning();


      return deletedPost;
    })
});


export { postsRouter };
