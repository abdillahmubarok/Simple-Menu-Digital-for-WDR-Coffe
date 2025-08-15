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

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const table = searchParams.get('table');
  const { cart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Keranjang Anda Kosong</h2>
        <p className="text-muted-foreground mb-6">
          Sepertinya Anda belum menambahkan item apapun ke keranjang.
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Menu
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
            <CardTitle>Formulir Pemesanan</CardTitle>
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
  return (
    <div className="min-h-screen bg-background">
      <header className="py-4 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            WDR Coffee
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Menu
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CheckoutPageContent />
        </Suspense>
      </main>
    </div>
  );
}
