"use client";

import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { LoginSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useTransition, useState } from "react";




const LoginForm = () => {

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof LoginSchema>){
    setError("");
    setSuccess("");
    
      startTransition(() => {
        login(values)
        .then((data) => {
          setError(data?.error )
          setSuccess(data?.success )
        })
        
      });
  }

  return (
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/signup"
        showSocial
      >
          <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)}
             className="space-y-6"
             >
                <div className="space-y-4">
                  <FormField
                      control={form.control}
                      name="identifier"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel className="text-white">Username/Email</FormLabel>
                              <FormControl>
                                  <Input className="text-gray-400" disabled={isPending}  placeholder="abc@gmail.com" {...field} />
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
                              <FormLabel className="text-white">Password</FormLabel>
                              <FormControl>
                                  <Input className="text-gray-400" disabled={isPending} type="password" placeholder="********" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
          
                      )}
                  />
                </div>
                <FormError message={error}></FormError>
                <FormSuccess message={success}></FormSuccess>
                <Button disabled={isPending} type="submit" className="w-full" variant="outline">
                  Login
                </Button>
             </form>
          </Form>
      </CardWrapper>
  )
}

export default LoginForm
