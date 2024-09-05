'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import { useRouter } from 'next/navigation';
import Dashboard from './dashboard/page';

const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.authSlice);
  const router = useRouter();
  const [renderLayout, setRenderLayout] = useState<any>(null);
  const Roles = {
    ADMIN: 'admin',
    CLIENT: 'client',
  };

  useEffect(() => {
    if (user.role === Roles.ADMIN) {
      setRenderLayout(<Dashboard />);
    } else {
      router.push(`/admin/dashboard`);
      setRenderLayout(null);
    }
  }, [user, router]);

  return renderLayout;
};
export default DashboardPage;
