'use client';
import { useState } from 'react';
import { MENU } from '@/data/menu';
import { MenuCard } from './MenuCard';
import { Input } from '@/components/ui/input';

export function MenuGrid() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenu = MENU.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.items.length > 0);

  return (
    <div className="space-y-12">
      <div className="max-w-md mx-auto">
        <Input
          type="search"
          placeholder="Cari menu..."
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredMenu.length > 0 ? (
        filteredMenu.map((category) => (
          <section key={category.id}>
            <h2 className="text-3xl font-bold mb-6 border-b-2 border-primary pb-2">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.items.map((item) => (
                <MenuCard key={item.id} item={item} categoryId={category.id} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">
            Tidak ada item menu yang cocok dengan pencarian Anda.
          </p>
        </div>
      )}
    </div>
  );
}
