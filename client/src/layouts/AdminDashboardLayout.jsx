import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@pages/dashboard/AdminDashboard";
import Vehicles from "@pages/dashboard/admin/vehicles/Vehicles";
import Employees from "@pages/dashboard/admin/employees/Employees";
import PendingReservations from "@pages/dashboard/admin/reservations/PendingReservations";
import ReviewReservation from "@pages/dashboard/admin/reservations/reservation-review/ReviewReservation";
import DamageReports from "@pages/dashboard/admin/damage-reports/DamageReports";
import DamageReportDetails from "@pages/dashboard/admin/damage-reports/DamageReportDetails";
import AdminDashboardSideBar from "@components/navigations/AdminDashboardSidebar";
import NotFound from '@pages/errors/NotFound';
import PageTitle from "@utils/PageTitle";
import Sidebar from "../components/navigations/Sidebar";

const AdminDashboardLayout = () => {
    return (
        <div className="flex h-full w-full">
            <AdminDashboardSideBar />
            <div className="flex-1 bg-background p-4 md:ml-64 overflow-y-auto h-[calc(100vh-4rem)]">
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
        </div>
    );
};

export default AdminDashboardLayout;