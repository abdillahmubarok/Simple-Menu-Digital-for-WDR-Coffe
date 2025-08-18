'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/use-language';

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const table = searchParams.get('table');
  const { cart } = useCart();
  const { t } = useLanguage();

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">{t('checkout_cartEmptyTitle')}</h2>
        <p className="text-muted-foreground mb-6">
          {t('checkout_cartEmptyDescription')}
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('checkout_backToMenu')}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('checkout_formTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckoutForm tableNumber={table} />
          </CardContent>
        </Card>
      </div>
      <div className="order-first lg:order-last">
        <OrderSummary />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-4 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            WDR Coffee
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('checkout_backToMenu')}
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <CheckoutPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
