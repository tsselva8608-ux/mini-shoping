import { Helmet } from "react-helmet-async";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { useMemo, useState } from "react";
import electronicsHero from "@/assets/electronics-hero.jpg";
import spicesHero from "@/assets/spices-hero.jpg";

const Index = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
  }, [q]);

  return (
    <main>
      <Helmet>
        <title>Shop Electronics & Spices | Zestful Wares</title>
        <meta name="description" content="Discover 100+ curated electronics and spices. Fast cart, easy checkout, and great deals at Zestful Wares." />
        <link rel="canonical" href="/" />
      </Helmet>

      <section className="relative">
        <div className="container grid gap-6 py-10 md:grid-cols-2 md:py-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-balance bg-clip-text text-4xl font-bold tracking-tight md:text-5xl">
              Elevate Your Everyday
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Premium electronics and authentic spices in one place.
            </p>
            <div className="mt-6 max-w-xl">
              <SearchBar value={q} onChange={setQ} />
            </div>
          </div>
          <div className="grid gap-4">
            <img src={electronicsHero} alt="Premium electronics assortment" className="w-full rounded-xl border object-cover shadow-[var(--shadow-elegant)]" loading="lazy" />
            <img src={spicesHero} alt="Assorted colorful spices" className="w-full rounded-xl border object-cover shadow-[var(--shadow-elegant)]" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="container py-10 md:py-16">
        <h2 className="mb-6 text-2xl font-semibold">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
