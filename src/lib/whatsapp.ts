import type { Cart, CheckoutInfo } from '@/types';
import { formatCurrency } from './currency';

export function generateWhatsAppMessage(
  cart: Cart,
  customerInfo: CheckoutInfo,
  tableNumber: string | null,
  t: (key: string) => string
): string {
  const now = new Date();
  const date = now.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const time = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const header = [
    `*WDR Coffee – ${t('whatsapp_newOrder')}*`,
    `*${t('whatsapp_date')}:* ${date} ${time}`,
  ];
  if (tableNumber) {
    header.push(`*${t('whatsapp_table')}:* ${tableNumber}`);
  }
  header.push(`*${t('whatsapp_customer')}:* ${customerInfo.name}`);
  header.push(`*${t('whatsapp_phone')}:* ${customerInfo.phone}`);

  const items = cart.items.map((item) => {
    let itemLine = `- ${item.name} x${item.qty} @ ${formatCurrency(
      item.price
    )} = *${formatCurrency(item.price * item.qty)}*`;
    if (item.note) {
      itemLine += `\n  • _${t('whatsapp_note')}: ${item.note}_`;
    }
    return itemLine;
  });

  const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const footer = `*${t('whatsapp_total')}: ${formatCurrency(total)}*`;

  return [
    header.join('\n'),
    `\n*${t('whatsapp_items')}:*`,
    items.join('\n'),
    '\n',
    footer,
  ].join('\n');
}

export function generateWhatsAppLink(message: string): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  if (!phoneNumber) {
    console.error('WhatsApp number is not configured in environment variables.');
    // Fallback or throw an error
    return '';
  }
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
