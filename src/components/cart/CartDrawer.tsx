'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/currency';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { CartItemCard } from './CartItemCard';
import { ShoppingBag } from 'lucide-react';
import type { ReactNode } from 'react';
import { useLanguage } from '@/hooks/use-language';

export function CartDrawer({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  const { cart, cartTotal } = useCart();
  const { t } = useLanguage();
  const total = cartTotal();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>{t('cart_title')}</SheetTitle>
        </SheetHeader>
        {cart.items.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
              <div className="flex flex-col gap-4 py-4">
                {cart.items.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>{t('cart_total')}</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/checkout">{t('cart_checkout')}</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold">{t('cart_emptyTitle')}</p>
            <p className="text-muted-foreground">
              {t('cart_emptyDescription')}
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
