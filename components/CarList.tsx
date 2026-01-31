"use client";

import { useState, useEffect } from "react";
import { CarCard } from "@/components/CarCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { api } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";

export function CarList({ brands }: { brands: any[] }) {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brandId: "",
    minPrice: 0,
    maxPrice: 2000000000,
    transmission: "",
    fuel: "",
    sort: "newest",
    search: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.brandId && filters.brandId !== "all") params.append("brandId", filters.brandId);
      if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
      if (filters.transmission && filters.transmission !== "all") params.append("transmission", filters.transmission);
      if (filters.fuel && filters.fuel !== "all") params.append("fuel", filters.fuel);
      params.append("sort", filters.sort);

      const data = await api.get(`/api/cars?${params.toString()}`);
      
      // Client side search filter
      let filteredData = data;
      if (filters.search) {
        filteredData = data.filter((car: any) => 
          car.model.toLowerCase().includes(filters.search.toLowerCase()) ||
          car.brand.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      setCars(filteredData);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters.brandId, filters.minPrice, filters.maxPrice, filters.transmission, filters.fuel, filters.sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCars();
  };

  const resetFilters = () => {
    setFilters({
      brandId: "all",
      minPrice: 0,
      maxPrice: 2000000000,
      transmission: "all",
      fuel: "all",
      sort: "newest",
      search: "",
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Search and Sort Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-6 rounded-2xl shadow-sm border">
        <form onSubmit={handleSearch} className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari model mobil..."
            className="pl-10 h-12 rounded-xl"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </form>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="md:hidden flex-1 h-12 rounded-xl"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter
          </Button>
          
          <Select value={filters.sort} onValueChange={(v) => setFilters({ ...filters, sort: v })}>
            <SelectTrigger className="w-full md:w-[200px] h-12 rounded-xl">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="price_asc">Harga Terendah</SelectItem>
              <SelectItem value="price_desc">Harga Tertinggi</SelectItem>
              <SelectItem value="year_desc">Tahun Terbaru</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className={`lg:block ${showFilters ? "block" : "hidden"} space-y-8 bg-white p-6 rounded-2xl border shadow-sm h-fit sticky top-24`}>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg uppercase tracking-tight">Filter Mobil</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50">
              RESET
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">Merk</Label>
              <Select value={filters.brandId} onValueChange={(v) => setFilters({ ...filters, brandId: v })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Semua Merk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Merk</SelectItem>
                  {brands.map((b) => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <Label className="text-xs font-bold uppercase text-muted-foreground">Rentang Harga</Label>
                <span className="text-[10px] font-bold text-primary">Juta IDR</span>
              </div>
              <div className="space-y-6 px-1">
                <Slider
                  defaultValue={[filters.minPrice, filters.maxPrice]}
                  max={2000000000}
                  step={10000000}
                  onValueCommit={(v) => setFilters({ ...filters, minPrice: v[0], maxPrice: v[1] })}
                />
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                  <span>{(filters.minPrice / 1000000).toFixed(0)} jt</span>
                  <span>{(filters.maxPrice / 1000000).toFixed(0)} jt</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">Transmisi</Label>
              <Select value={filters.transmission} onValueChange={(v) => setFilters({ ...filters, transmission: v })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Semua Transmisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">Bahan Bakar</Label>
              <Select value={filters.fuel} onValueChange={(v) => setFilters({ ...filters, fuel: v })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Semua Bahan Bakar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="Bensin">Bensin</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        {/* Car Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
              <CarCard car={{} as any} /> {/* This is just for dummy ref or icon, but better use real icon */}
              <p className="mt-4 text-xl font-bold text-slate-400">Mobil tidak ditemukan.</p>
              <Button variant="link" onClick={resetFilters} className="text-red-500 font-bold">Bersihkan Filter</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
