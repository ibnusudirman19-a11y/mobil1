"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2, Save, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function CarForm({ car, brands }: { car?: any; brands: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brandId: car?.brandId || "",
    model: car?.model || "",
    year: car?.year?.toString() || new Date().getFullYear().toString(),
    price: car?.price?.toString() || "",
    mileage: car?.mileage?.toString() || "",
    transmission: car?.transmission || "Manual",
    fuel: car?.fuel || "Bensin",
    color: car?.color || "",
    region: car?.region || "",
    description: car?.description || "",
    status: car?.status || "Available",
    isFeatured: car?.isFeatured || false,
    images: car?.images?.map((img: any) => img.url) || [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brandId || !formData.model || !formData.price) {
      toast.error("Mohon lengkapi data wajib");
      return;
    }

    setLoading(true);
    try {
      if (car) {
        await api.put(`/api/cars/${car.id}`, formData);
        toast.success("Data mobil berhasil diperbarui");
      } else {
        await api.post("/api/cars", formData);
        toast.success("Mobil baru berhasil ditambahkan");
      }
      router.push("/admin/mobil");
      router.refresh();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
            <h3 className="font-bold uppercase tracking-tight text-lg border-b pb-4">Informasi Utama</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Merk Mobil *</Label>
                <Select 
                  value={formData.brandId} 
                  onValueChange={(v) => setFormData({ ...formData, brandId: v })}
                >
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="Pilih Merk" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Model Mobil *</Label>
                <Input
                  placeholder="Contoh: Avanza G"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Tahun *</Label>
                <Input
                  type="number"
                  placeholder="2020"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Harga (IDR) *</Label>
                <Input
                  type="number"
                  placeholder="150000000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Kilometer *</Label>
                <Input
                  type="number"
                  placeholder="45000"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  className="rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Warna</Label>
                <Input
                  placeholder="Hitam Metalik"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Transmisi</Label>
                <Select 
                  value={formData.transmission} 
                  onValueChange={(v) => setFormData({ ...formData, transmission: v })}
                >
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Bahan Bakar</Label>
                <Select 
                  value={formData.fuel} 
                  onValueChange={(v) => setFormData({ ...formData, fuel: v })}
                >
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bensin">Bensin</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Plat Wilayah / Lokasi Unit</Label>
              <Input
                placeholder="Plat B / Jakarta Selatan"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label>Deskripsi Kondisi</Label>
              <Textarea
                placeholder="Jelaskan kondisi mobil secara detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="rounded-xl min-h-[150px]"
              />
            </div>
          </div>
        </div>

        {/* Media & Status */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
            <h3 className="font-bold uppercase tracking-tight text-lg border-b pb-4">Foto & Status</h3>
            
            <div className="space-y-4">
              <Label>Foto Mobil (Maks 10)</Label>
              <ImageUpload
                route="images"
                value={formData.images}
                onChange={(urls) => setFormData({ ...formData, images: urls })}
                multiple
                maxFiles={10}
              />
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tampilkan di Beranda</Label>
                  <p className="text-xs text-muted-foreground">Unit akan muncul di section Unggulan.</p>
                </div>
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={(v) => setFormData({ ...formData, isFeatured: v })}
                />
              </div>

              <div className="space-y-2">
                <Label>Status Unit</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(v) => setFormData({ ...formData, status: v })}
                >
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Tersedia</SelectItem>
                    <SelectItem value="Sold">Terjual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 h-14 rounded-2xl font-bold uppercase"
            >
              Batal
            </Button>
            <Button
              disabled={loading}
              className="flex-[2] h-14 rounded-2xl font-bold uppercase tracking-wide bg-red-600 hover:bg-red-700 shadow-xl shadow-red-100"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
              Simpan Data
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
