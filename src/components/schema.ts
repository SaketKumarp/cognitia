import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  // Email + password removed because Clerk handles authentication

  age: z.number().optional(),
  gender: z.string().optional(),

  skills: z.union([z.string(), z.array(z.string())]).optional(),
  interests: z.union([z.string(), z.array(z.string())]).optional(),

  photos: z.array(z.string()).default([]).optional(),
  bio: z.string().optional(),
  experienceLevel: z.string().optional(),

  github: z.url().optional(),
  portfolio: z.url().optional(),
  linkedin: z.url().optional(),

  city: z.string().optional(),
  country: z.string().optional(),
});
