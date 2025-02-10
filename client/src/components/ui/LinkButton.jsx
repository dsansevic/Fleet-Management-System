import { Link } from "react-router-dom";

const LinkButton = ({ to, children, className = "" }) => (
    <Link
        to={to}
        className={`inline-block py-3 px-4 border border-gray-200 text-gray-700 mt-2 text-sm font-medium rounded-2xl hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-100 ${className}`}
    >
        {children}
    </Link>
);

export default LinkButton;