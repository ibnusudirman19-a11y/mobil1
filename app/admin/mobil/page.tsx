import { db } from "@/server/db";
import { cars, brands } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default async function AdminMobilPage() {
  const allCars = await db.query.cars.findMany({
    with: {
      brand: true,
      images: true,
    },
    orderBy: [desc(cars.createdAt)],
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Kelola Koleksi Mobil</h1>
          <p className="text-muted-foreground">Tambah, edit, atau hapus data mobil dari katalog Anda.</p>
        </div>
        <Link href="/admin/mobil/tambah">
          <Button className="rounded-xl h-12 px-6 font-bold uppercase tracking-wide bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-5 w-5" />
            Tambah Mobil
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Cari mobil..." className="pl-10 rounded-xl" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">Filter</Button>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[80px] font-bold text-xs uppercase tracking-wider">Foto</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Mobil</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Tahun</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Harga</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allCars.map((car) => {
              const mainImage = car.images.find(img => img.isMain) || car.images[0];
              return (
                <TableRow key={car.id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-slate-100 border">
                      {mainImage ? (
                        <Image src={mainImage.url} alt={car.model} fill className="object-cover" />
                      ) : (
                        <Car className="h-4 w-4 m-auto" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-tight">{car.brand.name}</p>
                    <p className="font-bold text-slate-900">{car.model}</p>
                  </TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell className="font-bold text-red-600">
                    IDR {(car.price / 1000000).toFixed(1)} JT
                  </TableCell>
                  <TableCell>
                    <Badge variant={car.status === "Available" ? "success" : "secondary"} className="rounded-lg px-3">
                      {car.status === "Available" ? "Tersedia" : "Terjual"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/mobil/${car.id}`}>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/mobil/${car.id}`}>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {allCars.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  Belum ada data mobil.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import { Car } from "lucide-react";
