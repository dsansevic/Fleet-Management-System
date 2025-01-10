import { Route, Routes } from "react-router-dom";
import UserDashboard from "@pages/dashboard/UserDashboard";
import PageTitle from "@utils/PageTitle";

const UserDashboardLayout = () => {
    return (
        <div className="flex h-full">
            <UserDashboardSideBar />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 bg-gray-100 p-6">
                    <Routes>
                        <Route
                            index
                            element={
                                <>
                                    <UserDashboard />
                                    <PageTitle title="User Dashboard" />
                                </>
                            }
                        />
                        <Route
                            path="profile"
                            element={
                                <>
                                    
                                    <PageTitle title="Profile" />
                                </>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default UserDashboardLayout;