import blackCocktailImage from "@/assets/product-black-cocktail.jpg";
import heroImage from "@/assets/fashion-hero.jpg";
import linenMidiImage from "@/assets/product-linen-midi.jpg";
import satinEveningImage from "@/assets/product-satin-evening.jpg";

export type Category = {
  slug: string;
  name: string;
  description: string;
  eyebrow: string;
  heroImage: string;
};

export type Product = {
  id: string;
  slug: string;
  category: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  description: string;
  subtitle: string;
  tags: string[];
  sizes: string[];
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
};

export const categories: Category[] = [
  {
    slug: "evening-dresses",
    name: "Evening Dresses",
    eyebrow: "After Dark",
    description: "Fluid silhouettes cut for galas, dinners, and candlelit events.",
    heroImage: satinEveningImage,
  },
  {
    slug: "day-dresses",
    name: "Day Dresses",
    eyebrow: "Everyday Poise",
    description: "Minimal shapes with refined structure for effortless city dressing.",
    heroImage: linenMidiImage,
  },
  {
    slug: "occasionwear",
    name: "Occasionwear",
    eyebrow: "Celebration Edit",
    description: "Statement-ready dresses with sculpted fits and elevated detailing.",
    heroImage: blackCocktailImage,
  },
  {
    slug: "bridal-white",
    name: "Bridal White",
    eyebrow: "Ivory Studio",
    description: "Soft ivory tones and modern romance for ceremonies and civil vows.",
    heroImage: heroImage,
  },
];

export const products: Product[] = [
  {
    id: "aurelia-silk-gown",
    slug: "aurelia-silk-gown",
    category: "evening-dresses",
    name: "Aurelia Silk Gown",
    price: 420,
    image: heroImage,
    alt: "Ivory silk wrap gown with gold jewelry styling",
    subtitle: "Liquid silk drape with sculpted waist",
    description:
      "An elegant floor-length gown cut in luminous silk with a softly wrapped bodice and fluid sweep. Designed for black-tie evenings and quiet luxury wardrobes.",
    tags: ["Silk", "Floor Length", "Limited"],
    sizes: ["XS", "S", "M", "L"],
    featured: true,
    trending: true,
  },
  {
    id: "celeste-satin-column",
    slug: "celeste-satin-column",
    category: "evening-dresses",
    name: "Celeste Satin Column",
    price: 390,
    image: satinEveningImage,
    alt: "Champagne satin evening dress with full-length column silhouette",
    subtitle: "Champagne sheen with clean column line",
    description:
      "A sleek satin evening dress with a soft champagne glow, refined straps, and a long uninterrupted line that elongates the silhouette.",
    tags: ["Satin", "Evening", "Best Seller"],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "noir-sculpt-maxi",
    slug: "noir-sculpt-maxi",
    category: "occasionwear",
    name: "Noir Sculpt Maxi",
    price: 460,
    image: blackCocktailImage,
    alt: "Black sculpted evening gown on neutral studio background",
    subtitle: "Structured drape with dramatic minimalism",
    description:
      "Precision draping through the waist and bodice gives this black maxi dress its sculptural character. A timeless option for cocktail evenings and gallery openings.",
    tags: ["Black", "Sculpted", "Editor Pick"],
    sizes: ["XS", "S", "M", "L"],
    trending: true,
  },
  {
    id: "sera-linen-midi",
    slug: "sera-linen-midi",
    category: "day-dresses",
    name: "Sera Linen Midi",
    price: 240,
    image: linenMidiImage,
    alt: "Ivory linen midi dress for daytime elegance",
    subtitle: "Soft structure in airy linen blend",
    description:
      "A minimalist midi dress with subtle volume and an easy tailored fit. Crafted for warm afternoons, city lunches, and polished daily wear.",
    tags: ["Linen Blend", "Midi", "Daywear"],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "mirelle-wrap-midi",
    slug: "mirelle-wrap-midi",
    category: "day-dresses",
    name: "Mirelle Wrap Midi",
    price: 275,
    image: heroImage,
    alt: "Ivory wrap midi dress with gathered waist detail",
    subtitle: "Wrapped lines for understated polish",
    description:
      "A softly wrapped midi silhouette with gentle movement and a waist-defining line. Effortless enough for daytime, elevated enough for late dinners.",
    tags: ["Wrap", "Minimal", "New"],
    sizes: ["S", "M", "L"],
    newArrival: true,
  },
  {
    id: "valen-atelier-dress",
    slug: "valen-atelier-dress",
    category: "occasionwear",
    name: "Valen Atelier Dress",
    price: 355,
    image: satinEveningImage,
    alt: "Champagne fitted dress styled for special events",
    subtitle: "Polished eventwear with luminous finish",
    description:
      "A refined dress designed for modern celebrations, balancing sleek tailoring with a subtle satin finish and feminine neckline.",
    tags: ["Occasion", "Satin", "Celebration"],
    sizes: ["XS", "S", "M", "L"],
    trending: true,
  },
  {
    id: "elysian-ivory-gown",
    slug: "elysian-ivory-gown",
    category: "bridal-white",
    name: "Elysian Ivory Gown",
    price: 510,
    image: heroImage,
    alt: "Ivory luxury gown suitable for bridal or civil ceremony styling",
    subtitle: "Modern bridal minimalism with silk movement",
    description:
      "A serene ivory gown with a graceful drape and clean neckline, designed for intimate ceremonies, receptions, and heirloom dressing.",
    tags: ["Ivory", "Ceremony", "Exclusive"],
    sizes: ["XS", "S", "M", "L"],
    featured: true,
    trending: true,
  },
  {
    id: "solenne-ceremony-midi",
    slug: "solenne-ceremony-midi",
    category: "bridal-white",
    name: "Solenne Ceremony Midi",
    price: 320,
    image: linenMidiImage,
    alt: "Clean ivory midi dress for bridal civil ceremony",
    subtitle: "Quiet luxury for intimate vows",
    description:
      "A minimalist midi style defined by calm lines and delicate volume. Ideal for civil ceremonies, rehearsal dinners, or modern bridal wardrobes.",
    tags: ["Bridal", "Midi", "Minimal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    newArrival: true,
  },
  {
    id: "monroe-noir-gown",
    slug: "monroe-noir-gown",
    category: "occasionwear",
    name: "Monroe Noir Gown",
    price: 480,
    image: blackCocktailImage,
    alt: "Black gown with elegant draped bodice for evening occasions",
    subtitle: "A precise black statement with timeless restraint",
    description:
      "A bold yet restrained black gown with carefully placed draping and a refined line through the hem. The ultimate evening wardrobe anchor.",
    tags: ["Noir", "Evening", "Signature"],
    sizes: ["XS", "S", "M", "L"],
    featured: true,
  },
];

export const heroStats = [
  { value: "48h", label: "New capsule drops" },
  { value: "Italian", label: "Fabric-led sourcing" },
  { value: "4.9/5", label: "Client satisfaction" },
];

export const getCategoryBySlug = (slug: string) => categories.find((category) => category.slug === slug);

export const getProductById = (productId: string) =>
  products.find((product) => product.id === productId || product.slug === productId);

export const getProductsByCategory = (slug: string) =>
  products.filter((product) => product.category === slug);

export const featuredProducts = products.filter((product) => product.featured);
export const trendingProducts = products.filter((product) => product.trending);
