'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function HeaderContent() {
  const searchParams = useSearchParams();
  const table = searchParams.get('table');

  return (
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-primary">
        WDR Coffee
      </Link>
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
      <Suspense fallback={<div className="container mx-auto px-4">Loading...</div>}>
        <HeaderContent />
      </Suspense>
    </header>
  );
}
