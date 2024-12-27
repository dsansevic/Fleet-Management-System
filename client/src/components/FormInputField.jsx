import { forwardRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

function FormInputField({ 
  name, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
}, ref) {

  const [showPassword, setShowPasswod] = useState(false);

  return (
    <div className="mb-3 relative">
      <input
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2.5 text-sm border border-gray-300 rounded-md"
        ref={ref}
        required
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPasswod(!showPassword)}
          className="absolute right-3 top-3 text-gray-500"
        >
          {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        </button>
      )}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}

export default forwardRef(FormInputField);
