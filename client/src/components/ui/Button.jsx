const Button = ({ label, onClick, className = ""}) => (
    <button
        onClick={onClick}
        className={`w-fit py-2 px-5 mt-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-100 ${className}`}
    >
        {label}
    </button>
);

export default Button;