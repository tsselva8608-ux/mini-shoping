import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search products..."}
        className="h-11 w-full rounded-md border bg-background pl-10 pr-3 outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Search products"
      />
    </div>
  );
}
