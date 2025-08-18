'use client';

import type { CartItem } from '@/types';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { QuantityControl } from '../menu/QuantityControl';
import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';

export function CartItemCard({ item }: { item: CartItem }) {
  const { updateQty, updateNote } = useCart();
  const { t } = useLanguage();

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNote(item.id, e.target.value);
  };

  return (
    <div className="flex gap-4">
      <Image
        src={item.image}
        data-ai-hint="coffee product"
        alt={item.name}
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(item.price)}
            </p>
          </div>
          <p className="font-bold text-primary">
            {formatCurrency(item.price * item.qty)}
          </p>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <QuantityControl
            quantity={item.qty}
            onQuantityChange={(newQty) => updateQty(item.id, newQty)}
            size="sm"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => updateQty(item.id, 0)}
            aria-label={t('cart_remove_item', { name: item.name })}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Input
          type="text"
          placeholder={t('cart_item_note_placeholder')}
          value={item.note || ''}
          onChange={handleNoteChange}
          className="h-8 mt-2 text-xs"
        />
      </div>
    </div>
  );
}
