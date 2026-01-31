"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CarGallery({ images }: { images: { url: string }[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (images.length === 0) return (
    <div className="aspect-[16/10] bg-slate-100 rounded-3xl flex items-center justify-center">
      <p className="text-muted-foreground">Tidak ada foto</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-100 group">
        <Image
          src={images[activeIdx].url}
          alt="Car photo"
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            className={`relative min-w-[120px] aspect-[16/10] rounded-xl overflow-hidden border-4 transition-all ${
              idx === activeIdx ? "border-red-600 scale-95" : "border-transparent opacity-60 hover:opacity-100"
            }`}
            onClick={() => setActiveIdx(idx)}
          >
            <Image src={img.url} alt={`Photo ${idx + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
