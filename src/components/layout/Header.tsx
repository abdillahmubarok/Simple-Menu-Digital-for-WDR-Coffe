'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, MapPin, Phone, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

interface HeaderProps {
  activePage: 'home' | 'kontak';
}

const navLinks = [
  {
    id: 'home',
    href: '/',
    label: 'Home',
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: 'kontak',
    href: '/contact',
    label: 'Kontak',
    icon: <Phone className="h-5 w-5" />,
  },
  {
    id: 'lokasi',
    href: 'https://maps.app.goo.gl/ZYh97vzFxwRQW2PD7?utm_source=website&utm_medium=header&utm_campaign=mubarokahdigitalxwdr',
    label: 'Lokasi',
    icon: <MapPin className="h-5 w-5" />,
    external: true,
  },
];

function HeaderContent({ activePage }: HeaderProps) {
  const searchParams = useSearchParams();
  const table = searchParams.get('table');

  return (
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link href="/">
        <Image
          src="https://i.ibb.co/20GLj11v/wdr-coffee-logo.png"
          alt="WDR Coffee Logo"
          width={125}
          height={75}
          className="h-12 w-auto"
          priority
        />
      </Link>
      {/* Desktop Navigation */}
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

      <div className="flex items-center gap-4">
        {table && (
          <div className="hidden sm:block text-sm font-semibold bg-accent text-accent-foreground px-3 py-1 rounded-full">
            Meja: {table}
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-3/4">
              <SheetHeader>
                <SheetTitle className="text-left">WDR Coffee</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <SheetClose key={link.id} asChild>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : ''}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg text-lg',
                        activePage === link.id
                          ? 'bg-secondary font-bold'
                          : 'hover:bg-secondary/80'
                      )}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export function Header({ activePage }: HeaderProps) {
  return (
    <header className="py-2 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-40">
      <Suspense
        fallback={<div className="container mx-auto px-4">Loading...</div>}
      >
        <HeaderContent activePage={activePage} />
      </Suspense>
    </header>
  );
}
