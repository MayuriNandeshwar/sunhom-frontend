'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  Store,
} from 'lucide-react';
import { useSideBar } from '@/context/SidebarContext';

type Role = 'ADMIN' | 'SUPER_ADMIN';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'SUPER_ADMIN'] },
  { label: 'Products', href: '/admin/products', icon: Package, roles: ['ADMIN', 'SUPER_ADMIN'] },
  { label: 'Inventory', href: '/admin/inventory', icon: Boxes, roles: ['ADMIN', 'SUPER_ADMIN'] },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag, roles: ['ADMIN', 'SUPER_ADMIN'] },
  { label: 'Customers', href: '/admin/customers', icon: Users, roles: ['ADMIN', 'SUPER_ADMIN'] },
  { label: 'Vendors', href: '/admin/vendors', icon: Store, roles: ['ADMIN', 'SUPER_ADMIN'] },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, roles: ['SUPER_ADMIN'] },
  { label: 'Settings', href: '/admin/settings', icon: Settings, roles: ['SUPER_ADMIN'] },
];

export default function AdminSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const { isMobileOpen, toggleMobileSideBar } = useSideBar();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={toggleMobileSideBar}
        />
      )}

      <aside
        className={`
          fixed md:static z-50 h-full
          w-72 bg-white border-r
          transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* BRAND (MOBILE + DESKTOP) */}
        <div className="h-20 flex items-center px-6 bg-brand-primary">
          <span className="text-amber-50 font-semibold tracking-[0.35em] text-lg">
            SUNHOM
          </span>
        </div>

        {/* NAVIGATION */}
        <nav className="px-4 py-6 space-y-2 mt-4">
          {NAV_ITEMS.filter(item => item.roles.includes(role)).map(item => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMobileSideBar}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-full
                  text-sm font-medium transition
                  ${active
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-700 hover:bg-amber-50'}
                `}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
