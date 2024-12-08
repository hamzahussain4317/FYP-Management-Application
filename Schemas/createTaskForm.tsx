import { z } from "zod";
export const createTaskSchema = z.object({
  taskName: z.string(),
  taskDescription: z.string(),
  taskDeadline: z.string(),
  stdEmail: z.string().email("invalid email address"),
});
