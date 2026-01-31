import Image from "next/image";
import { CheckCircle2, History, ShieldCheck, Star, Users } from "lucide-react";

export default function TentangPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-slate-950 text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop"
            alt="Car heritage"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6">Tentang <span className="text-red-600">Kami</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Membangun kepercayaan melalui kualitas. Kami adalah showroom mobil bekas pilihan dengan pengalaman lebih dari satu dekade dalam industri otomotif.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1562141989-c5c79ac8f576?q=80&w=1000&auto=format&fit=crop"
                alt="Showroom interior"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-red-500 font-bold uppercase tracking-widest text-sm">Profil Showroom</h2>
                <h3 className="text-4xl font-black uppercase tracking-tighter">Visi & Misi Kami</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Didirikan dengan semangat untuk memberikan alternatif mobil bekas berkualitas tanpa rasa khawatir. Kami memahami bahwa membeli mobil adalah investasi besar bagi setiap orang.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-red-600">
                  <h4 className="font-black uppercase text-lg mb-2">Visi Kami</h4>
                  <p className="text-slate-600 italic">"Menjadi showroom mobil bekas nomor satu di Indonesia yang dikenal karena kejujuran, transparansi, dan kualitas unitnya."</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-900">
                  <h4 className="font-black uppercase text-lg mb-2">Misi Kami</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-red-600 shrink-0" />
                      Hanya menyediakan unit dengan riwayat perawatan yang jelas.
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-red-600 shrink-0" />
                      Memberikan edukasi dan transparansi penuh kepada calon pembeli.
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-red-600 shrink-0" />
                      Membangun hubungan jangka panjang dengan layanan purna jual yang baik.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Unit Terjual", value: "2,500+", icon: Users },
              { label: "Tahun Pengalaman", value: "12", icon: History },
              { label: "Partner Bengkel", value: "50+", icon: ShieldCheck },
              { label: "Rating Kepuasan", value: "4.9/5", icon: Star },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-3 p-8 bg-white rounded-3xl border shadow-sm transition-transform hover:-translate-y-1">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-black uppercase tracking-tighter">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
