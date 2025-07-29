"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@react-email/components";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import {  useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";


const verifyAccount=()=>{
    const router=useRouter()
    const params=useParams();

    const form=useForm({
        resolver:zodResolver(verifySchema),
        defaultValues: {
            code: "",
        },
    })
    
    const onsubmit=async(data:any)=>{
      
        try{
            const response=await axios.post("/api/verify-code",{
                username: params.username,
                code: data.code
            });
          
            toast.success(response.data.message);
            router.replace("/sign-in");
            
        }catch(err){
            console.log(err);
            const axiosError=err as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message);
        }
    }
  return(
    <>
     <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <Form {...form}>
                        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>varification code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="code" {...field}  />
                                        </FormControl>
                                   
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">submit</button>
                        </form>

                    </Form>
            </div>

        </div>

     </div>
    </>
  )
}

export default verifyAccount