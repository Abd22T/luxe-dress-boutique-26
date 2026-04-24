import { Heart, ShoppingBag } from "lucide-react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { ProductGrid } from "@/components/store/product-grid";
import { SectionHeading } from "@/components/store/section-heading";
import { useCart } from "@/components/store/cart-context";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug, getProductById, getProductsByCategory } from "@/data/products";

const SITE_URL = "https://id-preview--480b7a18-78f7-460d-8645-c26512290454.lovable.app";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = getProductById(params.productId);
    if (!product) {
      throw notFound();
    }

    const related = getProductsByCategory(product.category).filter((item) => item.id !== product.id);
    const category = getCategoryBySlug(product.category);

    return { product, related, category };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    const title = product?.name ?? "Product";
    const description = product?.description ?? "Luxury women's dress";
    const image = product?.image ?? "";
    const productId = product?.id ?? "product";

    return {
      meta: [
        { title: `${title} | Atelier Élise` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} | Atelier Élise` },
        { property: "og:description", content: description },
        ...(image ? [{ property: "og:image", content: image }] : []),
        { name: "twitter:title", content: `${title} | Atelier Élise` },
        { name: "twitter:description", content: description },
        ...(image ? [{ name: "twitter:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/products/${productId}` }],
    };
  },
  component: ProductPage,
  notFoundComponent: ProductNotFound,
  errorComponent: ProductError,
});

function ProductPage() {
  const { product, related, category } = Route.useLoaderData();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="section-shell pb-20 pt-8">
      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="grid gap-5 md:grid-cols-[1fr_0.36fr]">
            <div className="panel-elevated overflow-hidden">
              <img
                src={product.image}
                alt={product.alt}
                className="aspect-[4/5] w-full object-cover"
                width={960}
                height={1280}
              />
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
              <div className="panel-elevated overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                  width={480}
                  height={640}
                />
              </div>
              {category ? (
                <Link
                  to="/categories/$slug"
                  params={{ slug: category.slug }}
                  className="panel-elevated flex min-h-[220px] flex-col justify-between p-6"
                >
                  <div>
                    <p className="eyebrow">Category</p>
                    <p className="mt-3 font-display text-3xl text-foreground">{category.name}</p>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{category.description}</p>
                </Link>
              ) : null}
            </div>
          </div>

          <div className="sticky top-28 space-y-8">
            <div className="space-y-4">
              <p className="eyebrow">{product.subtitle}</p>
              <h1 className="font-display text-5xl leading-none text-foreground">{product.name}</h1>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="badge-luxe">
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-y border-border/70 py-6">
              <p className="font-display text-4xl text-foreground">${product.price}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Complimentary tailoring guidance and premium packaging on every order.
              </p>
            </div>

            <div className="space-y-4">
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

            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="luxury" onClick={() => addItem(product.id, selectedSize)}>
                <ShoppingBag /> Add to cart
              </Button>
              <Button variant="outlineLuxury" size="luxury">
                <Heart /> Save for later
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="stat-panel">
                <p className="font-display text-2xl text-foreground">Tailored</p>
                <p className="text-sm leading-6 text-muted-foreground">Precision fit notes included.</p>
              </div>
              <div className="stat-panel">
                <p className="font-display text-2xl text-foreground">Luxe</p>
                <p className="text-sm leading-6 text-muted-foreground">Premium packaging and fabric care.</p>
              </div>
              <div className="stat-panel">
                <p className="font-display text-2xl text-foreground">Express</p>
                <p className="text-sm leading-6 text-muted-foreground">Priority dispatch on core edits.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeading
            eyebrow="You may also like"
            title="More from the same category edit"
            description="Complementary silhouettes selected from the same collection for a consistent refined wardrobe."
          />
          <ProductGrid products={related.slice(0, 3)} />
        </section>
      </div>
    </div>
  );
}

function ProductNotFound() {
  return (
    <div className="section-shell">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="eyebrow">Piece unavailable</p>
        <h1 className="mt-4 font-display text-5xl text-foreground">The selected dress could not be found.</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Continue browsing the current seasonal edit and discover similar silhouettes.
        </p>
        <div className="mt-8">
          <Button asChild variant="hero" size="luxury">
            <Link to="/">Return home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="section-shell">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="eyebrow">Product detail unavailable</p>
        <h1 className="mt-4 font-display text-5xl text-foreground">Unable to load the product.</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">{error.message}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button variant="hero" size="luxury" onClick={reset}>
            Try again
          </Button>
          <Button asChild variant="outlineLuxury" size="luxury">
            <Link to="/">Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
