import type { Category } from '@/types';

export const MENU: Category[] = [
  {
    id: 'food',
    name: 'Food',
    items: [
      { id: 'ayteri', name: 'Ayam Teriyaki', price: 9000, desc: 'Nasi + Ayam Teriyaki' },
      { id: 'aylh', name: 'Ayam Lada Hitam', price: 9000, desc: 'Nasi + Ayam Lada Hitam' },
      { id: 'ckc', name: 'Chiken Katsu Curry', price: 9000, desc: 'Nasi + Chiken Katsu Curry' },
      { id: 'ag', name: 'Ayam Geprek', price: 8000, desc: 'Nasi + Ayam Geprek' },
      { id: 'ab', name: 'Ayam Bawang', price: 10000, desc: 'Nasi + Ayam Bawang'},
      {id: 'ap', name: 'Ayam Penyet', price: 10000, desc: 'Nasi + Ayam Penyet'},
      {id: 'aber', name: 'Ayam Barbeque', price: 10000, desc: 'Nasi + Ayam Barbeque'},
      {id: 'ttp', name: 'Telur Tahu Penyet', price: 8000, desc: 'Nasi + Telur Tahu Penyet'},
      {id: 'ttmp', name: 'Telur Tempe Penyet', price: 8000, desc: 'Nasi + Telur Tempe Penyet'},
      {id: 'npc', name: 'Nasi Pecel', price: 7000, desc: 'Nasi pecel'},
    ],
  },
  {
    id: 'drink',
    name: 'Drink',
    items: [
      { id: 'kh', name: 'Kopi Hitam', price: 5000, desc: 'Kopi Hitam Manis atau Pahit' },
      { id: 'ks', name: 'Kopi Susu', price: 5000, desc: 'Kopp + Susu' },
      { id: 'esteh', name: 'Es Teh', price: 3000, desc: 'Es Teh Manis atau Tawar' },
      { id: 'tehpns', name: 'Teh Panas', price: 3000, desc: 'Es Teh Manis atau Tawar' },
      { id: 'esjeruk', name: 'Es Jeruk', price: 5000, desc: 'Es Jeruk Manis atau Tawar' },
      { id: 'jerukpns', name: 'Jeruk Panas', price: 5000, desc: 'Jeruk Panas Manis atau Tawar' },
      { id: 'ntrs', name: 'Nutrisari', price: 4000, desc: 'Nutrisari, Silahkan masukkan deskripsi rasa' },
      { id: 'jsa', name: 'Josua', price: 7000, desc: 'Josua' },
      { id: 'kbm', name: 'Kukubima', price: 7000, desc: 'Kukubima' },
      { id: 'gd', name: 'Good Day', price: 5000, desc: 'Good Day Es atau Panas' },
      { id: 'bbng', name: 'BengBeng', price: 5000, desc: 'Bengbeng Es atau Panas' },
      { id: 'ykl', name: 'Yakult Lecy', price: 7000, desc: 'Yakult Lecy' },
      { id: 'ykstrw', name: 'Yakult Strawberry', price: 7000, desc: 'Yakult Strawberry' },

    ],
  }
];
