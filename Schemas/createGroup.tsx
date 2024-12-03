import { z } from "zod";
export const createGroupSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  email1: z.string().email("invalid email address"),
  email2: z.string().email("invalid email address"),
  email3: z.string().email("invalid email address"),
}) .refine(
  (data) => data.email1 !== data.email2 && data.email1 !== data.email3 && data.email2 !== data.email3,
  {
    message: "All three emails must be different",
    path: ["email3"],
  }
);;
