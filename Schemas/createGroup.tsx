import { z } from "zod";
export const createGroupSchema = z.object({
  groupName: z.string(),
  email: z.string().email("invalid email address"),
});
