"use client"
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React from 'react'
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifySchema } from '@/schemas/verifySchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { FormControl,  FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';



const VerifyAccount = () => {
    const router = useRouter();
    const param = useParams();

    const form = useForm({
        resolver: zodResolver(verifySchema),
    })
    const onsubmit = async (data: any) => {
        try {
            const response = await axios.post("/api/verify-code", {
                username: param.username,
                code: data.code
            });
            toast.success(response.data.message)
            router.replace("sign-in")
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message ?? "something went wrong while checking username"
            toast.error(errorMessage)

        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
                <div className='text-center'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>varification code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="code" {...field} />
                                        </FormControl>
                                   
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default VerifyAccount


