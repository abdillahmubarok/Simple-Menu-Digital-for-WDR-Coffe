import { ContactForm } from '@/components/contact/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { Header } from '@/components/layout/Header';


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
    className="h-6 w-6"
  >
    <path d="M12.52.02c1.31-.02 2.61.16 3.8.59v5.17a3.81 3.81 0 0 1-1.3.18c-1.2.06-2.4-.33-3.4-1.1a4.35 4.35 0 0 1-1.8-3.4c-.07-1.1.28-2.2.9-3.1a4.2 4.2 0 0 1 1.8-1.4z"></path>
    <path d="M10.22 6.55v11.66c-1.33.2-2.7.1-4-.4-1.5-.5-2.8-1.4-3.8-2.7a5.3 5.3 0 0 1-1.3-3.8c0-1.1.3-2.2.9-3.2a5.4 5.4 0 0 1 4.1-3.1 5.07 5.07 0 0 1 4.1.2z"></path>
    <path d="M19.38 8.76v5.4c-1.2.3-2.4.4-3.7.2a4.8 4.8 0 0 1-4.2-3.4 4.6 4.6 0 0 1 .5-4.4 4.93 4.93 0 0 1 4.2-2.3c1.3-.1 2.5.3 3.5 1.1a4.13 4.13 0 0 1 1.5 3.5v.2h-3.3z"></path>
  </svg>
);

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

export default function ContactPage() {
  return (
    <div className="bg-background flex flex-col min-h-screen">
      <Header activePage="kontak" />
      <main className="container mx-auto px-4 py-8 md:py-16 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Hubungi Kami</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Kami senang mendengar dari Anda!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Informasi Kontak</h3>
              <p className="text-muted-foreground">
                Jl. Ahmad Yani, Pandean, Kecamatan Mejayan, Kabupaten Madiun, Jawa Timur 63153
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>WhatsApp:</strong> +62 852-5791-9775
              </p>
            </div>
             <div>
              <h3 className="text-2xl font-semibold mb-4">Temukan Kami</h3>
                <div className="aspect-video overflow-hidden rounded-xl border">
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.324023229314!2d112.17906987517013!3d-7.755417176904444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e785d002374ed17%3A0xf96cf4719553fb03!2sWDR%20COFFEE!5e0!3m2!1sid!2sid!4v1755329172708!5m2!1sid!2sid" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Terhubung dengan Kami</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <Button key={link.label} variant="outline" size="icon" asChild>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
