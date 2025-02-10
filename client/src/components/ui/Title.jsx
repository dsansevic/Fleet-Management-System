const Title = ({ children, className = "" }) => (
    <h2 className={`text-4xl font-bold text-brand-darker tracking-tight mb-6 ${className}`}>
        {children}
    </h2>
);

export default Title;