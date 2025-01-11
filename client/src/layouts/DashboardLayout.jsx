import { Outlet } from "react-router-dom";
import AdminDashboardSideBar from "@components/navigations/AdminDashboardSidebar";
import UserDashboardSideBar from "@components/navigations/UserDashboardSideBar";
import { useAuthContext } from "@hooks/useAuthContext";

const DashboardLayout = () => {
    const {user} = useAuthContext();
    return (
        <div className="flex h-screen"> 
            {user?.role === "admin" ? (
                <AdminDashboardSideBar />
            ) : user?.role  === "employee" ? (
                <UserDashboardSideBar />
            ) : null}

            <div className="flex-1 flex flex-col">
                <main className="flex-1 bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;