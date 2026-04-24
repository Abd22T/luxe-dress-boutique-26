import { ArrowRight, MoveRight } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { CategoryCard } from "@/components/store/category-card";
import { ProductGrid } from "@/components/store/product-grid";
import { SectionHeading } from "@/components/store/section-heading";
import { Button } from "@/components/ui/button";
import { categories, featuredProducts, heroStats, trendingProducts } from "@/data/products";

const SITE_URL = "https://id-preview--480b7a18-78f7-460d-8645-c26512290454.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier Élise | Luxury Women's Dresses" },
      {
        name: "description",
        content:
          "Minimalist luxury fashion boutique for women's dresses, featuring top selling edits, trending styles, and refined category collections.",
      },
      { property: "og:title", content: "Atelier Élise | Luxury Women's Dresses" },
      {
        property: "og:description",
        content:
          "Discover premium dresses, curated collections, and editorial occasionwear with a minimalist luxury aesthetic.",
      },
      { name: "twitter:title", content: "Atelier Élise | Luxury Women's Dresses" },
      {
        name: "twitter:description",
        content:
          "Discover premium dresses, curated collections, and editorial occasionwear with a minimalist luxury aesthetic.",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <section className="hero-shell">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-between gap-10 py-4 lg:py-10">
            <div className="space-y-7">
              <p className="eyebrow">Luxury womenswear</p>
              <div className="space-y-5">
                <h1 className="font-display text-5xl leading-none text-foreground sm:text-6xl lg:text-7xl">
                  Dresses with quiet drama and modern restraint.
                </h1>
                <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Explore an editorial wardrobe of minimalist silhouettes, luminous fabrics, and event-ready pieces crafted for elevated daily dressing and evening entrances.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="hero" size="luxury">
                  <a href="#top-selling">
                    Shop now <ArrowRight />
                  </a>
                </Button>
                <Button asChild variant="outlineLuxury" size="luxury">
                  <a href="#categories">Explore categories</a>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="stat-panel">
                  <p className="font-display text-3xl text-foreground">{stat.value}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual panel-elevated">
            <div className="promo-banner">
              <span>Spring atelier event</span>
              <span>Complimentary styling on orders above $300</span>
            </div>
            <img
              src={categories[3].heroImage}
              alt="Editorial model in ivory silk gown for Atelier Élise"
              className="hero-image"
              width={1080}
              height={1920}
            />
            <div className="hero-spotlight" />
            <div className="hero-floating-note">
              <p className="eyebrow">New signature</p>
              <p className="font-display text-2xl text-foreground">Aurelia Silk Gown</p>
              <p className="text-sm leading-6 text-muted-foreground">Fluid silk drape with sculpted wrap waist.</p>
              <Button asChild variant="ghostLuxury" size="luxurySm">
                <Link to="/products/$productId" params={{ productId: "aurelia-silk-gown" }}>
                  View piece <MoveRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="top-selling" className="section-shell">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Top selling"
              title="The bestselling edit for refined evenings"
              description="A distilled selection of silhouettes favored for their fluid drape, elevated tailoring, and modern occasionwear presence."
            />
            <Button asChild variant="ghostLuxury" size="luxury">
              <Link to="/categories/$slug" params={{ slug: "evening-dresses" }}>
                Shop evening dresses <ArrowRight />
              </Link>
            </Button>
          </div>
          <ProductGrid products={featuredProducts.slice(0, 6)} />
        </div>
      </section>

      <section id="trending" className="section-shell section-soft">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Trending now"
            title="Famous silhouettes with editorial appeal"
            description="From sculpted black gowns to modern bridal ivory, these pieces shape the season's most shared wardrobe moments."
          />
          <ProductGrid products={trendingProducts.slice(0, 3)} />
        </div>
      </section>

      <section id="categories" className="section-shell">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Categories"
            title="Collections arranged by mood, moment, and silhouette"
            description="Browse category edits designed for daytime refinement, evening events, ceremonies, and signature minimalist dressing."
          />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
