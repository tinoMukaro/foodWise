import { z } from "zod";

export const createOrderSchema = z.object({
    dealId: z.number().int().positive(),
    quantity: z.number().int().positive(),
   paymentMethod: z.enum(["cash", "card"]),
   pickupTime: z.string(),
    specialInstructions: z.string().optional(),
 
});