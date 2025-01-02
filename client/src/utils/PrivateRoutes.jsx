import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

const PrivateRoutes = ({ requiredRole }) => {
    const { role, token } = useAuthContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/403" />;
    }

    return <Outlet />;
};

export default PrivateRoutes;
