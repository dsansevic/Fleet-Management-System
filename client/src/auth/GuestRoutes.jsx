import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

const GuestRoutes = () => {
    const { user } = useAuthContext();

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default GuestRoutes;