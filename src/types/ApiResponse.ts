import { Message } from "@/model/user";
export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptiongMessages?: boolean;
    messages?: Message[]
}