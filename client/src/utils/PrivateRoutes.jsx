import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

const PrivateRoutes = ({ requiredRole }) => {
    const { user, isAuthLoaded } = useAuthContext();
    if (!isAuthLoaded) {
        return null; 
    }
    
    if (!user?.role) {
        return <Navigate to="/" />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/403" />;
    }

    return <Outlet />;
};

export default PrivateRoutes;
