import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForbiddenImage from "@assets/forbidden.png";
import { useAuthContext } from "@hooks/useAuthContext";

const ForbiddenPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const path = user.role === "admin" ? "/dashboard-admin" : "/dashboard-user";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(path);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col pt-10 items-center h-full text-center">
      <img
        src={ForbiddenImage}
        alt="403 Forbidden"
        className="w-64 h-auto mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">403 - Forbidden</h1>
      <p className="text-lg text-gray-600 mb-8">
        <strong>You don’t have permission to access this page.</strong> <br />
        Redirecting you to home page in 5 seconds...
      </p>
    </div>
  );
};

export default ForbiddenPage;
