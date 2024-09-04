import * as z from "zod";

export const LoginSchema = z.object({
    identifier: z.string().min(1, "Email or Username required")
        .refine((value) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isUsername = /^[a-zA-Z0-9_]{3,15}$/.test(value); // Adjust regex for username rules
        return isEmail || isUsername;
        }, "Invalid email or username"),
  
    password: z.string().min(1,"Password is required")
});


export const SignupSchema = z.object({
    name: z.string()
      .min(1, "Name is required")
      .max(50, "Name must not exceed 50 characters"),
    
    username: z.string()
      .min(3, "Username must be at least 3 characters long")
      .max(15, "Username must not exceed 15 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    //   .refine(async (username) => await isUsernameUnique(username), "Username is already taken"),
    
    email: z.string()
      .email("Invalid email address"),
    //   .refine(async (email) => await isEmailUnique(email), "Email is already in use"),
    
    password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must not exceed 20 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  });
  
