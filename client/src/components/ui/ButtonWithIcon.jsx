const ButtonWithIcon = ({ icon: Icon, label, onClick, color, className = "" }) => (
    <button
        onClick={onClick}
        aria-label={label}
        className={`flex flex-col items-center py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-gray-300 ${className}`}
    >
        {Icon && <Icon className={`h-6 w-6 text-${color}`} />}
        <span className="mt-2">{label}</span>
    </button>
);

export default ButtonWithIcon;