import { Route, Routes } from "react-router-dom";
import UserDashboard from "@pages/dashboard/UserDashboard";
import UserDashboardSideBar from "@components/navigations/UserDashboardSideBar";
import PageTitle from "@utils/PageTitle";

const UserDashboardLayout = () => {
    return (
        <div className="flex h-full w-full flex-row">
            <UserDashboardSideBar />
            <div className="flex-1 bg-gray-100 overflow-y-auto">
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
                                
                                <PageTitle title="My profile" />
                            </>
                        }
                    />
                    <Route
                        path="active-reservations"
                        element={
                            <>
                                
                                <PageTitle title="Active reservations" />
                            </>
                        }
                    />
                    <Route
                        path="past-reservations"
                        element={
                            <>
                                
                                <PageTitle title="past reservations" />
                            </>
                        }
                    />
                    <Route
                        path="damage-repost"
                        element={
                            <>
                                
                                <PageTitle title="Damage report" />
                            </>
                        }
                    />                    
                </Routes>
            </div>
        </div>
    );
};

export default UserDashboardLayout;