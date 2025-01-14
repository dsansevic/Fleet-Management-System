import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@pages/dashboard/AdminDashboard";
import Vehicles from "@pages/dashboard/admin/vehicles/Vehicles";
import Employees from "@pages/dashboard/admin/employees/Employees";
import PendingReservations from "@pages/dashboard/admin/reservations/PendingReservations";
import ReviewReservation from "@pages/dashboard/admin/reservations/reservation-review/ReviewReservation";
import DamageReports from "@pages/dashboard/admin/damage-reports/DamageReports";
import AdminDashboardSideBar from "@components/navigations/AdminDashboardSidebar";
import PageTitle from "@utils/PageTitle";

const AdminDashboardLayout = () => {
    return (
        <div className="flex h-full w-full flex-row">
            <AdminDashboardSideBar />
            <div className="flex-1 bg-gray-100 overflow-y-auto">
                <Routes>
                    <Route
                        index
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
                        path="employees"
                        element={
                            <>
                                <Employees />
                                <PageTitle title="Employees" />
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
                        path="damage-reports"
                        element={
                            <>
                                <DamageReports />
                                <PageTitle title="Damage reports" />
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
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;