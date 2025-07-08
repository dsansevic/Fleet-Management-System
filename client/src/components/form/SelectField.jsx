import { forwardRef } from "react";

const SelectField = forwardRef(
  (
    {
      label,
      name,
      value,
      onChange,
      error,
      options,
      placeholder,
      required = true,
    },
    ref
  ) => {
    return (
      <div className="mb-4 relative w-full">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-brand-dark"
        >
          {label}
          {/* {required && 
                    <span className="text-error" title="This field is required">*</span>} */}
        </label>

        <div className="relative">
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            ref={ref}
            className={`block w-full p-2 sm:p-2.5 text-sm placeholder-italic rounded-md pr-10 shadow
                        ${error ? "border-error" : "border-gray-200"} 
                        border focus:outline-none focus:ring-1 focus:ring-brand-light`}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-error text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

export default SelectField;
