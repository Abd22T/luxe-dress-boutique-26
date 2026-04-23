import { useState } from "react";
import { Eye, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useCart } from "@/components/store/cart-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Product } from "@/data/products";

export function QuickViewDialog({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghostLuxury" size="luxurySm">
          <Eye /> Quick view
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl border-border/60 bg-card p-0 shadow-soft">
        <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[320px] overflow-hidden md:min-h-[560px]">
            <img
              src={product.image}
              alt={product.alt}
              className="h-full w-full object-cover"
              loading="lazy"
              width={960}
              height={1280}
            />
          </div>
          <div className="flex flex-col gap-6 p-8 md:p-10">
            <DialogHeader className="space-y-3 text-left">
              <p className="eyebrow">{product.subtitle}</p>
              <DialogTitle className="font-display text-3xl text-foreground">{product.name}</DialogTitle>
              <DialogDescription className="text-base leading-7 text-muted-foreground">
                {product.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="badge-luxe">
                  {tag}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Select size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={selectedSize === size ? "size-chip active" : "size-chip"}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end justify-between gap-4 border-t border-border/70 pt-6">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Price</p>
                <p className="font-display text-3xl text-foreground">${product.price}</p>
              </div>
              <div className="flex flex-wrap justify-end gap-3">
                <Button asChild variant="outlineLuxury" size="luxury">
                  <Link to="/products/$productId" params={{ productId: product.id }}>
                    View details
                  </Link>
                </Button>
                <Button variant="hero" size="luxury" onClick={() => addItem(product.id, selectedSize)}>
                  <ShoppingBag /> Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
