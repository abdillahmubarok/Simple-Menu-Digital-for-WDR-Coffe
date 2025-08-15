import type { Cart, CheckoutInfo } from '@/types';
import { formatCurrency } from './currency';

export function generateWhatsAppMessage(
  cart: Cart,
  customerInfo: CheckoutInfo,
  tableNumber: string | null
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
    'WDR Coffee – Pesanan Baru',
    `Tanggal: ${date} ${time}`,
  ];
  if (tableNumber) {
    header.push(`Meja: ${tableNumber}`);
  }
  header.push(`Pelanggan: ${customerInfo.name}`);
  header.push(`Nomor HP: ${customerInfo.phone}`);

  const items = cart.items.map((item) => {
    let itemLine = `- ${item.name} x${item.qty} @ ${formatCurrency(
      item.price
    )} = ${formatCurrency(item.price * item.qty)}`;
    if (item.note) {
      itemLine += `\n  • Catatan: ${item.note}`;
    }
    return itemLine;
  });

  const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const footer = `Total: ${formatCurrency(total)}`;

  return [
    header.join('\n'),
    '\nItem:',
    items.join('\n'),
    '\n',
    footer,
  ].join('\n');
}

export function generateWhatsAppLink(message: string): string {
  const phoneNumber = '6285257919775';
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
