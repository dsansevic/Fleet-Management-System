import { useState, useRef, useEffect } from "react";
import Title from "@components/ui/Title";
import FormInputField from "@components/form/FormInputField";
import SubmitButton from "@components/ui/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";
import { validateField } from "@utils/inputValidation";
import ErrorMessage from "@components/ui/ErrorMessage";
import { publicApiClient, apiClient } from "@api/apiClient";

function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
  });

  const [userErrors, setUserErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const [capsLockIsOn, setCapsLockIsOn] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCapsLock = (isCapsOn) => setCapsLockIsOn(isCapsOn);

  const hasErrors = Object.values(userErrors).some((error) => error);
  const hasEmptyFields = Object.values(userData).some((value) => value === "");
  const isSubmitDisabled = hasErrors || hasEmptyFields;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiClient.post(
        "/user/admin-company-signup",
        userData
      );
      setSignUpError("");
      dispatch({ type: "LOGIN", payload: response.data.user });
      navigate("/dashboard-admin");
    } catch (error) {
      console.error("Error during registration:", error);

      setSignUpError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setUserErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "email" && !error) {
      await checkAvailability(value);
    }
  };
  const checkAvailability = async (value) => {
    try {
      await publicApiClient.post("/user/check-availability", {
        email: value,
      });
    } catch (error) {
      if (error.response?.status === 400) {
        setUserErrors((prev) => ({
          ...prev,
          email: error.response.data.message,
        }));
      }
    }
  };

  return (
    <div className="w-11/12 sm:max-w-[500px] lg:max-w-[900px] mx-auto my-10 px-4 sm:p-6 rounded-xl sm:bg-white relative z-10 sm:border border-gray-200">
      <button
        onClick={() => navigate("/")}
        className="hidden sm:block absolute top-4 right-4 text-xl"
      >
        ✖
      </button>

      <div className="flex flex-col md:flex-row sm:p-4 justify-between">
        <div className="hidden lg:flex p-6 lg:w-3/5 justify-center items-center h-max">
          <img
            src="/images/signup-illustration.png"
            className="w-full max-w-sm lg:max-w-lg object-contain rounded-lg"
            alt="Fleet management illustration"
          />
        </div>
        <div className="p-6 w-11/12 lg:w-1/2 mx-auto px-6 flex flex-col justify-center h-max">
          <Title className="sm:text-2xl lg:text-3xl">Sign Up</Title>

          {signUpError && (
            <ErrorMessage
              message={signUpError}
              onClose={() => setSignUpError("")}
            />
          )}

          <form onSubmit={handleSubmit} className="w-full">
            <FormInputField
              label="First Name"
              name="firstName"
              placeholder="e.g. Ana"
              value={userData.firstName}
              onChange={handleInputChange}
              error={userErrors.firstName}
              ref={inputRef}
            />
            <FormInputField
              label="Last Name"
              name="lastName"
              placeholder="e.g. Horvat"
              value={userData.lastName}
              onChange={handleInputChange}
              error={userErrors.lastName}
            />
            <FormInputField
              label="Email"
              name="email"
              placeholder="e.g. ana@example.com"
              value={userData.email}
              onChange={handleInputChange}
              error={userErrors.email}
            />
            <FormInputField
              label="Company Name"
              name="companyName"
              placeholder="Enter company name"
              value={userData.companyName}
              onChange={handleInputChange}
              error={userErrors.companyName}
            />
            <FormInputField
              label="Password"
              name="password"
              type="password"
              placeholder="Use strong password"
              autocomplete="new-password"
              value={userData.password}
              onChange={handleInputChange}
              error={userErrors.password}
              onCapsLock={handleCapsLock}
            />
            {capsLockIsOn && (
              <p className="text-error text-sm mt-1">Caps Lock is ON!</p>
            )}

            <div className="text-center">
              <p className="text-error text-sm mt-1">{errorAlert}</p>
              <SubmitButton readyToSend={isSubmitDisabled && !isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
