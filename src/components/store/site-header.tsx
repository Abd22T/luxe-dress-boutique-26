import { Menu, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { CartSheet } from "@/components/store/cart-sheet";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationLinks = [
  { label: "Top Selling", href: "/#top-selling" },
  { label: "Trending", href: "/#trending" },
  { label: "Categories", href: "/#categories" },
  { label: "Evening", to: "/categories/$slug", params: { slug: "evening-dresses" as const } },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 lg:hidden">
          <MobileMenu />
        </div>

        <Link to="/" className="brand-mark" aria-label="Atelier Élise home">
          <span>Atelier Élise</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigationLinks.map((item) =>
            "href" in item ? (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.to} params={item.params} className="nav-link">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="nav" size="iconSm" aria-label="Search products">
            <Search />
          </Button>
          <CartSheet />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="nav" size="iconSm" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="border-border/60 bg-card px-5 py-6 sm:max-w-xs">
        <SheetHeader className="text-left">
          <p className="eyebrow">Navigation</p>
          <SheetTitle className="font-display text-3xl text-foreground">Atelier Élise</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4">
          <a href="/#top-selling" className="mobile-nav-link">
            Top Selling
          </a>
          <a href="/#trending" className="mobile-nav-link">
            Trending
          </a>
          <a href="/#categories" className="mobile-nav-link">
            Categories
          </a>
          <Link to="/categories/$slug" params={{ slug: "day-dresses" }} className="mobile-nav-link">
            Day Dresses
          </Link>
          <Link to="/categories/$slug" params={{ slug: "occasionwear" }} className="mobile-nav-link">
            Occasionwear
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
