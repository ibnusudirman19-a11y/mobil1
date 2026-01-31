import Link from "next/link";
import { Car, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Car className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold tracking-tight uppercase text-white">Showroom Mobil</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Showroom mobil bekas berkualitas dan terpercaya. Semua unit telah melalui inspeksi ketat untuk menjamin kepuasan Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Navigasi</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-red-500 transition-colors">Beranda</Link></li>
              <li><Link href="/mobil" className="hover:text-red-500 transition-colors">Katalog Mobil</Link></li>
              <li><Link href="/tentang" className="hover:text-red-500 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/kontak" className="hover:text-red-500 transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Kontak Kami</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-red-500" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-red-500" />
                <span>info@showroommobil.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>Jl. Raya Otomotif No. 123, Jakarta Selatan</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-red-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-red-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Showroom Mobil Bekas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
