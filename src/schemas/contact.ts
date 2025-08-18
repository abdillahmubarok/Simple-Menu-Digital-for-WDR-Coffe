import { z } from 'zod';
import { isValidIndonesianPhoneNumber } from '@/lib/phone';

export const getContactSchema = (t: (key: string, params?: any) => string) => z.object({
  name: z
    .string()
    .min(2, { message: t('validation_name_min', { min: 2 }) }),
  phone: z
    .string()
    .refine(isValidIndonesianPhoneNumber, {
      message: t('validation_phone_invalid'),
    }),
  message: z
    .string()
    .min(10, { message: t('validation_message_min', {min: 10}) })
    .max(500, { message: t('validation_message_max', {max: 500}) }),
});

export type ContactSchema = z.infer<ReturnType<typeof getContactSchema>>;
