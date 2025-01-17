import { Route, Routes, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import UserDashboard from "@pages/dashboard/UserDashboard";
import AddReservation from "@pages/dashboard/user/reservations/AddReservation";
import InactiveReservations from "@pages/dashboard/user/reservations/InactiveReservations";
import ActiveReservations from "@pages/dashboard/user/reservations/ActiveReservations";
import ReservationDetails from "@pages/dashboard/user/reservations/ReservationDetails";
import DamageReport from "@pages/dashboard/user/damage-report/DamageReport";
import DamageReportDetails from "@pages/dashboard/user/damage-report/DamageReportDetails";
import AddDamageReport from "@pages/dashboard/user/damage-report/AddDamageReport";
import UserDashboardSideBar from "@components/navigations/UserDashboardSideBar";
import NotFound from '@pages/errors/NotFound';
import PageTitle from "@utils/PageTitle";

const UserDashboardLayout = () => {
    const location = useLocation();
    const previousPath = useRef(location.pathname); 

    useEffect(() => {
        if (document.startViewTransition) {
            document.startViewTransition(() => {});
        }  
        if (!location.pathname.startsWith("/dashboard-user/reservation/") && previousPath.current.startsWith("/dashboard-user/active-reservations")) {
            sessionStorage.removeItem("activeReservationsPage");
    }
                  
        if (!location.pathname.startsWith("/dashboard-user/damage-report") && previousPath.current.startsWith("/dashboard-user/damage-report")) {
            sessionStorage.removeItem("damageReportPage");
        }

        previousPath.current = location.pathname;
    }, [location.pathname]);

    return (
        <div className="flex h-full w-full">
            <UserDashboardSideBar />
            <div className="flex-1 bg-background p-4 md:ml-64 overflow-y-auto h-[calc(100vh-4rem)]">
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
                        path="damage-report/:id"
                        element={
                            <>
                                <DamageReportDetails />
                                <PageTitle title="Report details" />
                            </>
                        }
                    />    
                    <Route
                        path="reservation/:id"
                        element={
                            <>
                                <ReservationDetails /> 
                                <PageTitle title="Details" />
                            </>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
};

export default UserDashboardLayout;