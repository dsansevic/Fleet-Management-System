import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

const PrivateRoutes = ({ requiredRole }) => {
    const { userRole, token } = useAuthContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/403" />;
    }

    return <Outlet />;
};

export default PrivateRoutes;
