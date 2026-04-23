import * as React from "react";

import { getProductById } from "@/data/products";

export type CartItem = {
  productId: string;
  quantity: number;
  size: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  const addItem = React.useCallback((productId: string, size: string) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId && item.size === size);
      if (existing) {
        return current.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { productId, quantity: 1, size }];
    });
  }, []);

  const removeItem = React.useCallback((productId: string, size: string) => {
    setItems((current) =>
      current.filter((item) => !(item.productId === productId && item.size === size)),
    );
  }, []);

  const updateQuantity = React.useCallback((productId: string, size: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: Math.max(1, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = React.useCallback(() => setItems([]), []);

  const itemCount = React.useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = React.useMemo(
    () =>
      items.reduce((total, item) => {
        const product = getProductById(item.productId);
        return total + (product?.price ?? 0) * item.quantity;
      }, 0),
    [items],
  );

  const value = React.useMemo(
    () => ({ items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart }),
    [addItem, clearCart, itemCount, items, removeItem, subtotal, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = React.useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return value;
}
