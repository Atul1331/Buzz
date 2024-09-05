import  Credentials  from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import * as z from "zod";
import { getUserByEmail, getUserByUsername } from "./utils/user";
import bcryptjs from "bcryptjs"
 

export default { providers: [
    Credentials({
        async authorize (credentials) {
            const validatedFields = LoginSchema.safeParse(credentials)

            if(validatedFields.success){
                const {identifier, password} = validatedFields.data;
                
                
                const userByEmail = await getUserByEmail(identifier)
                const userByUsername = await getUserByUsername(identifier)
                
                

                const user: any = userByEmail !== null ? userByEmail : (userByUsername !== null ? userByUsername : null)

                // if(!user || !user.password) when doing google and github login. Also make password optional in schema when doing google,github login.
                if(!user){
                    return null;
                }


                const passwordsMatch = await bcryptjs.compare(password, user.password)

                if(passwordsMatch){
                    return user;
                }

                return null;
            
                
            }
        }
    })
]

 } satisfies NextAuthConfig