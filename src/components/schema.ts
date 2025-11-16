import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  password: z.string().min(6),

  age: z.number().optional(),
  gender: z.string().optional(),

  // REQUIRED in backend → must exist in Zod → but we default them
  skills: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  photos: z.array(z.string()).default([]),

  experienceLevel: z.string().optional(),

  github: z.url().optional(),
  portfolio: z.url().optional(),
  linkedin: z.url().optional(),

  city: z.string().optional(),
  country: z.string().optional(),
});
