'use client';

import { Menu, Bell, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';

export const Header = ({
  onMenuClick,
  onLogout,
}: {
  onMenuClick: () => void;
  onLogout?: () => void;
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-900 rounded-lg lg:hidden"
          >
            <Menu size={24} className="text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            GK Trader
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-900 rounded-lg transition"
          >
            {isDark ? (
              <Sun size={20} className="text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-300" />
            )}
          </button>

          <button className="p-2 hover:bg-gray-900 rounded-lg relative">
            <Bell size={20} className="text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 hover:bg-gray-900 rounded-lg">
            <Settings size={20} className="text-gray-300" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
            >
              <span className="text-white font-semibold">U</span>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-t-lg"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Settings
                </Link>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-b-lg flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
