"use server";

import { SignupSchema } from "@/schemas";
import { z } from "zod";

export const signup =async (values: z.infer<typeof SignupSchema>) => {
    const validatedFields = SignupSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid fields!"}
    }

    return {success: "Email sent!"}
}