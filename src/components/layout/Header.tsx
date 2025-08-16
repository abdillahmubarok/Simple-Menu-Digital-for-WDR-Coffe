'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Home, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  activePage: 'home' | 'kontak';
}

function HeaderContent({ activePage }: HeaderProps) {
  const searchParams = useSearchParams();
  const table = searchParams.get('table');

  const navLinks = [
    {
      id: 'home',
      href: '/',
      label: 'Home',
      icon: <Home className="h-4 w-4" />,
    },
    {
      id: 'kontak',
      href: '/contact',
      label: 'Kontak',
      icon: <Phone className="h-4 w-4" />,
    },
    {
      id: 'lokasi',
      href: 'https://maps.app.goo.gl/ZYh97vzFxwRQW2PD7?utm_source=website&utm_medium=header&utm_campaign=mubarokahdigitalxwdr',
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
          <Button
            key={link.id}
            asChild
            variant={activePage === link.id ? 'secondary' : 'ghost'}
            className={cn(activePage === link.id && 'font-bold')}
          >
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

export function Header({ activePage }: HeaderProps) {
  return (
    <header className="py-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-40">
      <Suspense
        fallback={<div className="container mx-auto px-4">Loading...</div>}
      >
        <HeaderContent activePage={activePage} />
      </Suspense>
    </header>
  );
}
