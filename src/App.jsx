
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/styles/index.css'
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import DashboardLayout from './Layouts/DashboardLayout';
import EmployeesProfile from './pages/Profile/EmployeesProfile';
import PayrollPage from './pages/Payroll/PayrollPage';
import AttendancePage from './pages/Attendance/AttendancePage';
import EmployeesPage from './pages/Employees/EmployeesPage';
import LeavePage from './pages/Leave/LeavePage';
import SettingsPage from './pages/Settings/SettingsPage';
import AuthLayout from './Layouts/AuthLayout';
import Register from './pages/Auth/Register';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/profile",
          element: <EmployeesProfile />,
        },
        {
          path: "/payroll",
          element: <PayrollPage />,
        },
        {
          path: "/attendance",
          element: <AttendancePage />,
        },
        {
          path: "/employees",
          element: <EmployeesPage />,
        },
        {
          path: "/leave",
          element: <LeavePage />,
        },
        {
          path: "/settings",
          element: <SettingsPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <AuthLayout />,
      children: [
        {
          path  : "/login",
          element: <Login />, 
        },
        {
          path  : "/register",
          element: <Register />,
        }
      ]
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App
