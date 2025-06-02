import { useState, useRef, useEffect } from "react";
import Title from "@components/ui/Title";
import useLogin from "@hooks/useLogin";
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

    if (result.role === "admin") navigate("/dashboard-admin");
    else if (result.role === "employee") {
      navigate("/dashboard-user");
    }
  };

  const isSubmitDisabled = Object.values(input).some((value) => value === "");

  return (
    <div className="w-11/12 sm:max-w-[500px] lg:max-w-[768px] xl:max-w-[900px] mx-auto my-10 px-4 sm:p-6 rounded-base sm:bg-white relative z-10 sm:border border-gray-200">
      <button
        onClick={() => navigate("/")}
        className="hidden sm:block absolute top-4 right-4 text-xl"
      >
        ✖
      </button>

      <div className="flex flex-col md:flex-row gap-2 sm:p-4 justify-between">
        <div className="w-11/12 lg:w-1/2 mx-auto px-6 py-12 flex flex-col justify-center">
          <div className="mb-6">
            <Title className="mb-0 pb-2 sm:text-2xl lg:text-3xl">
              Welcome Back!
            </Title>
            <p className="text-gray-600 text-md md:text-base lg:text-lg">
              Sign in to access your fleet management dashboard
            </p>
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
              autocomplete="current-password"
              value={input.password}
              onChange={handleInputChange}
              onCapsLock={handleCapsLock}
            />
            {capsLockIsOn && (
              <p className="text-error pb-2 text-sm animate-pulse">
                ⚠️ Caps Lock is ON!
              </p>
            )}
            <p className="text-md text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-brand-dark font-medium hover:text-brand-lighter"
              >
                Create one
              </Link>
            </p>
            <p className="text-error text-sm mt-1">{error}</p>
            <div className="mt-4">
              <SubmitButton
                readyToSend={isSubmitDisabled}
                className="rounded-lg"
              >
                {isLoading ? "Logging in..." : "Login"}
              </SubmitButton>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex p-6 lg:w-3/5 justify-center items-center">
          <img
            src="/images/login-illustration.jpg"
            className="w-full max-w-sm lg:max-w-lg object-contain rounded-lg"
            alt="Fleet management illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
