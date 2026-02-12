import { supabase } from "@/supabase/Client";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout Error:", error.message);
      return;
    }

    navigate("/login"); // يوديه صفحة اللوجين
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md"
    >
      Logout
    </button>
  );
}
