"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import Link from "next/link";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { singupSchema } from "@/schemas/signupSchema";
import axios, { Axios, AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "sonner";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDebounceCallback } from 'usehooks-ts'
import {Loader2} from "lucide-react"


export default function SignUp(){
    const [username,setUsername]=useState("");
    const [usernameMessage,setUsernameMessage]=useState<any>();
    const [isChekingUsername,setIsChekingUsername]=useState(false); 
    const [isSubmitting,setIsSubmitting]=useState(false);
    const debounced=useDebounceCallback(setUsername,500);
   
    const router=useRouter();

    const form=useForm({
        resolver:zodResolver(singupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            
        },
    })

    useEffect(() => {
        const checkUsernameUnique=async () => {
            if(username){
                setIsChekingUsername(true);
                try{
                    const response=await axios.get(`/api/check_username?username=${username}`);
                    setUsernameMessage(response.data);
                    console.log(response.data);

                    
                }catch(err){
                    const axiosError=err as AxiosError<ApiResponse>;
                    setUsernameMessage(axiosError.response?.data?? "something went wrong while checking username");
                }finally{
                    setIsChekingUsername(false);
                }
            }
        }
        checkUsernameUnique();
    }, [username]);

    const onSubmit=async (data:z.infer<typeof singupSchema>)=>{
        setIsSubmitting(true);
        try{
            const response=await axios.post("/api/sing-up",data);
            toast.success(response.data.message);
            router.replace(`/verify/${data.username}`);
            
        }catch(err){
            const axiosError=err as AxiosError<ApiResponse>;
            setUsernameMessage(axiosError.response?.data??"something went wrong while username singup");
        }finally{
            setIsSubmitting(false);
        }
    }

    return(<>
    <div className="flex justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y8 bg-white rounde-lg shadow-md">

      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg;text-5xl mb-6">Join Mystrty Message</h1>
      </div>
      <div className="mb-4">sing up to strat your anonymous adventure</div>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
       <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} onChange={(e)=>{
                  field.onChange(e)
                  debounced(e.target.value)}} />
              </FormControl>
              {isChekingUsername &&<Loader2 className="animate-spin"/>}
              
              <div className={`text-sm ${usernameMessage?.success===false?"text-red-600":"text-green-500"}`}>{usernameMessage?.message}</div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {isSubmitting?<><Loader2/>please wait</>:"sing up"}
        </button>
      </form>
    </Form>
    <div className="text-center mt-4">
      <div>Already have an account? <Link href="/sign-in" className="text-blue-600 hover:underline">Log in</Link></div>
    </div>
    </div>
    
    
  </div>;
    </>)
}