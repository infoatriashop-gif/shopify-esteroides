import { z } from "zod";

export const checkoutSchema = z.object({
  // Product
  productSlug: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
  selectedOfferId: z.number().int().optional(),

  // Pre-purchase upsells (product IDs)
  upsellProductIds: z.array(z.number().int()).default([]),

  // Customer info
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100),
  phone: z
    .string()
    .min(10, "Teléfono inválido")
    .max(15)
    .regex(/^[0-9+\s\-()]+$/, "Formato de teléfono inválido"),
  department: z.string().min(1, "Selecciona un departamento"),
  city: z.string().min(1, "Ingresa tu ciudad"),
  address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(500),
  notes: z.string().max(500).optional(),

  // Coupon
  couponCode: z.string().max(50).optional(),

  // UTM tracking
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
