import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { toast } from "@/hooks/use-toast";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = { items: CartItem[] };

type Action =
  | { type: "ADD"; item: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "CLEAR" };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { ...action.item, quantity: action.quantity ?? 1 },
        ],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
  }
}

const CartContext = createContext<{
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
} | null>(null);

const STORAGE_KEY = "zw_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed: CartState = JSON.parse(raw);
        if (parsed?.items) {
          parsed.items.forEach((it) =>
            dispatch({ type: "ADD", item: { id: it.id, name: it.name, price: it.price, image: it.image }, quantity: it.quantity })
          );
        }
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const api = useMemo(() => ({
    items: state.items,
    add: (item: Omit<CartItem, "quantity">, quantity?: number) => {
      dispatch({ type: "ADD", item, quantity });
      toast({ title: "Added to cart", description: item.name });
    },
    remove: (id: string) => dispatch({ type: "REMOVE", id }),
    setQty: (id: string, qty: number) => dispatch({ type: "SET_QTY", id, quantity: qty }),
    clear: () => dispatch({ type: "CLEAR" }),
    total: state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  }), [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
