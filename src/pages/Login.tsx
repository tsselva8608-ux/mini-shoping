import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Authentication requires Supabase connection. Please connect Supabase to enable login.");
    }, 600);
  };

  const signUp = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Sign up requires Supabase connection. Please connect Supabase to enable signup.");
    }, 600);
  };

  return (
    <main className="container py-16">
      <Helmet>
        <title>Login | Zestful Wares</title>
        <meta name="description" content="Login to Zestful Wares to manage your cart and orders." />
        <link rel="canonical" href="/login" />
      </Helmet>

      <section className="mx-auto max-w-md rounded-xl border p-6">
        <h1 className="mb-4 text-2xl font-semibold">Login</h1>
        <div className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-sm">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full rounded-md border bg-background px-3" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 w-full rounded-md border bg-background px-3" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={signIn} disabled={loading} className="flex-1">Sign in</Button>
            <Button variant="secondary" onClick={signUp} disabled={loading} className="flex-1">Sign up</Button>
          </div>
          <p className="text-sm text-muted-foreground">For admin access, set your user metadata role to "admin" in Supabase.</p>
        </div>
      </section>
    </main>
  );
};

export default Login;
