import {z} from "zod";
import dotenv from "dotenv";

dotenv.config();



const envSchema = z.object({
    PORT: z.string().default("8010"),
    DATABASE_URL: z.string().url().optional()
});


const parsedEnv = envSchema.safeParse(process.env);

if(!parsedEnv.success){
    console.error("Invalid environment variables: ",parsedEnv.error.format());
    process.exit(1);
}




export const env = parsedEnv.data;