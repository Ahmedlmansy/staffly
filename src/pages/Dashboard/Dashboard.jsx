
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { StatsCards } from '@/components/dashboard/StatCard';
import { WeeklyAttendanceChart } from '@/components/dashboard/WeeklyAttendanceChart';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Dashboard()
{
  const navigate = useNavigate();
  const defaultData = [
    { day: "Mon", attendance: 85 },
    { day: "Tue", attendance: 92 },
    { day: "Wed", attendance: 96 },
    { day: "Thu", attendance: 88 },
    { day: "Fri", attendance: 82 },
  ];
const defaultActivities = [
  {
    id: 1,
    name: "David Chen",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC56hjoP-sVulT2WF_S2BgChgqV49viBtDZtLCAoCpyS0V3WSpGPKSPMXGS609S-CrKrXcqoOPwLIi6THQuBjs2g7FJQUhdhj3pMivaBz-Oa8RfBNk95IyYzNJYqWp4XMMMFZsg_vEcx_gGWXqX9WsvRVqLu8wvpj8ofXr7QNybywo8UyeCnCa-l4crA669ek19jThXZkqxCZrqibx5gucKGFkbCnUULmDb7Au4s_JAeFg1tsE0qvaTNRqZr02nEk-z4mS0GedvJVY",
    action: "Clock In",
    time: "08:45 AM",
    status: "on_time",
  },
  {
    id: 2,
    name: "Sarah Miller",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmzg8kVoerWCaNGxuEZ6GABORJOwLMxEotKUz_VOH74FQ7cRsKJg5N2n7YFY0eXK0hfY4Spe86YXz85L2bBVFAZgvXXzCrF0A5K6v11Lspytx6eBCzdX_x60WNYIaRaFfllqCrp323M1Q4iSuGxkpsKgxkW_WLOEurXaBvf0K6F7Z0ZJo5VlkengvSvbBg0r0rMfKK5yed0LN0kRNZdXqZd-UU9VwVHJlztemSwxUgyZ9aQeT3-S__VuNBlRj4po_HRthJjeJNPcI",
    action: "Leave Req",
    time: "09:12 AM",
    status: "pending",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrAEOV3323yicFm5ILydIto5yL_H97zjBYYFdclZ41TOSxHyn4s1YzcTOfsB-sZF-ss1FWVsSbBB1eEm_c1XcbyIVd-1PlPvK3ySmj6zK4ZEZQ9LF77R32K9-DBlbk6ADUHUn5BZOzI78xZ066c1rUd2SP8qMd5BWsgtYB5wVR2LAqr-XNSUaPzT1hZPnW1iaC3XYZB5CV2_NUQFP2fALdM0KpAi5PmGTYnhdWBz4i7ewiFB6pO0iiOaOckrxIaSED9Yl_SWYmYs8",
    action: "Clock In",
    time: "09:30 AM",
    status: "late",
  },
];

  return (
    <div>
      <div className="flex flex-col gap-1 my-8">
        <h2 className="text-3xl font-black tracking-tight text-[#111418] dark:text-white">
          Dashboard Overview
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Welcome back, here is the organizational pulse for today.
        </p>
      </div>
      <div className="">
        <StatsCards />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 my-8 gap-6">
        <WeeklyAttendanceChart data={defaultData} />
        <RecentActivity
          activities={defaultActivities}
          onViewAll={() => navigate("/attendance")}
        />
      </div>
    </div>
  );
}
