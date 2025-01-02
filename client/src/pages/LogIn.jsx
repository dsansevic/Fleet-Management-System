import axios from "axios";
import { useState, useRef, useEffect } from "react";
import useLogin from "@hooks/UseLogin";
import FormInputField from "@components/form/FormInputField";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [capsLockIsOn, setCapsLockIsOn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, isLoading, error } = useLogin();

  const inputRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const checkCapsLock = (event) => {
    if (event.getModifierState('CapsLock')) {
        setCapsLockIsOn(true);
    } else {
        setCapsLockIsOn(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.email && input.password) {
      const success = await login(input.email, input.password, rememberMe);

      if (success) {
          navigate("/dashboard");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-7 bg-white p-6 rounded-lg shadow-lg relative z-10">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-3xl font-semibold mr-2">Welcome Back!</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <FormInputField
          label="Email"
          name="email"
          type="email"
          placeholder="e.g. john.doe@example.com"
          value={input.email}
          onChange={handleInputChange}
          ref={inputRef}
          required={true}
        />
        <FormInputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={input.password}
          onChange={handleInputChange}
          required={true}
          handleCapsLockOn={checkCapsLock}
        />
        {capsLockIsOn && (
            <p className='text-error text-sm mt-1'>Caps Lock is ON!</p>
        )}
        <div className="flex justify-between items-center mb-4">
        <label htmlFor="rememberMe" className="text-sm">
            <input
                type="checkbox"
                name="rememberMe"
                className="mr-1"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
        </label>
        <span className="text-brand-base text-sm cursor-pointer">Forgot your password?</span>
        </div>
        <p className="text-center mb-4">
          <Link to="/register">
            Don't have an account? <span className="text-brand-base cursor-pointer">Create one</span>
          </Link>
        </p>
        <p className="text-error text-xs mt-1">{error}</p>
        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className="w-fit py-3 px-7 bg-brand-dark hover:bg-brand-light text-white rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
