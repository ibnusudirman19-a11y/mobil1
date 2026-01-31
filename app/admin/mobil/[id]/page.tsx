import { db } from "@/server/db";
import { cars, brands } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { CarForm } from "@/components/CarForm";

export default async function EditMobilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await db.query.cars.findFirst({
    where: eq(cars.id, id),
    with: {
      images: true,
    },
  });

  if (!car) notFound();

  const allBrands = await db.select().from(brands).orderBy(brands.name);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Edit Data Mobil</h1>
        <p className="text-muted-foreground">Perbarui informasi unit {car.model}.</p>
      </div>

      <CarForm car={car} brands={allBrands} />
    </div>
  );
}
