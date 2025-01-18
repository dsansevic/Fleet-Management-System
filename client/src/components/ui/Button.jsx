const Button = ({ type= "button", readyToSend = false, onClick, className = "", label}) => (
    <button
        onClick={onClick}
        type={type}
        disabled = {readyToSend}
        className={`className="bg-white text-brand-base px-4 py-2 rounded-2xl shadow shadow-gray-300 hover:bg-gray-50 flex items-center space-x-2 h-10 transition-colors focus:ring-2 focus:ring-gray-100 ${className}`}
    >
        {label}
    </button>
);

export default Button;