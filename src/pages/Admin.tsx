import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { products as baseProducts, Product } from "@/data/products";
import { Button } from "@/components/ui/button";

const LS_KEY = "zw_admin_products_v1";

const Admin = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [items, setItems] = useState<Product[]>(baseProducts);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Product["category"]>("Electronics");
  const [price, setPrice] = useState(1999);


  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try { setItems(JSON.parse(raw)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const canManage = useMemo(() => false, []);

  if (!canManage) {
    return (
      <main className="container py-16">
        <Helmet>
          <title>Admin | Zestful Wares</title>
          <meta name="description" content="Admin panel for Zestful Wares." />
          <link rel="canonical" href="/admin" />
        </Helmet>
        <div className="rounded-xl border p-6">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="mt-2 text-muted-foreground">Access denied. Please login with an admin account.</p>
        </div>
      </main>
    );
  }

  const add = () => {
    const id = `${category}-${Date.now()}`;
    const newItem: Product = { id, name, category, price, image: baseProducts.find(p => p.category === category)?.image || "" };
    setItems([newItem, ...items]);
    setName("");
  };

  const remove = (id: string) => setItems(items.filter(i => i.id !== id));

  return (
    <main className="container py-16">
      <Helmet>
        <title>Admin | Zestful Wares</title>
        <meta name="description" content="Manage products on Zestful Wares." />
        <link rel="canonical" href="/admin" />
      </Helmet>

      <section className="rounded-xl border p-6">
        <h1 className="text-2xl font-semibold">Manage Products</h1>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-md border bg-background px-3" />
          <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="h-11 rounded-md border bg-background px-3">
            <option>Electronics</option>
            <option>Spices</option>
          </select>
          <input type="number" placeholder="Price (cents)" value={price} onChange={(e) => setPrice(parseInt(e.target.value || "0", 10))} className="h-11 rounded-md border bg-background px-3" />
          <Button variant="hero" onClick={add}>Add Product</Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <div key={p.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.category} • ${(p.price/100).toFixed(2)}</div>
                </div>
                <Button variant="destructive" onClick={() => remove(p.id)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Admin;
