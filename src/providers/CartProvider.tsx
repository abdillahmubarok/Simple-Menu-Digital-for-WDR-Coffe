'use client';

import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Cart, CartItem, MenuItem } from '@/types';
import { useToast } from '@/hooks/use-toast';

const CART_STORAGE_KEY = 'wdr_cart_v1';

const getInitialCart = (): Cart => ({
  items: [],
  createdAt: Date.now(),
});

interface CartContextType {
  cart: Cart;
  addItem: (item: MenuItem & { categoryId: string }, opts?: { note?: string }) => void;
  updateQty: (itemId: string, qty: number) => void;
  updateNote: (itemId: string, note: string) => void;
  clearCart: () => void;
  cartTotal: () => number;
  getItem: (itemId: string) => CartItem | undefined;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(getInitialCart());
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.warn('Could not load cart from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.warn('Could not save cart to localStorage', error);
    }
  }, [cart]);
  
  const getItem = (itemId: string): CartItem | undefined => {
    return cart.items.find((item) => item.id === itemId);
  };

  const addItem = (item: MenuItem & { categoryId: string }, opts: { note?: string } = {}) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex((i) => i.id === item.id);
      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        newItems = [...prevCart.items];
        const existingItem = newItems[existingItemIndex];
        newItems[existingItemIndex] = {
          ...existingItem,
          qty: existingItem.qty + 1,
          note: opts.note || existingItem.note, // Update note if provided
        };
      } else {
        const newCartItem: CartItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          qty: 1,
          note: opts.note,
          categoryId: item.categoryId,
        };
        newItems = [...prevCart.items, newCartItem];
      }
      return { ...prevCart, items: newItems };
    });
  };

  const updateQty = (itemId: string, qty: number) => {
    setCart((prevCart) => {
      if (qty < 1) {
        const newItems = prevCart.items.filter((i) => i.id !== itemId);
        toast({ title: 'Item dihapus dari keranjang' });
        return { ...prevCart, items: newItems };
      }

      const newItems = prevCart.items.map((item) =>
        item.id === itemId ? { ...item, qty } : item
      );
      return { ...prevCart, items: newItems };
    });
  };

  const updateNote = (itemId: string, note: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.id === itemId ? { ...item, note } : item
      );
      return { ...prevCart, items: newItems };
    });
  };

  const clearCart = () => {
    setCart(getInitialCart());
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      toast({ title: 'Keranjang dikosongkan', description: 'Silakan mulai memesan lagi.' });
    } catch (error) {
      console.warn('Could not clear cart from localStorage', error);
    }
  };

  const cartTotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const value = {
    cart,
    addItem,
    updateQty,
    updateNote,
    clearCart,
    cartTotal,
    getItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
