import { z } from 'zod'

export const signUpSchema =z.object({
    name: z.string().trim().min(2).max(255),
    email: z.email().max(255).toLowerCase().trim(),
    password: z.string().min(6).max(128),
    phone: z.number().min(10).max(255),
    role: z.enum(['user', 'admin', 'merchant']).default('user')
});

export const signInSchema = z.object({
    email: z.email().max(255).toLowerCase().trim(),
    password: z.string().min(1)
})