import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

const GuestRoutes = () => {
    const { user } = useAuthContext();

    if (user) {
        if (user.role === "admin")
            return <Navigate to="/dashboard-admin" replace />;
        if (user.role === "employee")
            return <Navigate to="/dashboard-user" replace />;
        
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default GuestRoutes;