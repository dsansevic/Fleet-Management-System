import { useState, useRef, useEffect } from "react";
import useLogin from "@hooks/UseLogin";
import FormInputField from "@components/form/FormInputField";
import SubmitButton from "@components/ui/SubmitButton";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [capsLockIsOn, setCapsLockIsOn] = useState(false);

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

  const handleCapsLock = (isCapsOn) => {
    setCapsLockIsOn(isCapsOn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitDisabled) return;

      const result = await login(input.email, input.password);
      
      if (result.role === "admin")
        navigate("/dashboard-admin") 
      else if (result.role === "user"){ 
        navigate("/dashboard-user")}
    }
  
  const isSubmitDisabled = Object.values(input).some((value) => value === "");

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
          placeholder="e.g. john.smith@example.com"
          value={input.email}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <FormInputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={input.password}
          onChange={handleInputChange}
          onCapsLock={handleCapsLock}
        />
        {capsLockIsOn && (
            <p className='text-error text-sm mt-1'>Caps Lock is ON!</p>
        )}
        <span className="text-brand-base text-sm cursor-pointer">Forgot your password?</span>
        <p className="text-center mb-4">
          <Link to="/signup">
            Don't have an account? <span className="text-brand-base cursor-pointer">Create one</span>
          </Link>
        </p>
        <p className="text-error text-xs mt-1">{error}</p>
        <div className="flex justify-center items-center mt-4">
          <SubmitButton readyToSend={isSubmitDisabled}>
            {isLoading ? "Logging in..." : "Login"}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default LogIn;