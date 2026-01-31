import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Send,
  MessageCircle
} from "lucide-react";
import Link from "next/link";

export default function KontakPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-slate-950 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Hubungi Kami</h1>
          <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
            Punya pertanyaan atau ingin menjadwalkan kunjungan? Tim kami siap melayani Anda dengan sepenuh hati.
          </p>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-black uppercase tracking-tight">Informasi Kontak</h2>
                <div className="space-y-6">
                  {[
                    { icon: Phone, title: "Telepon / WhatsApp", value: "+62 812 3456 7890" },
                    { icon: Mail, title: "Email", value: "info@showroommobil.com" },
                    { icon: MapPin, title: "Alamat Showroom", value: "Jl. Raya Otomotif No. 123, Jakarta Selatan" },
                    { icon: Clock, title: "Jam Operasional", value: "Senin - Sabtu: 09:00 - 18:00" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border shadow-sm">
                      <div className="h-12 w-12 rounded-xl bg-red-600/10 flex items-center justify-center shrink-0 border border-red-600/20">
                        <item.icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{item.title}</h4>
                        <p className="font-bold text-lg">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-slate-950 rounded-3xl text-white space-y-6 shadow-2xl">
                <h3 className="font-bold text-xl uppercase tracking-tight">Media Sosial</h3>
                <div className="flex gap-4">
                  <Link href="#" className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-red-600 transition-all">
                    <Instagram className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-red-600 transition-all">
                    <Facebook className="h-6 w-6" />
                  </Link>
                </div>
                <Link href="https://wa.me/6281234567890" className="block">
                  <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest bg-green-600 hover:bg-green-700">
                    <MessageCircle className="mr-2" />
                    Chat WhatsApp
                  </Button>
                </Link>
              </div>
            </div>

            {/* Map & Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
                <h2 className="text-2xl font-black uppercase tracking-tight">Kirim Pesan</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input placeholder="John Doe" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nomor WhatsApp</Label>
                    <Input placeholder="0812..." className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Subjek</Label>
                    <Input placeholder="Tanya stok mobil..." className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Pesan</Label>
                    <Textarea placeholder="Tuliskan pesan Anda di sini..." className="min-h-[150px] rounded-xl" />
                  </div>
                  <div className="md:col-span-2">
                    <Button className="w-full md:w-auto h-14 px-10 rounded-2xl font-black uppercase tracking-widest bg-red-600 hover:bg-red-700 shadow-xl shadow-red-100">
                      <Send className="mr-2 h-5 w-5" />
                      Kirim Sekarang
                    </Button>
                  </div>
                </form>
              </div>

              {/* Map Embed Placeholder */}
              <div className="aspect-video w-full rounded-3xl overflow-hidden border bg-slate-200 grayscale contrast-125 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-bold text-slate-500 uppercase tracking-widest">Google Maps Embed</p>
                </div>
                {/* Real embed would go here */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Label } from "@/components/ui/label";
