'use client';

import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/currency';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/hooks/use-language';

export function OrderSummary() {
  const { cart, cartTotal } = useCart();
  const { t } = useLanguage();
  const total = cartTotal();

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>{t('summary_title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">
                {item.name} x {item.qty}
              </span>
              <span>{formatCurrency(item.price * item.qty)}</span>
            </div>
            {item.note && (
              <p className="text-sm text-muted-foreground pl-2 border-l-2 border-primary">
                "{item.note}"
              </p>
            )}
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>{t('summary_subtotal')}</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('summary_taxAndFees')}</span>
          <span>{formatCurrency(0)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between font-bold text-xl">
          <span>{t('summary_total')}</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
