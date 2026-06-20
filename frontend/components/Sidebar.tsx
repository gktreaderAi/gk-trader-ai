'use client';

import Link from 'next/link';
import { BarChart3, TrendingUp, Wallet, Settings, Shield, LogOut, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, href: '/dashboard' },
    { id: 'journal', label: 'Trade Journal', icon: Wallet, href: '/dashboard/journal' },
    { id: 'risk', label: 'Risk Manager', icon: TrendingUp, href: '/dashboard/risk' },
    { id: 'performance', label: 'Performance Analytics', icon: BarChart3, href: '/dashboard/performance' },
    { id: 'goals', label: 'Goals', icon: Shield, href: '/dashboard/goals' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' },
    { id: 'teacher', label: 'Trading Teacher', icon: Wallet, href: '/dashboard/teacher' },
  ];

  const activeItem = menuItems.find((item) => pathname?.startsWith(item.href))?.id || 'dashboard';

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-950 border-r border-gray-800 transform transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40 lg:z-0 pt-20`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-900 rounded-lg lg:hidden"
        >
          <X size={20} className="text-gray-300" />
        </button>

        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeItem === item.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
