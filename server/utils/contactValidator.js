import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  phone: z.string().max(32).optional().or(z.literal("")),
  subject: z.string().min(2).max(120).optional().or(z.literal("")),
  message: z.string().min(5).max(2000),
  website: z.string().optional().default(""),
});
