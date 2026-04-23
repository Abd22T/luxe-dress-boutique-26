import { Link } from "@tanstack/react-router";

const footerGroups = [
  {
    title: "Collections",
    links: [
      { label: "Evening Dresses", to: "/categories/$slug", params: { slug: "evening-dresses" as const } },
      { label: "Day Dresses", to: "/categories/$slug", params: { slug: "day-dresses" as const } },
      { label: "Bridal White", to: "/categories/$slug", params: { slug: "bridal-white" as const } },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Top Selling", href: "/#top-selling" },
      { label: "Trending", href: "/#trending" },
      { label: "Categories", href: "/#categories" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-5">
          <p className="eyebrow">Maison essentials</p>
          <h2 className="font-display text-4xl text-foreground">Quiet luxury for every entrance.</h2>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            Curated dresses designed to move between daylight refinement and evening ceremony.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.24em] text-foreground">{group.title}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {group.links.map((link) => (
                <li key={link.label}>
                  {"href" in link ? (
                    <a href={link.href} className="story-link">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.to} params={link.params} className="story-link">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
