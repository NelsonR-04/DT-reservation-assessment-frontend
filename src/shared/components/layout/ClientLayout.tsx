'use client';

import { usePathname } from 'next/navigation';
import DashboardLayout from './DashboardLayout';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // Routes that don't need the dashboard layout
  const publicRoutes = ['/login'];

  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ClientLayout;
