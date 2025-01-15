import { Route, Routes } from "react-router-dom";
import UserDashboard from "@pages/dashboard/UserDashboard";
import AddReservation from "@pages/dashboard/user/reservations/AddReservation";
import InactiveReservations from "@pages/dashboard/user/reservations/InactiveReservations";
import ActiveReservations from "@pages/dashboard/user/reservations/ActiveReservations";
import ReservationDetails from "@pages/dashboard/user/reservations/ReservationDetails";
import DamageReport from "@pages/dashboard/user/damage-report/DamageReport";
import AddDamageReport from "@pages/dashboard/user/damage-report/AddDamageReport";
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
                                <ActiveReservations />
                                <PageTitle title="Active reservations" />
                            </>
                        }
                    />
                    <Route
                        path="inactive-reservations"
                        element={
                            <>
                                <InactiveReservations />
                                <PageTitle title="Inactive reservations" />
                            </>
                        }
                    />
                    <Route
                        path="new-reservation"
                        element={
                            <>
                                <AddReservation />
                                <PageTitle title="New reservation" />
                            </>
                        }
                    />
                    <Route
                        path="damage-report"
                        element={
                            <>
                                <DamageReport />
                                <PageTitle title="Damage report" />
                            </>
                        }
                    /> 
                    <Route
                        path="damage-report/new"
                        element={
                            <>
                                <AddDamageReport />
                                <PageTitle title="Add report" />
                            </>
                        }
                    />    
                    <Route
                        path="/:id"
                        element={
                            <>
                                <ReservationDetails /> 
                                <PageTitle title="Details" />
                            </>
                        }
                    />                  
                </Routes>
            </div>
        </div>
    );
};

export default UserDashboardLayout;