import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/components/store/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getProductById } from "@/data/products";

export function CartSheet() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="nav" size="iconSm" aria-label="Open cart">
          <ShoppingBag />
          <span className="cart-count">{itemCount}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-6 border-border/70 bg-card px-5 py-6 shadow-soft sm:max-w-md">
        <SheetHeader className="space-y-3 text-left">
          <p className="eyebrow">Bag overview</p>
          <SheetTitle className="font-display text-3xl text-foreground">Your cart</SheetTitle>
          <SheetDescription className="text-sm leading-6 text-muted-foreground">
            A clean edit of your current selection.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <ShoppingBag />
              </div>
              <div className="space-y-2">
                <p className="font-display text-2xl text-foreground">Your bag is empty</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Curate your next occasion look from the edit.
                </p>
              </div>
            </div>
          ) : (
            items.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;

              return (
                <article key={`${item.productId}-${item.size}`} className="cart-line">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="h-28 w-24 rounded-sm object-cover"
                    loading="lazy"
                    width={240}
                    height={320}
                  />
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Size {item.size}</p>
                      <p className="font-display text-xl text-foreground">${product.price}</p>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="quantity-stepper">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        >
                          <Minus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        >
                          <Plus />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="icon-action"
                        onClick={() => removeItem(item.productId, item.size)}
                        aria-label="Remove item"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="space-y-4 border-t border-border/70 pt-5">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Estimated subtotal</span>
            <span className="font-display text-2xl text-foreground">${subtotal}</span>
          </div>
          <div className="space-y-3">
            <Button variant="hero" size="luxury" className="w-full">
              Secure checkout
            </Button>
            <Button variant="outlineLuxury" size="luxury" className="w-full" onClick={clearCart}>
              Clear cart
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
