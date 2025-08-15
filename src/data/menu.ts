import type { Category } from '@/types';

export const MENU: Category[] = [
  {
    id: 'coffee',
    name: 'Coffee',
    items: [
      { id: 'esp', name: 'Espresso', price: 18000, desc: 'Single shot' },
      { id: 'amr', name: 'Americano', price: 22000, desc: 'Espresso + air' },
      { id: 'ltt', name: 'Caffè Latte', price: 26000, desc: 'Espresso + susu' },
      { id: 'cap', name: 'Cappuccino', price: 26000, desc: 'Susu dengan busa' },
    ],
  },
  {
    id: 'non-coffee',
    name: 'Non-Coffee',
    items: [
      { id: 'mch', name: 'Matcha Latte', price: 28000, desc: 'Matcha + susu' },
      { id: 'cho', name: 'Iced Chocolate', price: 25000, desc: 'Coklat + susu' },
      { id: 'rvel', name: 'Red Velvet', price: 28000, desc: 'Bubuk red velvet + susu' },
    ],
  },
  {
    id: 'snacks',
    name: 'Snacks',
    items: [
      { id: 'frf', name: 'French Fries', price: 20000, desc: 'Renyah dan gurih' },
      { id: 'ckn', name: 'Chicken Nuggets', price: 23000, desc: '6 buah nugget ayam' },
      { id: 'croi', name: 'Croissant', price: 18000, desc: 'Plain butter croissant' },
    ],
  },
  {
    id: 'addons',
    name: 'Add-ons',
    items: [
      { id: 'shg', name: 'Shot Espresso', price: 6000, desc: 'Shot tambahan' },
      { id: 'syr', name: 'Syrup Vanilla', price: 4000, desc: 'Tambahan rasa vanila' },
    ],
  },
];
