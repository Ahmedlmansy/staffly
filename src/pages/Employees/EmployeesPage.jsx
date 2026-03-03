import { useState } from "react";
import { Download, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { EmployeeFilters } from "@/components/employees/Employeefilters";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeePagination } from "@/components/employees/Employeepagination";
import { EmployeeFormDialog } from "@/components/employees/Employeeformdialog";
import { DeleteConfirmDialog } from "@/components/employees/Deleteconfirmdialog";


const PAGE_SIZE = 10;

// ─── Mock data (replace with Supabase queries) ────────────────────────────────
const MOCK_EMPLOYEES = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john@co.com",
    position: "Senior Developer",
    employment_type: "Full-time",
    status: "Active",
    departments: { name: "Engineering" },
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@co.com",
    position: "Lead Designer",
    employment_type: "Full-time",
    status: "Active",
    departments: { name: "Marketing" },
  },
  {
    id: "3",
    first_name: "Robert",
    last_name: "Brown",
    email: "robert@co.com",
    position: "HR Manager",
    employment_type: "Contract",
    status: "Inactive",
    departments: { name: "HR" },
  },
  {
    id: "4",
    first_name: "Emily",
    last_name: "Davis",
    email: "emily@co.com",
    position: "QA Engineer",
    employment_type: "Full-time",
    status: "Active",
    departments: { name: "Engineering" },
  },
  {
    id: "5",
    first_name: "Michael",
    last_name: "Wilson",
    email: "michael@co.com",
    position: "Product Manager",
    employment_type: "Part-time",
    status: "Inactive",
    departments: { name: "Engineering" },
  },
];

const MOCK_DEPARTMENTS = [
  { id: "d1", name: "Engineering" },
  { id: "d2", name: "Marketing" },
  { id: "d3", name: "HR" },
  { id: "d4", name: "Finance" },
  { id: "d5", name: "Sales" },
];

export default function EmployeesPage() {
  // ── Filters & Pagination ──
  const [filters, setFilters] = useState({ department: "", status: "" });
  const [currentPage, setCurrentPage] = useState(1);

  // ── Dialog state ──
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Filtered data (swap this with Supabase query later) ──
  const filtered = MOCK_EMPLOYEES.filter((emp) => {
    if (filters.department && emp.departments?.name !== filters.department)
      return false;
    if (filters.status && emp.status !== filters.status) return false;
    return true;
  });

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // ── Handlers ──
  const handleFilterChange = (newFilter) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
    setCurrentPage(1);
  };

  const handleOpenAdd = () => {
    setSelectedEmployee(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormOpen(true);
  };

  const handleOpenDelete = (employee) => {
    setSelectedEmployee(employee);
    setDeleteOpen(true);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      // TODO: replace with Supabase insert/update
      // if (selectedEmployee) {
      //   await supabase.from("employees").update(values).eq("id", selectedEmployee.id)
      // } else {
      //   await supabase.from("employees").insert(values)
      // }
      await new Promise((r) => setTimeout(r, 800)); // mock delay
      toast.success(
        selectedEmployee
          ? "Employee updated successfully"
          : "Employee added successfully",
      );
      setFormOpen(false);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      // TODO: replace with Supabase delete
      // await supabase.from("employees").delete().eq("id", selectedEmployee.id)
      await new Promise((r) => setTimeout(r, 600)); // mock delay
      toast.success("Employee deleted successfully");
      setDeleteOpen(false);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportCSV = () => {
    // TODO: implement CSV export
    toast.info("Export coming soon");
  };

  return (
    <main className="flex-1 flex justify-center py-8">
      <div className="flex flex-col w-full max-w-[1200px] px-6">
        {/* ── Page Header ── */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex min-w-72 flex-col gap-1">
            <h1 className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
              Employee Directory
            </h1>
            <p className="text-[#617589] dark:text-gray-400 text-base font-normal leading-normal">
              Manage, filter, and track employee performance and status.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-[#1f2937] border border-[#dbe0e6] dark:border-[#2a3541] text-[#111418] dark:text-white text-sm font-bold hover:bg-gray-50 transition-colors"
            >
              <Download className="size-4" />
              Export CSV
            </button>
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 h-10 px-4 rounded-lg text-white text-sm font-bold shadow-md hover:opacity-90 transition-all"
              style={{ backgroundColor: "#137fec" }}
            >
              <UserPlus className="size-4" />
              Add Employee
            </button>
          </div>
        </div>

        {/* ── Filters ── */}
        <EmployeeFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={() => {
            setFilters({ department: "", status: "" });
            setCurrentPage(1);
          }}
        />

        {/* ── Table ── */}
        <EmployeeTable
          employees={paginated}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />

        {/* ── Pagination ── */}
        <EmployeePagination
          currentPage={currentPage}
          totalPages={Math.max(totalPages, 1)}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ── Dialogs ── */}
      <EmployeeFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        employee={selectedEmployee}
        departments={MOCK_DEPARTMENTS}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        employee={selectedEmployee}
        onConfirm={handleDelete}
        isLoading={isSubmitting}
      />
    </main>
  );
}
