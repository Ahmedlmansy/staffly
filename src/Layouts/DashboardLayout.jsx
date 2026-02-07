import React from 'react'
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div>
      header
      <main className="min-h-screen">
        <Outlet />
        </main>
          foorter
    </div>
  );
}
