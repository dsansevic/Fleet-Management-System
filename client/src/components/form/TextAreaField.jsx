const TextAreaField = ({ label, name, value, onChange, placeholder, rows = 4, ref }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-brand-darker">
                {label}
            </label>
            <textarea
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 block p-1 w-full border border-gray-200 rounded-md shadow-sm shadow-gray-200 focus:ring-1 focus:ring-brand-light outline-none sm:text-sm"
            />
        </div>
    );
};

export default TextAreaField;