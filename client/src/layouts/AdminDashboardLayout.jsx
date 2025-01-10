import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@pages/dashboard/AdminDashboard";
import Vehicles from "@pages/dashboard/admin/vehicles/Vehicles";
import Employees from "@pages/dashboard/admin/employees/Employees";
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
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;