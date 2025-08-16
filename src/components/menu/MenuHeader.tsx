'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Home, MapPin, Phone } from 'lucide-react';

function HeaderContent() {
  const searchParams = useSearchParams();
  const table = searchParams.get('table');

  const navLinks = [
    { href: '/', label: 'Home', icon: <Home className="h-4 w-4" /> },
    {
      href: '/contact',
      label: 'Kontak',
      icon: <Phone className="h-4 w-4" />,
    },
    {
      href: 'https://maps.app.goo.gl/wLzJ41VvP2gbyz3B9',
      label: 'Lokasi',
      icon: <MapPin className="h-4 w-4" />,
      external: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-primary">
        WDR Coffee
      </Link>
      <nav className="hidden md:flex items-center gap-2">
        {navLinks.map((link) => (
          <Button key={link.label} asChild variant="ghost">
            <Link
              href={link.href}
              target={link.external ? '_blank' : '_self'}
              rel={link.external ? 'noopener noreferrer' : ''}
            >
              {link.icon}
              <span className="ml-2">{link.label}</span>
            </Link>
          </Button>
        ))}
      </nav>
      {table && (
        <div className="text-sm font-semibold bg-accent text-accent-foreground px-3 py-1 rounded-full">
          Meja: {table}
        </div>
      )}
    </div>
  );
}

export function MenuHeader() {
  return (
    <header className="py-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-40">
      <Suspense
        fallback={<div className="container mx-auto px-4">Loading...</div>}
      >
        <HeaderContent />
      </Suspense>
    </header>
  );
}
