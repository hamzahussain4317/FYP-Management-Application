import {z} from "zod";
export const UserLoginSchema = z
  .object({
    email: z.string().email("invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.enum(["student", "teacher"], {
      required_error: "Role is required",
    }),
  })
 
