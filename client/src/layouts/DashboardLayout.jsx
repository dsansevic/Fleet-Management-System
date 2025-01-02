import { Outlet } from "react-router-dom";
import AdminDashboardSideBar from "@components/navigations/AdminDashboardSidebar";
import UserDashboardSideBar from "@components/navigations/UserDashboardSideBar";
import { useAuthContext } from "@hooks/useAuthContext";

const DashboardLayout = () => {
    const {role} = useAuthContext();
    return (
        <div className="flex h-screen"> 
            {role === "admin" ? (
                <AdminDashboardSideBar />
            ) : role === "user" ? (
                <UserDashboardSideBar />
            ) : null}

            <div className="flex-1 flex flex-col">
                <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;