import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForbiddenImage from '@assets/forbidden.png';

const ForbiddenPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
            <img
                src={ForbiddenImage}
                alt="403 Forbidden"
                className="w-64 h-auto mb-6"
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                403 - Forbidden
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                You don’t have permission to access this page. <br />
                Redirecting you to the home page in 5 seconds...
            </p>
        </div>
    );
};

export default ForbiddenPage;
