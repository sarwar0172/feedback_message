"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { singInSchema } from '@/schemas/singInschema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'


function SignIn() {
  const router = useRouter()


    const form=useForm({
    resolver:zodResolver(singInSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })

  const onSubmit=async(data:z.infer<typeof singInSchema>)=>{
    
  const result=  await signIn("credentials",{
      redirect:false,
      identifier:data.email,
      password:data.password
    })

    if(result?.error){
      toast.error(result.error)
    }
    if(result?.url){
      router.replace('/dashboard');
      
    }
    
  }


  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y8 bg-white rounde-lg shadow-md">

      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Join Mystrty Message</h1>
      </div>
      <p className="mb-4">sing up to strat your anonymous adventure</p>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
       
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
        <button type="submit"  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
         sign in
        </button>
      </form>
    </Form>
   
    </div>
    
    
  </div>
  )
}

export default SignIn
