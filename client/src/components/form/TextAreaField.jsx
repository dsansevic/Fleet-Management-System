const TextAreaField = ({ label, name, value, onChange, placeholder, rows = 4 }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-brand-dark">
                {label}
            </label>
            <textarea
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 block p-1 w-full rounded-md shadow-sm shadow-gray-300 focus:ring-brand-base focus:border-brand-base sm:text-sm"
            />
        </div>
    );
};

export default TextAreaField;