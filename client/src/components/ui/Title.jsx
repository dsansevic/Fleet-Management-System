const Title = ({ children, className = "" }) => (
    <h2 className={`text-3xl font-bold text-gray-900 tracking-tight mb-6 ${className}`}>
        {children}
    </h2>
);

export default Title;