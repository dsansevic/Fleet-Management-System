const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  maxlength,
  ref,
}) => {
  return (
    <div className="mb-4 relative">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-brand-darker"
      >
        {label}
      </label>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxlength}
        className="mt-1 block p-1 w-full border border-gray-200 rounded-md shadow-sm shadow-gray-200 focus:ring-1 focus:ring-brand-light outline-none sm:text-sm"
      />
      {maxlength && (
        <div
          className={`text-sm mt-1 text-right ${
            value?.length == maxlength ? "text-red-300" : "text-gray-300"
          }`}
        >
          {value?.length || 0}/{maxlength}
        </div>
      )}
    </div>
  );
};

export default TextAreaField;
