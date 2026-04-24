import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import type { Category } from "@/data/products";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="group category-tile">
      <div className="relative overflow-hidden rounded-md">
        <img
          src={category.heroImage}
          alt={category.name}
          className="h-[440px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
          width={960}
          height={1280}
        />
        <div className="image-sheen" />
      </div>
      <div className="space-y-4 px-1 pt-5">
        <div className="space-y-2">
          <p className="eyebrow">{category.eyebrow}</p>
          <h3 className="font-display text-2xl text-foreground">{category.name}</h3>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">{category.description}</p>
        </div>
        <Button asChild variant="ghostLuxury" size="luxury">
          <Link to="/categories/$slug" params={{ slug: category.slug }}>
            Explore the edit <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </article>
  );
}
