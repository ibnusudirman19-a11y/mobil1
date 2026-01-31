import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Car, 
  Settings, 
  Tag, 
  LogOut, 
  Home,
  Menu,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Kelola Mobil", href: "/admin/mobil", icon: Car },
    { label: "Kelola Merk", href: "/admin/merk", icon: Tag },
    { label: "Pengaturan Showroom", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b">
          <Link href="/admin" className="flex items-center gap-2 font-black text-xl uppercase tracking-tighter">
            <span className="text-red-600">Admin</span> Panel
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-tight text-slate-600 hover:bg-slate-50 hover:text-red-600 rounded-xl transition-all group"
            >
              <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {item.label}
              <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase text-slate-500 hover:text-black">
            <Home className="h-5 w-5" />
            Lihat Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-white flex items-center justify-between px-8 lg:hidden">
          <Link href="/admin" className="font-black text-xl uppercase tracking-tighter">
            <span className="text-red-600">Admin</span>
          </Link>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        <main className="p-4 md:p-8 animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
