import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ProductGrid } from "@/components/store/product-grid";
import { SectionHeading } from "@/components/store/section-heading";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, getCategoryBySlug, getProductsByCategory } from "@/data/products";

const SITE_URL = "https://id-preview--480b7a18-78f7-460d-8645-c26512290454.lovable.app";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategoryBySlug(params.slug);
    if (!category) {
      throw notFound();
    }

    return {
      category,
      products: getProductsByCategory(params.slug),
    };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.category.name ?? "Collection";
    const description = loaderData?.category.description ?? "Luxury dress collection";
    const slug = loaderData?.category.slug ?? "categories";

    return ({
    meta: [
      { title: `${title} | Atelier Élise` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Atelier Élise` },
      { property: "og:description", content: description },
      { name: "twitter:title", content: `${title} | Atelier Élise` },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/categories/${slug}` }],
  });
  },
  component: CategoryPage,
  notFoundComponent: CategoryNotFound,
  errorComponent: CategoryError,
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData();
  const [sortValue, setSortValue] = useState("featured");
  const [filterValue, setFilterValue] = useState("all");

  const sortedProducts = useMemo(() => {
    const next = [...products].filter((product) => {
      if (filterValue === "all") return true;
      if (filterValue === "new") return Boolean(product.newArrival);
      if (filterValue === "trending") return Boolean(product.trending);
      return product.tags.some((tag) => tag.toLowerCase().includes(filterValue));
    });

    if (sortValue === "price-low") return next.sort((a, b) => a.price - b.price);
    if (sortValue === "price-high") return next.sort((a, b) => b.price - a.price);
    if (sortValue === "name") return next.sort((a, b) => a.name.localeCompare(b.name));
    return next.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [filterValue, products, sortValue]);

  return (
    <div className="section-shell pb-20 pt-8">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={category.eyebrow}
              title={category.name}
              description={category.description}
            />
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outlineLuxury" size="luxury">
                <a href="/#categories">Back to categories</a>
              </Button>
              <Button asChild variant="ghostLuxury" size="luxury">
                <Link to="/products/$productId" params={{ productId: products[0]?.id ?? "aurelia-silk-gown" }}>
                  Featured piece <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>

          <div className="category-hero panel-elevated">
            <img
              src={category.heroImage}
              alt={category.name}
              className="h-[440px] w-full object-cover"
              width={960}
              height={1280}
            />
            <div className="hero-spotlight" />
          </div>
        </div>

        <div className="filter-panel">
          <div className="flex items-center gap-3">
            <div className="icon-action static">
              <SlidersHorizontal />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Curate the edit</p>
              <p className="text-sm text-foreground">Filtering and sorting are applied instantly.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger className="select-luxury">
                <SelectValue placeholder="Filter pieces" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All pieces</SelectItem>
                <SelectItem value="new">New arrivals</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="silk">Silk & satin</SelectItem>
                <SelectItem value="minimal">Minimal lines</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortValue} onValueChange={setSortValue}>
              <SelectTrigger className="select-luxury">
                <SelectValue placeholder="Sort products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured first</SelectItem>
                <SelectItem value="price-low">Price: low to high</SelectItem>
                <SelectItem value="price-high">Price: high to low</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ProductGrid products={sortedProducts} />

        <section className="section-soft rounded-md border border-border/70 px-6 py-10 sm:px-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {categories.map((item) => (
              <Link
                key={item.slug}
                to="/categories/$slug"
                params={{ slug: item.slug }}
                className="group rounded-sm border border-border/70 bg-card/70 p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="eyebrow">{item.eyebrow}</p>
                <p className="mt-3 font-display text-2xl text-foreground">{item.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CategoryNotFound() {
  return (
    <div className="section-shell">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="eyebrow">Collection unavailable</p>
        <h1 className="mt-4 font-display text-5xl text-foreground">This category is not in the current edit.</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Return to the curated homepage collections and continue browsing from there.
        </p>
        <div className="mt-8">
          <Button asChild variant="hero" size="luxury">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function CategoryError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="section-shell">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="eyebrow">Something interrupted the collection</p>
        <h1 className="mt-4 font-display text-5xl text-foreground">Unable to load the category.</h1>
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
