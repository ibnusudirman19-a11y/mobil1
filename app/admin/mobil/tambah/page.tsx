import { db } from "@/server/db";
import { brands } from "@/server/db/schema";
import { CarForm } from "@/components/CarForm";

export default async function TambahMobilPage() {
  const allBrands = await db.select().from(brands).orderBy(brands.name);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Tambah Unit Baru</h1>
        <p className="text-muted-foreground">Isi detail unit mobil untuk ditambahkan ke katalog.</p>
      </div>

      <CarForm brands={allBrands} />
    </div>
  );
}
