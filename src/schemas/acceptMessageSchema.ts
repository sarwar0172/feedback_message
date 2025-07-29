import {z} from "zod";

export const isAcceptMessageSchema=z.object({
    Acceptmessage:z.boolean(),
})