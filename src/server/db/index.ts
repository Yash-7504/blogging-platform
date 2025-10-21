import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import 'dotenv/config';



const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_6ICRPWdU2abL@ep-dawn-cherry-addkffcg-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString: databaseUrl });

export const db = drizzle(pool, { schema });
export * from "./schema";


