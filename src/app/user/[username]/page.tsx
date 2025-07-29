"use client"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema } from '@/schemas/messageSchema'
import { useForm } from 'react-hook-form'
import { Button } from "@react-email/components"
import { z } from 'zod'
import { useParams } from "next/navigation"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { ApiResponse } from "@/types/ApiResponse"

function page() {

  const params=useParams();
  const username=params.username;
  console.log(username);
  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  })

  const onSubmit = async (data:z.infer<typeof messageSchema>) => {
     
    try{
        const response=await axios.post("/api/send-message",{
            username:username,
            message:data.message
        });
        console.log(response.data);
        toast.success(response.data.message);
        form.reset();
    }catch(err){
      console.log(err);
      const axiosError=err as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-lg ring-1 ring-gray-200">
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-medium text-gray-900">
              Your Message
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Type something meaningful..."
                {...field}
                className="w-full min-h-[140px] px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y"
              />
            </FormControl>
            <FormMessage className="text-sm text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <button
        type="submit"
        className="self-start px-6 py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-600 active:scale-95 transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
      >
        Submit
      </button>
    </form>
  </Form>
</div>

  )
}

export default page
