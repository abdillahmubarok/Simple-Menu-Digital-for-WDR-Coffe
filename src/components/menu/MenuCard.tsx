'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import type { MenuItem } from '@/types';
import { formatCurrency } from '@/lib/currency';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QuantityControl } from './QuantityControl';

interface MenuCardProps {
  item: MenuItem;
  categoryId: string;
}

export function MenuCard({ item, categoryId }: MenuCardProps) {
  const { addItem, updateQty, getItem } = useCart();
  const { toast } = useToast();
  const [note, setNote] = useState('');
  const cartItem = getItem(item.id);

  const handleAddToCart = () => {
    addItem({ ...item, categoryId }, { note });
    toast({
      title: `${item.name} ditambahkan`,
      description: `Catatan: ${note || 'Tidak ada'}`,
    });
  };

  const handleQuantityChange = (newQty: number) => {
    updateQty(item.id, newQty);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNote = e.target.value;
    setNote(newNote);
    if (cartItem) {
      // In a real app you might want to debounce this
      // For now, we only update note in cart if item is already there
      // and let the user re-add to update note if not.
      // Or we can provide a separate "update note" button.
      // This is a simplification. The note is mainly captured on add.
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <Image
          src={item.image}
          data-ai-hint="coffee food"
          alt={item.name}
          width={400}
          height={300}
          className="object-cover w-full h-40"
        />
        <div className="p-4">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <CardDescription>{item.desc}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-lg font-bold text-primary">
          {formatCurrency(item.price)}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4 pt-0">
        {cartItem ? (
          <div className="w-full">
            <p className="text-sm font-medium mb-2">Di keranjang:</p>
            <QuantityControl
              quantity={cartItem.qty}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        ) : (
          <>
            <Input
              type="text"
              placeholder="Catatan (opsional)"
              value={note}
              onChange={handleNoteChange}
              className="h-9"
            />
            <Button className="w-full" onClick={handleAddToCart}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
