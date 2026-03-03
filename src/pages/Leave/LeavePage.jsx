import { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { LeaveStatsCards } from "@/components/leave/LeaveStatsCards";
import { LeaveRequestsTable } from "@/components/leave/LeaveRequestsTable";
import { LeaveRequestForm } from "@/components/leave/LeaveRequestForm";


export default function LeavePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stats = { totalRequests: 124, approvedThisMonth: 86, currentlyOut: 12 };

  const handleSubmitRequest = async () => {
    setIsSubmitting(true);
    try {
      // TODO: await supabase.from('leave_requests').insert(values)
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Leave request submitted successfully");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = (row) => {
    // TODO: await supabase.from('leave_requests').update({ status: 'Approved' }).eq('id', row.id)
    toast.success("Approved leave for " + row.name);
  };

  const handleReject = (row) => {
    // TODO: await supabase.from('leave_requests').update({ status: 'Rejected' }).eq('id', row.id)
    toast.error("Rejected leave for " + row.name);
  };

  return (
    <main className="flex flex-col flex-1 max-w-[1200px] mx-auto w-full px-6 py-8">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
            Leave Management
          </h1>
          <p className="text-[#617589] dark:text-[#94a3b8] text-base">
            Review and manage organizational time-off requests
          </p>
        </div>
        <button
          onClick={() => toast.info("Export coming soon")}
          className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-[#34414e] text-[#111418] dark:text-white text-sm font-bold shadow-sm"
        >
          <Download className="size-4" />
          Export Report
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <LeaveRequestForm
            onSubmit={handleSubmitRequest}
            isLoading={isSubmitting}
          />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-6">
          <LeaveRequestsTable
            onApprove={handleApprove}
            onReject={handleReject}
          />
          <LeaveStatsCards stats={stats} />
        </div>
      </div>
    </main>
  );
}
