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
import { getCheckoutSchema } from '@/schemas/checkout';
import type { CheckoutSchema } from '@/schemas/checkout';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useToast } from '@/hooks/use-toast';
import { generateWhatsAppMessage } from '@/lib/whatsapp';
import { useLanguage } from '@/hooks/use-language';

export function CheckoutForm({ tableNumber }: { tableNumber: string | null }) {
  const { cart, clearCart } = useCart();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const checkoutSchema = getCheckoutSchema(t);

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
        description: t('error_recaptchaNotReady'),
      });
      return;
    }

    const token = await executeRecaptcha('checkout');
    const normalizedPhone = normalizePhoneNumber(values.phone);
    
    if (!normalizedPhone) {
      form.setError('phone', {
        type: 'manual',
        message: t('error_invalidPhoneNumber'),
      });
      return;
    }
    
    const message = generateWhatsAppMessage(
      cart,
      { name: values.name, phone: normalizedPhone },
      tableNumber,
      t
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
        throw new Error(data.message || t('error_failedToSendOrder'));
      }

      window.location.href = data.whatsappUrl;
      setTimeout(() => clearCart(false), 500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('error_unknown');
      toast({
        variant: 'destructive',
        title: t('error_failedToProcessOrder'),
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
              <FormLabel>{t('form_name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form_name_placeholder')} {...field} />
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
              <FormLabel>{t('form_phone')}</FormLabel>
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
            ? t('form_submitting')
            : t('form_submit_whatsapp')}
        </Button>
      </form>
    </Form>
  );
}
