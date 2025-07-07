import {z} from "zod";

export const singInSchema = z.object({
    content: z.string().min(1, "Message must be at least 1 characters long").max(1000, "Message must be at most 1000 characters long"),
})