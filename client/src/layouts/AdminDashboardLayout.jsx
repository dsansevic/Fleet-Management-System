import { Route, Routes, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import AdminDashboard from "@pages/dashboard/AdminDashboard";
import Vehicles from "@pages/dashboard/admin/vehicles/Vehicles";
import AddVehicleForm from "@pages/dashboard/admin/vehicles/AddVehicleForm";
import EditVehicleForm from "@pages/dashboard/admin/vehicles/EditVehicleForm";
import Employees from "@pages/dashboard/admin/employees/Employees";
import AddEmployeeForm from "@pages/dashboard/admin/employees/AddEmployeeForm";
import Reservations from "@pages/dashboard/admin/reservations/Reservations";
import PendingReservations from "@pages/dashboard/admin/reservations/PendingReservations";
import ReviewReservation from "@pages/dashboard/admin/reservations/reservation-review/ReviewReservation";
import DamageReports from "@pages/dashboard/admin/damage-reports/DamageReports";
import DamageReportDetails from "@pages/dashboard/admin/damage-reports/DamageReportDetails";
import AdminDashboardSideBar from "@components/navigations/AdminDashboardSideBar";
import NotFound from "@pages/errors/NotFound";
import PageTitle from "@utils/PageTitle";
import Footer from "../components/Footer";

const AdminDashboardLayout = () => {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {});
    }

    if (
      !location.pathname.startsWith("/dashboard-admin/vehicles") &&
      previousPath.current.startsWith("/dashboard-admin/vehicles")
    ) {
      sessionStorage.removeItem("vehiclePage");
    }

    previousPath.current = location.pathname;
  }, [location.pathname]);

  return (
    <div className="flex min-h-full w-screen">
      <AdminDashboardSideBar />
      <div className="flex-1 bg-background md:ml-64 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="px-4 ">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AdminDashboard />
                  <PageTitle title="Admin Dashboard" />
                </>
              }
            />
            <Route
              path="vehicles"
              element={
                <>
                  <Vehicles />
                  <PageTitle title="Manage Vehicles" />
                </>
              }
            />
            <Route
              path="vehicles/new"
              element={
                <>
                  <AddVehicleForm />
                  <PageTitle title="Add Vehicle" />
                </>
              }
            />
            <Route
              path="vehicles/edit/:id"
              element={
                <>
                  <EditVehicleForm />
                  <PageTitle title="Edit vehicle" />
                </>
              }
            />
            <Route
              path="employees"
              element={
                <>
                  <Employees />
                  <PageTitle title="Employees" />
                </>
              }
            />
            <Route
              path="employees/new"
              element={
                <>
                  <AddEmployeeForm />
                  <PageTitle title="Add employee" />
                </>
              }
            />
            <Route
              path="pending-reservations"
              element={
                <>
                  <PendingReservations />
                  <PageTitle title="Pending reservations" />
                </>
              }
            />
            <Route
              path="reservations"
              element={
                <>
                  <Reservations />
                  <PageTitle title="Reservations" />
                </>
              }
            />
            <Route
              path="damage-reports"
              element={
                <>
                  <DamageReports />
                  <PageTitle title="Damage reports" />
                </>
              }
            />
            <Route
              path="/damage-reports/:id"
              element={
                <>
                  <DamageReportDetails />
                  <PageTitle title="Report details" />
                </>
              }
            />
            <Route
              path="review-reservation/:id"
              element={
                <>
                  <ReviewReservation />
                  <PageTitle title="Reservation" />
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div className="relative bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
