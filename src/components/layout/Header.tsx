'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
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
import { useLanguage } from '@/hooks/use-language';
import { LanguageSwitcher } from '../LanguageSwitcher';

interface HeaderProps {
  activePage: 'home' | 'kontak';
}

function HeaderContent({ activePage }: HeaderProps) {
  const searchParams = useSearchParams();
  const table = searchParams.get('table');
  const { t } = useLanguage();

  const navLinks = [
    {
      id: 'home',
      href: '/',
      label: t('nav_home'),
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: 'kontak',
      href: '/contact',
      label: t('nav_contact'),
      icon: <Phone className="h-5 w-5" />,
    },
    {
      id: 'lokasi',
      href: 'https://maps.app.goo.gl/ZYh97vzFxwRQW2PD7?utm_source=website&utm_medium=header&utm_campaign=mubarokahdigitalxwdr',
      label: t('nav_location'),
      icon: <MapPin className="h-5 w-5" />,
      external: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link href="/">
        <Image
          src="https://i.ibb.co/wFBDKrfG/wdr-coffee-logo-hgf2u6t2.jpg"
          alt="WDR Coffee Logo"
          width={75}
          height={75}
          className="h-12 w-auto"
          priority
        />
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1">
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

      <div className="flex items-center gap-2">
        {table && (
          <div className="hidden sm:block text-sm font-semibold bg-accent text-accent-foreground px-3 py-1 rounded-full">
            {t('header_table')}: {table}
          </div>
        )}
        
        <LanguageSwitcher />

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t('header_openMenu')}</span>
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
