'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface QuantityControlProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  size?: 'default' | 'sm';
}

export function QuantityControl({
  quantity,
  onQuantityChange,
  size = 'default',
}: QuantityControlProps) {
  const { t } = useLanguage();
  const handleDecrement = () => {
    onQuantityChange(Math.max(0, quantity - 1));
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };
  
  const buttonSize = size === 'sm' ? 'icon-sm' : 'icon';
  const inputClass = size === 'sm' ? 'h-8 w-12 text-center' : 'h-10 w-16 text-center text-base';

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className={size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'}
        onClick={handleDecrement}
        aria-label={t('quantity_decrease')}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        className={`${inputClass} text-center`}
        value={quantity}
        readOnly
        aria-label={t('quantity_current')}
      />
      <Button
        variant="outline"
        size="icon"
        className={size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'}
        onClick={handleIncrement}
        aria-label={t('quantity_increase')}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
