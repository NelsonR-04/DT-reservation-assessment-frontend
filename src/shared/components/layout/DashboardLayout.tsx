'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAppSelector } from '@/shared/store/hooks';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated, push]);

  if (!isAuthenticated) {
    return (
      <div className="w-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg
            className="animate-spin w-8 h-8 text-blue-600 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:ml-64">
        {/* Top Bar - spans full width behind sidebar */}
        <TopBar />

        {/* Page Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
