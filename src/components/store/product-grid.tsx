import { ProductCard } from "@/components/store/product-card";
import type { Product } from "@/data/products";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
