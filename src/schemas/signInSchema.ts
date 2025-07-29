import {z} from "zod";
export const signInSchema=z.object({
email:z.email('invalid email').trim(),
password:z.string().min(6,'password must be at least 6 characters long').max(20,'password must be less than 20 characters long').trim(),
})