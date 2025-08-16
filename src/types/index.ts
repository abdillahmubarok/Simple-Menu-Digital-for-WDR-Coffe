export interface MenuItem {
  id: string;
  name: string;
  price: number;
  desc: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  note?: string;
  categoryId: string;
  image: string;
}

export interface Cart {
  items: CartItem[];
  createdAt: number;
}

export interface CheckoutInfo {
  name: string;
  phone: string;
}
