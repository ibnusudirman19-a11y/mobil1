"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Tag, Loader2 } from "lucide-react";
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
import { api } from "@/lib/api-client";
import { toast } from "sonner";

export default function AdminMerkPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBrands = async () => {
    try {
      const data = await api.get("/api/brands");
      setBrands(data);
    } catch (error) {
      toast.error("Gagal mengambil data merk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setIsSubmitting(true);
    try {
      await api.post("/api/brands", { name });
      setName("");
      fetchBrands();
      toast.success("Merk berhasil ditambahkan");
    } catch (error) {
      toast.error("Gagal menambahkan merk. Mungkin sudah ada?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus merk ini? Mobil dengan merk ini juga akan terhapus.")) return;

    try {
      await api.delete(`/api/brands/${id}`);
      fetchBrands();
      toast.success("Merk berhasil dihapus");
    } catch (error) {
      toast.error("Gagal menghapus merk");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Kelola Merk Mobil</h1>
        <p className="text-muted-foreground">Master data merk untuk klasifikasi katalog mobil.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
            <h3 className="font-bold uppercase tracking-tight text-lg">Tambah Merk Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Nama Merk (contoh: Toyota)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl h-12"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl font-bold uppercase tracking-wide bg-red-600 hover:bg-red-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Plus className="mr-2" />}
                Tambah Merk
              </Button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-xs uppercase tracking-wider">Nama Merk</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">Loading...</TableCell>
                  </TableRow>
                ) : brands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell className="font-bold text-slate-900">{brand.name}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        onClick={() => handleDelete(brand.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {brands.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={2} className="h-32 text-center text-muted-foreground italic">Belum ada merk.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
