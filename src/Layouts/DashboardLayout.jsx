import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const PAGE_TITLES = {
  "/": "Dashboard",
  "/employees": "Employees",
  "/attendance": "Attendance",
  "/leave": "Leave",
  "/payroll": "Payroll",
  "/settings": "Settings",
  "/profile": "Profile",
};

export default function DashboardLayout() {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] ?? "Dashboard";

  return (
    <SidebarProvider className="bg-slate-50 text-slate-900">
      <AppSidebar
        user={{ name: "John Doe", role: "Administrator", avatarUrl: null }}
      />

      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm md:px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="md:hidden" />
            <Separator orientation="vertical" className="hidden h-6 md:block" />
            <div className="flex flex-col gap-0.5">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="text-lg font-semibold leading-tight tracking-tight text-slate-900">
                {title}
              </h1>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
