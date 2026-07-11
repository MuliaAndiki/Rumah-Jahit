import { z } from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().default("RumahJahitSuperSecretKey"),
  INTERNAL_API_SECRET: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
}).passthrough();

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid Env Variables:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;
