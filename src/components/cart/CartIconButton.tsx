'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { CartDrawer } from './CartDrawer';

export function CartIconButton() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = cart.items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartDrawer open={isOpen} onOpenChange={setIsOpen}>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-16 w-16 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
          aria-label={`Buka keranjang (${itemCount} item)`}
        >
          <ShoppingBag className="h-8 w-8" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-xs">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
    </CartDrawer>
  );
}
