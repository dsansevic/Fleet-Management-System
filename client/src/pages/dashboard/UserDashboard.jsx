import { useAuthContext } from "@hooks/useAuthContext";

const UserDashboard = () => {
    const { user } = useAuthContext();

    return (
        <div className="p-6 bg-white shadow-md rounded-md h-full">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
                Welcome, {user?.firstName}!
            </h1>
        </div>
    );
};

export default UserDashboard;
