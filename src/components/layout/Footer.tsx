import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M12.52.02c1.31-.02 2.61.16 3.8.59v5.17a3.81 3.81 0 0 1-1.3.18c-1.2.06-2.4-.33-3.4-1.1a4.35 4.35 0 0 1-1.8-3.4c-.07-1.1.28-2.2.9-3.1a4.2 4.2 0 0 1 1.8-1.4z"></path>
    <path d="M10.22 6.55v11.66c-1.33.2-2.7.1-4-.4-1.5-.5-2.8-1.4-3.8-2.7a5.3 5.3 0 0 1-1.3-3.8c0-1.1.3-2.2.9-3.2a5.4 5.4 0 0 1 4.1-3.1 5.07 5.07 0 0 1 4.1.2z"></path>
    <path d="M19.38 8.76v5.4c-1.2.3-2.4.4-3.7.2a4.8 4.8 0 0 1-4.2-3.4 4.6 4.6 0 0 1 .5-4.4 4.93 4.93 0 0 1 4.2-2.3c1.3-.1 2.5.3 3.5 1.1a4.13 4.13 0 0 1 1.5 3.5v.2h-3.3z"></path>
  </svg>
);

export function Footer() {
  const socialLinks = [
    {
      href: '#',
      icon: <Instagram />,
      label: 'Instagram',
    },
    {
      href: '#',
      icon: <Facebook />,
      label: 'Facebook',
    },
    {
      href: '#',
      icon: <Twitter />,
      label: 'Twitter',
    },
    {
      href: '#',
      icon: <TikTokIcon />,
      label: 'TikTok',
    },
  ];

  const navLinks = [
     { href: '/', label: 'Home' },
    {
      href: '/contact',
      label: 'Kontak',
    },
    {
      href: 'https://maps.app.goo.gl/ZYh97vzFxwRQW2PD7?utm_source=website&utm_medium=header&utm_campaign=mubarokahdigitalxwdr',
      label: 'Lokasi',
      external: true,
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-lg mb-2">WDR Coffee</h3>
            <p className="text-sm opacity-80">
             Tempat nongkrong & ngopi, Free Wifi, Harga terjangkau, Buka 24 Jam.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Navigasi</h3>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                     target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : ''}
                    className="text-sm hover:underline opacity-80 hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Ikuti Kami</h3>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-4 text-center text-xs opacity-70">
          <p>
            Made with ❤️ by PT MUBAROKAH DIGITAL NUSANTARA
          </p>
        </div>
      </div>
    </footer>
  );
}
