import { useState, useRef, useEffect } from "react";
import Title from "@components/ui/Title";
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
      else if (result.role === "employee"){ 
        navigate("/dashboard-user")}
    }
  
  const isSubmitDisabled = Object.values(input).some((value) => value === "");

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-2xl shadow-md shadow-brand-base relative z-10">
      <button onClick={() => navigate("/")} className="absolute top-0 right-0 text-xl">
        ✖
      </button>
      <div className="text-center mb-6">
        <Title>Welcome Back! 👋</Title>
        <p className="text-gray-600 text-sm">Sign in to access your fleet management dashboard.</p>
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
          <p className="text-error p-2 text-sm rounded-md">⚠️ Caps Lock is ON!</p>
        )}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-brand-dark font-medium hover:text-brand-lighter">
            Create one
          </Link>
        </p>
        <p className="text-error text-sm text-center mt-1">{error}</p>
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