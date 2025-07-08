import { Link } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

const AdminDashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="p-12 rounded-base h-96">
      <h1 className="text-3xl font-bold text-gray-700">
        Welcome, {user?.firstName}!
      </h1>
      <p className="text-gray-600 mt-2 pb-2 border-b border-gray-300 text-lg">
        You’re managing the{" "}
        <strong className="text-brand-dark">{user?.companyName}</strong> fleet.
      </p>
      <div className="mt-6 text-lg">
        <Link
          to="/dashboard-admin/pending-reservations"
          className="text-brand-dark hover:text-brand-dark_hover"
        >
          Check reservations
        </Link>{" "}
        to keep things running smoothly!
      </div>
    </div>
  );
};

export default AdminDashboard;
