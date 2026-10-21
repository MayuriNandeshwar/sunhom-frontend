'use client';

import {
  Menu,
  Search,
  Bell,
  Settings,
  UserCircle,
} from 'lucide-react';
import { useSideBar } from '@/context/SidebarContext';
import { useState } from 'react';

export default function AdminTopbar() {
  const { toggleMobileSideBar } = useSideBar();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query.trim()) return;
    console.log('Search:', query);
    // 🔗 API call later
  };

  return (
    <header className="bg-white border-b">

      {/* BRAND ROW – MOBILE ONLY */}
      <div className="h-12 flex items-center justify-center bg-brand-primary md:hidden">
        <span className="text-amber-50 font-semibold tracking-[0.35em]">
          SUNHOM
        </span>
      </div>

      {/* ACTION ROW */}
      <div className="h-14 flex items-center gap-3 px-4 md:px-8">

        {/* LEFT: HAMBURGER */}
        <button onClick={toggleMobileSideBar} className="md:hidden">
          <Menu size={22} />
        </button>

        {/* SEARCH – MOBILE */}
        <div className="flex md:hidden flex-1">
          <div className="flex items-center w-full bg-gray-100 rounded-full px-3 py-2">
            <input
              type="text"
              placeholder="search.."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button
              onClick={handleSearch}
              className="text-gray-500 active:text-gray-700"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* SEARCH – DESKTOP */}
        <div className="hidden md:flex flex-1 max-w-xl ml-6">
          <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="search products, orders, customers.."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button
              onClick={handleSearch}
              className="text-gray-500 hover:text-gray-700"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4 ml-auto">
          <Bell size={20} />
          <Settings size={20} />
          <UserCircle size={28} className="text-gray-500" />
        </div>

      </div>
    </header>
  );
}
