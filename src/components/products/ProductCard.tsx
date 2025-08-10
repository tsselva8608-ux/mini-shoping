import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="group relative overflow-hidden rounded-lg border bg-card p-3 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
      <div className="aspect-[4/3] overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={`${product.name} product image`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 font-medium">{product.name}</h3>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">${(product.price / 100).toFixed(2)}</p>
      </div>
      <div className="mt-3">
        <Button variant="default" className="w-full" onClick={() => add({ id: product.id, name: product.name, price: product.price, image: product.image })}>
          Add to cart
        </Button>
      </div>
    </article>
  );
}
