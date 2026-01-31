import { db } from "@/server/db";
import { brands } from "@/server/db/schema";
import { CarList } from "@/components/CarList";

export default async function MobilPage() {
  const allBrands = await db.select().from(brands).orderBy(brands.name);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-slate-950 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Katalog Mobil Bekas</h1>
          <p className="text-slate-400 mt-4 text-lg max-w-2xl">
            Jelajahi berbagai pilihan mobil bekas berkualitas tinggi. Gunakan filter untuk menemukan unit yang sesuai dengan preferensi Anda.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-8">
        <CarList brands={allBrands} />
      </div>
    </div>
  );
}
