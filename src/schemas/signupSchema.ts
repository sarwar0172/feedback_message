import { z } from "zod";

export const usernameValidateion = z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores").trim();


export const singupSchema = z.object({
    username: usernameValidateion,
    email: z.string().email("Invalid email address").trim(),
    password: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be at most 50 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be at most 50 characters long")
})