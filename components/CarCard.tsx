import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Fuel, Gauge, History, Settings2 } from "lucide-react";

interface CarCardProps {
  car: {
    id: string;
    brand: { name: string };
    model: string;
    year: number;
    price: number;
    mileage: number;
    transmission: string;
    fuel: string;
    status: string;
    images: { url: string; isMain: boolean | null }[];
  };
}

export function CarCard({ car }: CarCardProps) {
  const mainImage = car.images.find((img) => img.isMain) || car.images[0];
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(car.price);

  return (
    <Link href={`/mobil/${car.id}`}>
      <Card className="group overflow-hidden border-none shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-[16/10] overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={`${car.brand.name} ${car.model}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <History className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          {car.status === "Sold" && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
              <Badge variant="destructive" className="px-4 py-1 text-lg uppercase font-bold">Terjual</Badge>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-black font-semibold">
              {car.year}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{car.brand.name}</h3>
            <p className="line-clamp-1 text-xl font-bold text-foreground">{car.model}</p>
          </div>
          
          <div className="mb-4 text-2xl font-black text-red-600">
            {formattedPrice}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <Gauge className="h-3.5 w-3.5" />
              <span>{car.mileage.toLocaleString()} KM</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings2 className="h-3.5 w-3.5" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="h-3.5 w-3.5" />
              <span>{car.fuel}</span>
            </div>
            <div className="flex items-center gap-2">
              <History className="h-3.5 w-3.5" />
              <span>Tahun {car.year}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-slate-50 p-4 dark:bg-slate-900 border-t">
          <span className="text-xs font-bold uppercase text-primary group-hover:underline">Lihat Detail Mobil</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
