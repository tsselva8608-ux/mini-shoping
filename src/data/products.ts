export type Product = {
  id: string;
  name: string;
  category: "Electronics" | "Spices";
  price: number; // in cents
  image: string;
};

import electronicsHero from "@/assets/electronics-hero.jpg";
import spicesHero from "@/assets/spices-hero.jpg";

function gen(items: number, category: Product["category"], baseNames: string[], image: string) {
  const products: Product[] = [];
  for (let i = 0; i < items; i++) {
    const name = `${baseNames[i % baseNames.length]} ${Math.floor(i / baseNames.length) + 1}`;
    const price = category === "Electronics" ? 2999 + (i % 20) * 500 : 399 + (i % 20) * 100; // cents
    products.push({ id: `${category}-${i}`, name, category, price, image });
  }
  return products;
}

const electronicsNames = [
  "Aurora Wireless Earbuds",
  "Pulse Smartwatch",
  "Volt Power Bank",
  "Nimbus Laptop Sleeve",
  "Echo Bluetooth Speaker",
  "Orbit USB-C Hub",
  "Spectra Gaming Mouse",
  "Lumen LED Desk Lamp",
  "Zen Noise-Canceling Headphones",
  "Nova 4K Action Camera",
  "Aero Mini Projector",
  "Flux Mechanical Keyboard",
];

const spiceNames = [
  "Golden Turmeric",
  "Fiery Chili Powder",
  "Smoked Paprika",
  "Cumin Seeds",
  "Coriander Powder",
  "Garam Masala",
  "Black Peppercorns",
  "Cinnamon Sticks",
  "Star Anise",
  "Cardamom Pods",
  "Clove Buds",
  "Fenugreek Seeds",
];

export const products: Product[] = [
  ...gen(60, "Electronics", electronicsNames, electronicsHero),
  ...gen(60, "Spices", spiceNames, spicesHero),
];
