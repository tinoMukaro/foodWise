import { z } from "zod";

export const createDealSchema = z
  .object({
    title: z.string().min(3, "Title too short").max(150),
    
    description: z.string().min(10, "Description too short"),

    originalPrice: z.coerce.number().positive("Original price must be > 0"),

    dealPrice: z.coerce.number().positive("Deal price must be > 0"),

    quantityTotal: z.coerce
      .number()
      .int("Quantity must be a whole number")
      .positive("Quantity must be > 0"),

    expiresAt: z.coerce.date().refine(
      (date) => date > new Date(),
      "Expiry date must be in the future"
    ),

    pickupLocation: z.string().min(3, "Pickup location too short"),

      imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  })
  .refine(
    (data) => data.dealPrice < data.originalPrice,
    {
      message: "Deal price must be lower than original price",
      path: ["dealPrice"],
    }
  );


export const updateDealSchema = z.object({
  title: z.string().min(1).max(150).optional(),
  description: z.string().min(1).optional(),
  originalPrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
  dealPrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
  quantityTotal: z.number().int().positive().optional(),
  quantityLeft: z.number().int().min(0).optional(),
  expiresAt: z.string().datetime().optional(),
  pickupLocation: z.string().min(1).max(200).optional(),
  imageUrl: z.string().url().optional().nullable(),
  status: z.enum(["active", "inactive", "sold_out", "expired", "deleted"]).optional(),
});

export const statusSchema = z.object({
  status: z.enum(["active", "inactive", "sold_out", "expired", "deleted"]),
});



  