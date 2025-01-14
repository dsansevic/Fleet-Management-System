const BasicInputField = ({ label, name, type, value, error, onChange }) => {
    return (
      <div>
        <label className="block text-gray-700 text-sm">{label}</label>
        <input
            type={type}
            name={name}
            value={type}
            className={`w-full text-sm border p-2 rounded ${error ? "border-error" : ""}`}
            onChange={onChange}
        />
        {error && <p className="text-error text-sm mt-1">{error}</p>}
      </div>
    );
  };
  
export default BasicInputField;