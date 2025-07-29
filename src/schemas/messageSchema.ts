import {z} from "zod";

export const messageSchema=z.object({
    message:z.string().min(5,'message must be at least 5 character long').max(1000,'message must be less than 1000 characters long').trim(),
})