import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarOff,
  CreditCard,
  Settings,
  Building2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// ─── Nav Items ────────────────────────────────────────────────────────────────
const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Employees", url: "/employees", icon: Users },
  { title: "Attendance", url: "/attendance", icon: CalendarCheck },
  { title: "Leave", url: "/leave", icon: CalendarOff },
  { title: "Payroll", url: "/payroll", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function AppSidebar({ user, ...props }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar
      className="border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
      {...props}
    >
      {/* ── Header / Logo ── */}
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div
            className="size-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
            style={{ backgroundColor: "#137fec" }}
          >
            <Building2 className="size-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[#111418] dark:text-white text-base font-bold">
              Staffly
            </span>
            <span className="text-[#617589] dark:text-slate-400 text-xs">
              Admin Portal
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* ── Nav ── */}
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                        transition-colors cursor-pointer w-full
                        ${
                          isActive
                            ? "bg-[#137fec]/10 text-[#137fec] font-semibold"
                            : "text-[#111418] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }
                      `}
                    >
                      <button onClick={() => navigate(item.url)}>
                        <item.icon className="size-5 flex-shrink-0" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer / User ── */}
      <SidebarFooter className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
          {/* Avatar */}
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="size-8 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div
              className="size-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: "#137fec" }}
            >
              {user?.name?.charAt(0) ?? "U"}
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-xs font-bold text-[#111418] dark:text-white truncate">
              {user?.name ?? "HR Administrator"}
            </span>
            <span className="text-[10px] text-[#617589] dark:text-slate-400 truncate">
              {user?.role ?? "HR Director"}
            </span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
