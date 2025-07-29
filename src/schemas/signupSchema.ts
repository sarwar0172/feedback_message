import {z} from "zod";

export const usernameValidation=z.string().min(3,'user name must be at least 3 characters long').max(20,'user name must be less than 20 characters long').regex(/^[a-zA-Z0-9_]*$/, 'user name must be alphanumeric and can contain underscores').trim();

export const singupSchema=z.object({
    username:usernameValidation,
    email: z.email().trim(),
    password:z.string().min(6,'password must be at least 6 characters long').max(20,'password must be less than 20 characters long').trim(),
    confirmPassword:z.string().min(6,'password must be at least 6 characters long').max(20,'password must be less than 20 characters long').trim(),
})

