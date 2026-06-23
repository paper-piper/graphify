import dotenv from 'dotenv';
import { envSchema } from './schema';

export function load_env(){
    dotenv.config();
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
    throw new Error(`Invalid environment variables.`);
    }
}
