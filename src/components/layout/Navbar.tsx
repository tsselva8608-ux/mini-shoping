import { Link } from "react-router-dom";
import { ShoppingCart, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CartSheet from "@/components/cart/CartSheet";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-semibold text-lg">
          Zestful Wares
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setOpen(true)} aria-label="Open Cart">
            <ShoppingCart />
          </Button>
          <Link to="/login">
            <Button variant="secondary">
              <LogIn /> Login
            </Button>
          </Link>
        </div>
      </nav>
      <CartSheet open={open} onOpenChange={setOpen} />
    </header>
  );
};

export default Navbar;
