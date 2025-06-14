import { Link } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

const AdminDashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="p-12 rounded-base">
      <h1 className="text-2xl font-bold text-gray-700">
        Welcome, {user?.firstName}!
      </h1>
      <p className="text-gray-600 mt-2">
        You are managing the fleet of{" "}
        <strong className="text-brand-dark">{user?.companyName}</strong>. Review
        reservations and keep operations running smoothly.
      </p>
      <div className="mt-6">
        <Link
          to="/dashboard-admin/pending-reservations"
          className="px-6 py-3 bg-brand-dark text-white font-semibold rounded-base shadow hover:bg-brand-darker"
        >
          Review Reservations
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
