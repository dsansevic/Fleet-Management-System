import { Link } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

const UserDashboard = () => {
    const { user } = useAuthContext();

    return (
        <div className="p-12 bg-white shadow-md rounded-2xl">
            <h1 className="text-2xl font-bold text-gray-700">
            Welcome, {user?.firstName}!
            </h1>
            <p className="text-gray-600 mt-2">
                You are an employee at <strong className="text-brand-dark">{user?.companyName || "your company"}</strong>.
            </p>
            <p className="text-gray-600 mt-10">
                Need a vehicle for work? Book one now
            </p>
            
            <div className="mt-6">
                <Link 
                    to="/dashboard-user/new-reservation"
                    className="px-6 py-3 bg-brand-dark text-white font-semibold rounded-lg shadow hover:bg-brand-base transition"
                >
                    Create Reservation
                </Link>
            </div>
        </div>
    );
};

export default UserDashboard;