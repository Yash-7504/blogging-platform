import type { Config } from "drizzle-kit";

export default {
	schema: "./src/server/db/schema.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
 		url: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_6ICRPWdU2abL@ep-dawn-cherry-addkffcg-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
 	},
} satisfies Config;


