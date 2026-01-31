import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/CarCard";
import { db } from "@/server/db";
import { cars, carImages, brands } from "@/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { CheckCircle2, ShieldCheck, Star, Zap, Phone, ArrowRight } from "lucide-react";

async function getFeaturedCars() {
  return await db.query.cars.findMany({
    where: eq(cars.isFeatured, true),
    with: {
      brand: true,
      images: true,
    },
    limit: 4,
    orderBy: [desc(cars.createdAt)],
  });
}

export default async function HomePage() {
  const featuredCars = await getFeaturedCars();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury car showroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="container relative mx-auto px-4 z-10">
          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-left duration-1000">
            <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] uppercase tracking-tighter">
              Temukan Mobil <span className="text-red-500">Impian</span> Anda Di Sini
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-lg leading-relaxed">
              Katalog mobil bekas eksklusif dengan kualitas yang telah teruji. Transparansi kondisi dan harga terbaik di pasar.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/mobil">
                <Button size="lg" className="h-14 px-8 text-lg font-bold uppercase tracking-wide bg-red-600 hover:bg-red-700">
                  Lihat Katalog
                </Button>
              </Link>
              <Link href="/kontak">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold uppercase tracking-wide text-white border-white hover:bg-white hover:text-black transition-all">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-red-500">Koleksi Pilihan</h2>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Mobil Unggulan</h3>
            </div>
            <Link href="/mobil">
              <Button variant="ghost" className="group font-bold text-lg">
                Lihat Semua Mobil
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCars.length > 0 ? (
              featuredCars.map((car: any) => (
                <CarCard key={car.id} car={car} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl">
                <p className="text-muted-foreground text-lg">Belum ada mobil unggulan saat ini.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-red-500 font-bold uppercase tracking-widest text-sm">Kenapa Kami</h2>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
                  Komitmen Kami Adalah <br /> <span className="text-red-500">Kualitas & Kepercayaan</span>
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Kami tidak hanya menjual mobil, kami memberikan ketenangan pikiran bagi setiap pelanggan kami.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: ShieldCheck, title: "Lulus Inspeksi", desc: "Setiap unit telah melalui pengecekan di 150+ titik." },
                  { icon: Zap, title: "Proses Cepat", desc: "Dokumen lengkap dan proses administrasi yang efisien." },
                  { icon: Star, title: "Unit Berkualitas", desc: "Kami hanya menjual unit dengan riwayat perawatan baik." },
                  { icon: CheckCircle2, title: "Bebas Banjir & Tabrak", desc: "Jaminan unit bukan bekas kecelakaan berat atau banjir." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-red-600/10 flex items-center justify-center shrink-0 border border-red-600/20">
                      <item.icon className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg uppercase tracking-tight">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
               <div className="aspect-square relative rounded-3xl overflow-hidden border-8 border-slate-900 shadow-2xl">
                 <Image 
                   src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop"
                   alt="Car detail"
                   fill
                   className="object-cover"
                 />
               </div>
               <div className="absolute -bottom-8 -left-8 bg-red-600 p-8 rounded-3xl shadow-xl hidden md:block">
                  <p className="text-4xl font-black">10+</p>
                  <p className="text-sm font-bold uppercase tracking-wider text-red-100">Tahun Pengalaman</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-red-600">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Siap Menemukan Mobil Baru Anda?
          </h2>
          <p className="text-red-100 text-xl max-w-2xl mx-auto font-medium">
            Hubungi tim ahli kami sekarang untuk konsultasi atau jadwalkan test drive.
          </p>
          <div className="flex justify-center pt-4">
            <Link href="https://wa.me/6281234567890">
              <Button size="lg" variant="secondary" className="h-16 px-10 text-xl font-bold uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform">
                <Phone className="mr-3 h-6 w-6" />
                Hubungi via WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
