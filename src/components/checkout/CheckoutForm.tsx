'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { generateWhatsAppLink, generateWhatsAppMessage } from '@/lib/whatsapp';
import { normalizePhoneNumber } from '@/lib/phone';
import { checkoutSchema, type CheckoutSchema } from '@/schemas/checkout';

export function CheckoutForm({ tableNumber }: { tableNumber: string | null }) {
  const { cart, clearCart } = useCart();

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  function onSubmit(values: CheckoutSchema) {
    const normalizedPhone = normalizePhoneNumber(values.phone);
    if (!normalizedPhone) {
      form.setError('phone', {
        type: 'manual',
        message: 'Nomor HP tidak valid.',
      });
      return;
    }

    const message = generateWhatsAppMessage(
      cart,
      {
        name: values.name,
        phone: normalizedPhone,
      },
      tableNumber
    );

    const whatsappUrl = generateWhatsAppLink(message);

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;

    // Clear cart after redirecting
    setTimeout(() => clearCart(false), 500); // Small delay to ensure redirect starts
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Nama lengkap Anda" {...field} />
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
              <FormLabel>Nomor HP (WhatsApp)</FormLabel>
              <FormControl>
                <Input placeholder="08..." {...field} />
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
          {form.formState.isSubmitting
            ? 'Memproses...'
            : 'Kirim via WhatsApp'}
        </Button>
      </form>
    </Form>
  );
}
