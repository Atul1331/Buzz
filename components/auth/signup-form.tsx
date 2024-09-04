"use client";

import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { SignupSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { signup } from "@/actions/signup";
import { useTransition, useState } from "react";




const SignupForm = () => {

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof SignupSchema>){
    setError("");
    setSuccess("");
    
      startTransition(() => {
        signup(values)
        .then((data) => {
          setError(data?.error )
          setSuccess(data?.success )
        })
        
      });
  }

  return (
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
      >
          <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)}
             className="space-y-6"
             >
                <div className="space-y-4">
                  <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel className="text-white">Username</FormLabel>
                              <FormControl>
                                  <Input className="text-gray-400" disabled={isPending}  placeholder="johndoe" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
          
                      )}
                  />

<FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel className="text-white">Name</FormLabel>
                              <FormControl>
                                  <Input className="text-gray-400" disabled={isPending}  placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
          
                      )}
                  />

<FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel className="text-white">Email</FormLabel>
                              <FormControl>
                                  <Input type="email" className="text-gray-400" disabled={isPending}  placeholder="abc@gmail.com" {...field} />
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
                  Signup
                </Button>
             </form>
          </Form>
      </CardWrapper>
  )
}

export default SignupForm
