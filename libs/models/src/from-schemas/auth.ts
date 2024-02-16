import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

export const signUpFormSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8, "Password should be at least 8 characters long"),
});