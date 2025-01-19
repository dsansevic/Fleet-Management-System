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
  onCapsLock,
  required = true
}, ref) {
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyUp = (e) => {
    if (onCapsLock && e.getModifierState('CapsLock')) {
      onCapsLock(true);
    } else if (onCapsLock) {
      onCapsLock(false);
    }
  };

  return (
    <div className="mb-4 relative w-full">
      <label htmlFor={name} className="block text-sm font-medium text-brand-darker">
        {label} 
        {required &&  <span className="text-brand-darker" title="This field is required">*</span>}
      </label>

      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`block w-full p-2 sm:p-2.5 text-sm placeholder-italic rounded-md pr-10 shadow
            ${error ? 'border-error' : 'border-gray-200'} 
            border focus:outline-none focus:ring-1 focus:ring-brand-light`}
          ref={ref}
          required= {required}
          onKeyUp={handleKeyUp}
          aria-required="true"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && <p id={`${name}-error`} className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
}

export default forwardRef(FormInputField);
