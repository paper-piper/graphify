import dotenv from 'dotenv';
import { envSchema } from './schema';

export function loadEnv(){
    dotenv.config({ quiet: true });
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
        throw new Error(`Invalid environment variables.`);
    }
}
