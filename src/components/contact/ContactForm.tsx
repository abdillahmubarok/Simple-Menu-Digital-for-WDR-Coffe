'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { normalizePhoneNumber } from '@/lib/phone';
import { isValidIndonesianPhoneNumber } from '@/lib/phone';
import { generateWhatsAppLink } from '@/lib/whatsapp';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nama harus memiliki setidaknya 2 karakter.' }),
  phone: z
    .string()
    .refine(isValidIndonesianPhoneNumber, {
      message: 'Format nomor HP tidak valid. Gunakan 08... atau +628...',
    }),
  message: z
    .string()
    .min(10, { message: 'Pesan harus memiliki setidaknya 10 karakter.' })
    .max(500, { message: 'Pesan tidak boleh lebih dari 500 karakter.' }),
});

type ContactSchema = z.infer<typeof contactSchema>;

function generateContactMessage(data: ContactSchema): string {
  const header = `Pesan Kontak Baru dari ${data.name}`;
  const customerInfo = `No. HP: ${data.phone}`;
  const message = `Pesan:\n${data.message}`;
  
  return [header, customerInfo, message].join('\n\n');
}

export function ContactForm() {
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      message: '',
    },
  });

  function onSubmit(values: ContactSchema) {
    const normalizedPhone = normalizePhoneNumber(values.phone);
    if (!normalizedPhone) {
      form.setError('phone', {
        type: 'manual',
        message: 'Nomor HP tidak valid.',
      });
      return;
    }

    const message = generateContactMessage({ ...values, phone: normalizedPhone });
    const whatsappUrl = generateWhatsAppLink(message);

    window.location.href = whatsappUrl;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Nama Anda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor WhatsApp</FormLabel>
              <FormControl>
                <Input placeholder="08..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pesan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tulis pesan Anda di sini..."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
        </Button>
      </form>
    </Form>
  );
}
