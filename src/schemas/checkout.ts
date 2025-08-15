import { z } from 'zod';
import { isValidIndonesianPhoneNumber } from '@/lib/phone';

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nama harus memiliki setidaknya 2 karakter.' }),
  phone: z
    .string()
    .refine(isValidIndonesianPhoneNumber, {
      message: 'Format nomor HP tidak valid. Gunakan 08... atau +628...',
    }),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
