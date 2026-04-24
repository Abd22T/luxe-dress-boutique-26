import { CartProvider } from "@/components/store/cart-context";
import { SiteFooter } from "@/components/store/site-footer";
import { SiteHeader } from "@/components/store/site-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </CartProvider>
  );
}
