import { db } from "@/server/db";
import { cars, brands } from "@/server/db/schema";
import { count, eq } from "drizzle-orm";
import { 
  Car, 
  Tag, 
  CheckCircle2, 
  TrendingUp, 
  History,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getStats() {
  const [totalCars] = await db.select({ value: count() }).from(cars);
  const [availableCars] = await db.select({ value: count() }).from(cars).where(eq(cars.status, "Available"));
  const [soldCars] = await db.select({ value: count() }).from(cars).where(eq(cars.status, "Sold"));
  const [totalBrands] = await db.select({ value: count() }).from(brands);

  return {
    total: totalCars.value,
    available: availableCars.value,
    sold: soldCars.value,
    brands: totalBrands.value,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Total Mobil", value: stats.total, icon: Car, color: "bg-blue-500", text: "text-blue-500" },
    { label: "Tersedia", value: stats.available, icon: TrendingUp, color: "bg-green-500", text: "text-green-500" },
    { label: "Terjual", value: stats.sold, icon: CheckCircle2, color: "bg-orange-500", text: "text-orange-500" },
    { label: "Total Merk", value: stats.brands, icon: Tag, color: "bg-purple-500", text: "text-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Ringkasan Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang kembali, berikut adalah performa showroom Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card key={card.label} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{card.label}</p>
                  <p className="text-4xl font-black tracking-tight">{card.value}</p>
                </div>
                <div className={`p-3 rounded-2xl ${card.color} bg-opacity-10 ${card.text}`}>
                  <card.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold uppercase tracking-tight">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/admin/mobil/tambah">
              <Button className="w-full h-24 flex flex-col gap-2 rounded-2xl bg-slate-950 hover:bg-red-600 transition-all">
                <Car className="h-6 w-6" />
                <span>Tambah Mobil</span>
              </Button>
            </Link>
            <Link href="/admin/merk">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 rounded-2xl border-2 hover:bg-slate-50 transition-all">
                <Tag className="h-6 w-6" />
                <span>Kelola Merk</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold uppercase tracking-tight">Aktivitas Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <History className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sistem diperbarui ke versi terbaru</p>
                    <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
