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
import { normalizePhoneNumber } from '@/lib/phone';
import { checkoutSchema, type CheckoutSchema } from '@/schemas/checkout';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useToast } from '@/hooks/use-toast';
import { generateWhatsAppMessage } from '@/lib/whatsapp';

export function CheckoutForm({ tableNumber }: { tableNumber: string | null }) {
  const { cart, clearCart } = useCart();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { toast } = useToast();

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  async function onSubmit(values: CheckoutSchema) {
    if (!executeRecaptcha) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'reCAPTCHA belum siap. Silakan coba lagi.',
      });
      return;
    }

    const token = await executeRecaptcha('checkout');
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
      { name: values.name, phone: normalizedPhone },
      tableNumber
    );

    try {
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal mengirim pesanan.');
      }

      window.location.href = data.whatsappUrl;
      setTimeout(() => clearCart(false), 500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan tidak diketahui';
      toast({
        variant: 'destructive',
        title: 'Gagal Memproses Pesanan',
        description: errorMessage,
      });
    }
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
