import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/button";

const ProductDetails = () => {
  const { id } = useParams();
  const product = useMemo(() => products.find(p => p.id === id), [id]);
  const { add } = useCart();

  if (!product) return (
    <main className="container py-16">
      <h1 className="text-2xl font-semibold">Product not found</h1>
    </main>
  );

  return (
    <main className="container py-16">
      <Helmet>
        <title>{product.name} | Zestful Wares</title>
        <meta name="description" content={`Buy ${product.name} at Zestful Wares.`} />
        <link rel="canonical" href={`/product/${product.id}`} />
      </Helmet>

      <div className="grid gap-8 md:grid-cols-2">
        <img src={product.image} alt={`${product.name} product image`} className="w-full rounded-xl border object-cover" />
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-muted-foreground">Category: {product.category}</p>
          <p className="mt-3 text-2xl font-semibold">${(product.price/100).toFixed(2)}</p>
          <div className="mt-6 flex gap-3">
            <Button variant="hero" onClick={() => add({ id: product.id, name: product.name, price: product.price, image: product.image })}>Add to cart</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
