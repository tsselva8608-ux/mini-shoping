import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartContext";
import { X } from "lucide-react";

export default function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { items, total, remove, setQty, clear } = useCart();

  const checkout = async () => {
    alert("Checkout is not yet configured. Connect Stripe via Supabase Edge Functions to enable payments.");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Your Cart</SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} aria-label="Close cart">
            <X />
          </Button>
        </SheetHeader>
        <div className="mt-4 flex-1 space-y-4 overflow-auto">
          {items.length === 0 && (
            <p className="text-muted-foreground">Your cart is empty.</p>
          )}
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-md border p-3">
              <img src={item.image} alt={item.name} className="size-16 rounded-md object-cover" loading="lazy" />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">${(item.price / 100).toFixed(2)}</div>
                <div className="mt-2 flex items-center gap-2">
                  <label htmlFor={`qty-${item.id}`} className="text-sm">Qty</label>
                  <input id={`qty-${item.id}`} type="number" min={1} value={item.quantity} onChange={(e) => setQty(item.id, parseInt(e.target.value || "1", 10))} className="h-9 w-20 rounded-md border bg-background px-2" />
                </div>
              </div>
              <Button variant="ghost" onClick={() => remove(item.id)}>Remove</Button>
            </div>
          ))}
        </div>
        <SheetFooter className="mt-4">
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${(total / 100).toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={clear}>Clear</Button>
              <Button variant="hero" className="flex-1" onClick={checkout}>Checkout</Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
