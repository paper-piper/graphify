import { z } from 'zod';

export const envSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive(),
  DATABASE: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  SERVER_HOST: z.string().min(1),
  SERVER_PORT: z.coerce.number().int().positive(),
});