'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/spaces', label: 'Espacios' },
    { href: '/reservations', label: 'Reservas' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900">
              CoWork Space
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              aria-label="Toggle navigation"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block pl-3 pr-4 py-2 text-base font-medium transition-colors ${
                  isActive(href)
                    ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
