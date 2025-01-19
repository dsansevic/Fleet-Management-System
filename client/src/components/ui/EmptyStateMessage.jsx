import { Link } from "react-router-dom";

const EmptyStateMessage = ({ icon = "ⓘ", title, message, link }) => {
    return (
        <div className="flex flex-col items-center justify-center text-gray-500 text-lg text-center p-10 mt-5 bg-gray-50 rounded-xl shadow-sm">
            <span className="text-4xl mb-2">{icon}</span>
            <span className="font-semibold text-gray-700 mb-1">{title}</span>
            <span className="text-sm text-gray-500 text-center">
                {message}
            </span>
            {link && (
                <Link to={link.to} className="mt-3 text-brand-dark hover:text-brand-base font-sm">
                    {link.text}
                </Link>
            )}
        </div>
    );
};

export default EmptyStateMessage;