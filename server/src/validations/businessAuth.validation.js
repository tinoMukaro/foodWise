import { z } from 'zod';

export const signupSchema = z.object({
 name: z.string().min(2).max(255).trim(),
 email: z.email().max(255).toLowerCase().trim(),
 password: z.string().min(6).max(128),
 phone: z.string().max(20).optional(),
 phone2: z.string().max(20).optional(),
 location: z.string().max(255).optional(),
 openingHours: z.string().max(255).optional(),
 description: z.string().max(255).optional(),
});

export const signInSchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(1),
});
