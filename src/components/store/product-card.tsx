import { ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useCart } from "@/components/store/cart-context";
import { QuickViewDialog } from "@/components/store/quick-view-dialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="group product-card-panel">
      <Link to="/products/$productId" params={{ productId: product.id }} className="block overflow-hidden">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={product.image}
            alt={product.alt}
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            width={960}
            height={1280}
          />
          <div className="image-sheen" />
        </div>
      </Link>
      <div className="space-y-5 px-1 pb-1 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="eyebrow">{product.subtitle}</p>
            <div>
              <Link
                to="/products/$productId"
                params={{ productId: product.id }}
                className="font-display text-2xl text-foreground transition-colors hover:text-primary"
              >
                {product.name}
              </Link>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{product.description}</p>
            </div>
          </div>
          <p className="font-display text-2xl text-foreground">${product.price}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="badge-luxe">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <QuickViewDialog product={product} />
          <Button variant="outlineLuxury" size="luxury" onClick={() => addItem(product.id, product.sizes[0])}>
            <ShoppingBag /> Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
