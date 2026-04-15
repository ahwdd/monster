// src/app/[locale]/admin/layout.tsx

import AdminSidebar from "@/components/admin/AdminSideBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-(--color-bg,#0a0a0a)">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="fixed top-0 left-56 right-0 z-40 h-16 flex items-center px-6
          bg-[rgba(5,5,5,0.97)] border-b border-zinc-900 backdrop-blur-sm">
          <span className="font-display font-bold text-white uppercase tracking-widest txt-small">
            Monster Ambassadors — Admin
          </span>
        </header>

        <main className="flex-1 pt-16 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}