"use server";

import { SignupSchema } from "@/schemas";
import { z } from "zod";
import bcryptjs from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByUsername, getUserByEmail } from "@/utils/user";

export const signup =async (values: z.infer<typeof SignupSchema>) => {
    const validatedFields = SignupSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid fields!"}
    }

    const {username, name, email, password} = validatedFields.data

    const existingUsername = await getUserByUsername(username);

    if(existingUsername){
        return {error: "Username is already taken."}
    }

    const existingEmail = await getUserByEmail(email);

    if(existingEmail){
        return {error: "Email already in use."}
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await db.user.create({
        data: {
            name,
            username,
            email,
            password: hashedPassword
        }
    })

    // TODO: Send verification otp


    return {success: "user created!"}
}