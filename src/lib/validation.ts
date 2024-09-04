import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name should at least be 3 characters long." }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password should at least be 8 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginBody = z.infer<typeof loginSchema>;
export type SignUpBody = z.infer<typeof signUpSchema>;
