import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().trim().min(2).max(255),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6).max(128),
  phone: z.string().regex(/^(\+263|0)7[0-9]{8}$/),
  role: z.enum(['user', 'admin', 'merchant']).default('user')
});

export const signInSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1)
});

export const registerBusinessSchema = z.object({
   business_name: z.string().trim().min(2).max(255),
   location: z.string().trim().min(2).max(255),
   opening_hours: z.string().trim().min(2).max(255),
})
