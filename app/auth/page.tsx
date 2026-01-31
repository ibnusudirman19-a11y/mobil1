"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Akun berhasil dibuat!");
        router.push("/admin");
      }
    } catch (err) {
      toast.error("Gagal membuat akun");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Email atau password salah");
      } else {
        toast.success("Login berhasil!");
        router.push("/admin");
      }
    } catch (err) {
      toast.error("Gagal login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-200">
            <Car className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Admin Panel</h1>
          <p className="text-muted-foreground">Kelola showroom Anda dengan mudah.</p>
        </div>

        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-slate-950 text-white text-center pb-8">
            <CardTitle className="text-xl font-bold uppercase tracking-tight">Selamat Datang</CardTitle>
            <CardDescription className="text-slate-400">Masuk untuk mengelola katalog mobil</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 rounded-xl p-1">
                <TabsTrigger value="signin" className="rounded-lg font-bold uppercase text-xs tracking-widest">Login</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-lg font-bold uppercase text-xs tracking-widest">Daftar</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email Admin</Label>
                    <Input id="signin-email" name="email" type="email" placeholder="admin@showroom.com" required className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input id="signin-password" name="password" type="password" placeholder="••••••••" required className="h-12 rounded-xl" />
                  </div>
                  <Button type="submit" className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest bg-red-600 hover:bg-red-700 shadow-xl shadow-red-100" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : "Masuk Sekarang"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nama Lengkap</Label>
                    <Input id="signup-name" name="name" type="text" placeholder="John Doe" required className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" name="email" type="email" placeholder="admin@showroom.com" required className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password Baru</Label>
                    <Input id="signup-password" name="password" type="password" placeholder="Min. 8 karakter" required minLength={8} className="h-12 rounded-xl" />
                  </div>
                  <Button type="submit" className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest bg-slate-950 hover:bg-red-600 shadow-xl" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : "Buat Akun Admin"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
