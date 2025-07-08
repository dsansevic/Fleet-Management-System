import { Link } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

const UserDashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="p-12 h-96">
      <h1 className="text-3xl font-bold text-gray-700">
        Welcome, {user?.firstName}!
      </h1>
      <p className="text-gray-600 mt-2 pb-2 text-lg border-b border-gray-300">
        You’re part of the{" "}
        <strong className="text-brand-dark">
          {user?.companyName || "your company"}
        </strong>{" "}
        team.
      </p>
      <p className="text-gray-600 mt-6 text-lg">
        Need a vehicle for work?{" "}
        <Link
          to="/dashboard-user/new-reservation"
          className="text-brand-dark hover:text-brand-dark_hover"
        >
          Book one now
        </Link>
      </p>
    </div>
  );
};

export default UserDashboard;
