import { z } from "zod";
export const UserSignUpSchema = z
  .object({
    email: z.string().email("invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    role: z.enum(["student", "teacher"], {
      required_error: "Role is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
