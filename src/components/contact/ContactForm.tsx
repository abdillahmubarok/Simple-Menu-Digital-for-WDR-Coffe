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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { normalizePhoneNumber } from '@/lib/phone';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useToast } from '@/hooks/use-toast';
import { getContactSchema, type ContactSchema } from '@/schemas/contact';
import { useLanguage } from '@/hooks/use-language';

function generateContactMessage(data: ContactSchema, t: (key: string) => string): string {
  const header = t('contact_message_header').replace('{name}', data.name);
  const customerInfo = `${t('contact_message_phone')}: ${data.phone}`;
  const messageBody = `${t('contact_message_body')}:\n${data.message}`;
  
  return [header, customerInfo, messageBody].join('\n\n');
}

export function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { toast } = useToast();
  const { t } = useLanguage();
  const contactSchema = getContactSchema(t);

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      message: '',
    },
  });

  async function onSubmit(values: ContactSchema) {
     if (!executeRecaptcha) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('error_recaptchaNotReady'),
      });
      return;
    }

    const token = await executeRecaptcha('contact_form');
    const normalizedPhone = normalizePhoneNumber(values.phone);
    if (!normalizedPhone) {
      form.setError('phone', { type: 'manual', message: t('error_invalidPhoneNumber') });
      return;
    }

    const message = generateContactMessage({ ...values, phone: normalizedPhone }, t);

    try {
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('error_failedToSendOrder'));
      }

      window.location.href = data.whatsappUrl;
    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : t('error_unknown');
      toast({
        variant: 'destructive',
        title: t('error_failedToSendMessage'),
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
              <FormLabel>{t('form_phone_whatsapp')}</FormLabel>
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
              <FormLabel>{t('form_message')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('form_message_placeholder')}
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
          {form.formState.isSubmitting ? t('form_submittingMessage') : t('form_submitMessage')}
        </Button>
      </form>
    </Form>
  );
}
