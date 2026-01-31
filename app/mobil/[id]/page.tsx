import { db } from "@/server/db";
import { cars, settings } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { CarGallery } from "@/components/CarGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings2, 
  Palette, 
  Map as MapIcon,
  CheckCircle2,
  Share2
} from "lucide-react";
import Link from "next/link";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await db.query.cars.findFirst({
    where: eq(cars.id, id),
    with: {
      brand: true,
      images: true,
    },
  });

  if (!car) notFound();

  const [showroom] = await db.select().from(settings).limit(1);

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(car.price);

  const specs = [
    { label: "Merk", value: car.brand.name, icon: MapPin },
    { label: "Tahun", value: car.year, icon: Calendar },
    { label: "Kilometer", value: `${car.mileage.toLocaleString()} KM`, icon: Gauge },
    { label: "Transmisi", value: car.transmission, icon: Settings2 },
    { label: "Bahan Bakar", value: car.fuel, icon: Fuel },
    { label: "Warna", value: car.color, icon: Palette },
    { label: "Plat", value: car.region, icon: MapIcon },
  ];

  const waMessage = `Halo Showroom Mobil, saya tertarik dengan unit ${car.brand.name} ${car.model} (${car.year}) seharga ${formattedPrice}. Apakah masih tersedia?`;
  const waUrl = `https://wa.me/${showroom?.phone || "6281234567890"}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb / Back */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/mobil" className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-red-600 flex items-center gap-2">
            <span className="text-xl">←</span> Kembali ke Katalog
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Gallery & Description */}
          <div className="lg:col-span-2 space-y-8">
            <CarGallery images={car.images} />
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">Deskripsi Mobil</h2>
              <div className="prose prose-slate max-w-none">
                <p className="whitespace-pre-line text-slate-600 leading-relaxed">
                  {car.description || "Tidak ada deskripsi tambahan untuk unit ini."}
                </p>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="font-bold mb-4 uppercase text-sm tracking-widest text-muted-foreground">Keunggulan Unit Ini</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Lulus inspeksi 150+ titik",
                    "Jaminan Bebas Banjir & Tabrak",
                    "Dokumen Asli & Lengkap",
                    "Kondisi Mesin Prima",
                    "Interior Bersih & Wangi",
                    "Kaki-kaki Senyap"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Info & Action */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border space-y-6 sticky top-24">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={car.status === "Available" ? "success" : "destructive"} className="uppercase font-bold tracking-wider">
                    {car.status === "Available" ? "Tersedia" : "Terjual"}
                  </Badge>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{car.brand.name}</span>
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tighter leading-tight">{car.model}</h1>
                <div className="text-3xl font-black text-red-600 pt-2">{formattedPrice}</div>
              </div>

              <div className="grid grid-cols-1 gap-4 py-6 border-y">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground font-medium">
                      <spec.icon className="h-4 w-4" />
                      <span>{spec.label}</span>
                    </div>
                    <span className="font-bold uppercase tracking-tight">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4">
                <Link href={waUrl} target="_blank" className="block">
                  <Button className="w-full h-16 rounded-2xl text-lg font-bold uppercase tracking-widest bg-green-600 hover:bg-green-700 shadow-xl shadow-green-100">
                    <Phone className="mr-3 h-6 w-6" />
                    Hubungi Penjual
                  </Button>
                </Link>
                <Link href="/kontak" className="block">
                  <Button variant="outline" className="w-full h-14 rounded-2xl font-bold uppercase tracking-tight">
                    Lihat Lokasi Showroom
                  </Button>
                </Link>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Alamat Showroom</h4>
                <div className="flex gap-3 text-sm text-slate-600">
                  <MapPin className="h-5 w-5 text-red-500 shrink-0" />
                  <p className="font-medium">{showroom?.address || "Jl. Raya Otomotif No. 123, Jakarta Selatan"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
