import { z } from 'zod';
import { isValidIndonesianPhoneNumber } from '@/lib/phone';

export const getCheckoutSchema = (t: (key: string, params?: any) => string) => z.object({
  name: z
    .string()
    .min(2, { message: t('validation_name_min', { min: 2 }) }),
  phone: z
    .string()
    .refine(isValidIndonesianPhoneNumber, {
      message: t('validation_phone_invalid'),
    }),
});

export type CheckoutSchema = z.infer<ReturnType<typeof getCheckoutSchema>>;
