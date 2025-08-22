import Dashboard from "@/pages/dashboard";
import RootLayout from "@/pages/Layout";
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router";
import LoginPage from "@/pages/login";
import { getCurrentUser } from "@/lib/auth";
import Actions from "@/pages/RealEstate/Actions";
import Employees from "@/pages/Employees";
import Leads from "@/pages/RealEstate/leads";
import Salaries from "@/pages/Hr/salaries";
import { getCookie } from "@/lib/cookies";
import HrDashboard from "@/pages/Hr/hrDashboard";
import RealEstateDashboard from "@/pages/RealEstate/realEstateDashboard";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>;
}

const role = getCookie("role");

const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public login route */}
        <Route path="/login" element={<LoginPage/>} />

        {/* Protected layout */}
        <Route 
          path="/"
          element={
            <>
              <RequireAuth>
                <RootLayout/>
              </RequireAuth>
            </>
          }
        >
          { role?.includes("HR") &&(<Route index element={<HrDashboard />} />) }
          { role?.includes("Real Estate") &&(<Route index element={<RealEstateDashboard />} />) }
          { role === "Admin" &&(<Route index element={<Dashboard />} />) }
        {/*  */}
        <Route index element={<RealEstateDashboard />} />
        {/* Routes based on role */}
        {role?.includes("HR")  && (
          <>
            <Route path="employees" element={<Employees />} />
            <Route path="salaries" element={<Salaries />} />
          </>
        )}

        {role?.includes("Real Estate") && (
          <>
            <Route path="leads" element={<Leads />} />
            <Route path="actions" element={<Actions />} />
          </>
        )}

        {role === "Admin" && (
          <>
            {/* HR Pages */}
            <Route path="employees" element={<Employees />} />
            <Route path="salaries" element={<Salaries />} />

            {/* Real Estate Pages */}
            <Route path="leads" element={<Leads />} />
            <Route path="actions" element={<Actions />} />
          </>
        )}
        </Route>
      </>
    )
);

export default router;
    
  