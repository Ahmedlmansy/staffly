import { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { CheckInPanel } from "@/components/attendance/Checkinpanel";
import { LiveClock } from "@/components/attendance/Liveclock";
import { AttendanceTable } from "@/components/attendance/Attendancetable";


export default function AttendancePage() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // TODO: replace with real Supabase stats query
  const stats = { totalDays: 22, present: 19, lateAbsent: 3 };

  const handleCheckIn = async () => {
    // TODO: insert/update attendance record in Supabase
    // const now = new Date().toISOString()
    // if (!isCheckedIn) {
    //   await supabase.from("attendance").insert({ employee_id, check_in: now })
    // } else {
    //   await supabase.from("attendance").update({ check_out: now }).eq("id", activeRecordId)
    // }
    setIsCheckedIn((prev) => !prev);
    toast.success(
      isCheckedIn ? "Checked out successfully" : "Checked in successfully",
    );
  };

  const handleExport = () => {
    // TODO: implement CSV export
    toast.info("Export coming soon");
  };

  return (
    <main className="flex-1 flex justify-center py-8">
      <div className="w-full max-w-[1200px] mx-auto px-6 flex flex-col gap-8">
        {/* ── Page Header ── */}
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-[#111418] dark:text-white text-4xl font-black tracking-tight">
              Attendance Tracking Log
            </h1>
            <p className="text-[#617589] dark:text-gray-400 text-base">
              Monitor and manage employee attendance records for the current pay
              period.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-[#111418] dark:text-white"
          >
            <Download className="size-4" />
            Export Report
          </button>
        </div>

        {/* ── Clock & Actions Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CheckInPanel
              stats={stats}
              isCheckedIn={isCheckedIn}
              onCheckIn={handleCheckIn}
            />
          </div>
          <LiveClock />
        </div>

        {/* ── Table ── */}
        <AttendanceTable />
      </div>
    </main>
  );
}
