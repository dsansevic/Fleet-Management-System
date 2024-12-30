import { forwardRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

function FormInputField({ 
  label,
  name, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  required, 
  handleCapsLockOn
}, ref) {
  const [showPassword, setShowPasswod] = useState(false);

  return (
    <div className="mb-2 relative">
      <label htmlFor={name} className="block text-sm font-medium text-brand-dark">
        {label} {label && required && <span className="text-red-500" title="This field is required">*</span>}
      </label>
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full p-2 text-sm placeholder-italic  ${error ? 'border-error' : 'border-gray-300'} border rounded-md pr-10`} // pr-10 dodaje prostor za ikonu
          ref={ref}
          required={required}
          onKeyUp={handleCapsLockOn}
          aria-required="true"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPasswod(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
}

export default forwardRef(FormInputField);
