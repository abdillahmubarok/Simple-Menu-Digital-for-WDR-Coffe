import { Footer } from "@/components/layout/Footer";
import { MenuHeader } from "@/components/menu/MenuHeader";
import { CartIconButton } from "@/components/cart/CartIconButton";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <MenuHeader />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <CartIconButton />
      <Footer />
    </div>
  );
}
