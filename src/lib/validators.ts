import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z
    .union([z.string().trim().min(7, 'Phone must be at least 7 digits'), z.literal('')])
    .transform((val) => (val === '' ? undefined : val)),
});

export const createRoomSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  type: z.string().min(2),
  description: z.string().min(10),
  price: z.number().int().positive(),
  currency: z.string().default('INR'),
  capacity: z.number().int().positive(),
  beds: z.number().int().positive().optional(),
  status: z.enum(['AVAILABLE', 'UNAVAILABLE']).default('AVAILABLE'),
  amenities: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  totalInventory: z.number().int().positive().default(1),
});

export const bookingSchema = z
  .object({
    roomId: z.string().min(1),
    checkIn: z.coerce.date(),
    checkOut: z.coerce.date(),
    guests: z.number().int().positive(),
    activities: z
      .array(
        z.object({
          activityId: z.string(),
          quantity: z.number().int().positive().default(1),
        }),
      )
      .optional()
      .default([]),
    totalAmount: z.number().int().positive(),
    currency: z.string().default('INR'),
    razorpayOrderId: z.string().optional(),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: 'Checkout must be after check-in',
    path: ['checkOut'],
  });
