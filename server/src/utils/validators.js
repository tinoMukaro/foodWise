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

export const makeDealSchema = z.object({
  title: z.string().trim().min(2).max(255),
  description: z.string().trim().min(2).max(1000),
  price: z.number().positive('Price must be greater than 0'),
  quantity: z.number().int('Quantity must be an integer').min(1, 'Quantity must be at least 1'),
  image_url: z.string().url('Invalid image URL').optional(),
  expires_at: z.string().refine((date) => new Date(date).getTime() > Date.now(),'Expiry date must be in the future'),
});
