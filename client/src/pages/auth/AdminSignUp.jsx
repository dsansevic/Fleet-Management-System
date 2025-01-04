import { useState, useEffect, useRef, useContext } from "react";
import useSignup from "@hooks/useSignup";
import FormInputField from "@components/form/FormInputField";
import SubmitButton from "@components/form/SubmitButton";
import fleetflowLogo from '@assets/logo.png'; 
import { validateField } from "@utils/inputValidation";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminSignUp () {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: ""
  });
  const [capsLockIsOn, setCapsLockIsOn] = useState(false);

  const inputRef = useRef();
  const navigate = useNavigate();

  const { signup, isLoading } = useSignup();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const checkAvailability = async (value) => {
    try {
        const response = await axios.post('http://localhost:3000/user/check-availability', {
            oib: value,
        });
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                oib: error.response.data.message,
            }));
        }
    }
  };

  const handleInputChange = async (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));

    if (name === "password" || name === "confirmPassword") {
      const passwordsMismatch =
          (name === "password" && formData.confirmPassword && value !== formData.confirmPassword) ||
          (name === "confirmPassword" && value !== formData.password);

      setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: passwordsMismatch ? "Passwords do not match." : ""
      }));
    }
    
    if (!error && name === "email") {
      await checkAvailability(value);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrors((prevState) => ({
      ...prevState,
      acceptTerms: formData.acceptTerms
        ? ""
        : "You must accept the terms and conditions."
    }));

    if (notReadyToSend) return 
    
    const { firstName, lastName, email, password } = formData;

    const success = await signup(firstName, lastName, email, password, "admin");
    
    if (success)
      navigate('/dashboard');   
  }
  const handleCapsLock = (isCapsOn) => {
    setCapsLockIsOn(isCapsOn);
  };

  const hasErrors = Object.values(errors).some((error) => error);
  const hasEmptyFields = Object.values(formData).some((value) => value === "");
  const passwordsMismatch = formData.password !== formData.confirmPassword;
  const isSubmitDisabled = hasErrors || hasEmptyFields || passwordsMismatch;
  const notReadyToSend = isSubmitDisabled || !formData.acceptTerms

  return (
    <div className="max-w-md mx-auto my-7 bg-white p-6 rounded-lg shadow-lg relative z-10">
       <div className="flex items-center justify-center mb-2">
          <h1 className="text-3xl font-semibold mr-2">Sign up to </h1>
          <Link to="/" >
            <img src={fleetflowLogo} alt="FleetFlow" className="w-40 cursor-pointer" />
          </Link>
        </div>
        <p className="text-center mb-2">Already have an account? 
        <Link to="/login">
          <span className="text-brand-base cursor-pointer"> Log in</span>
        </Link>
        </p>
        <form onSubmit={handleRegister}>
          <FormInputField
            label="First name"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            ref={inputRef}
          />
          <FormInputField
            label="Last name"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
          <FormInputField
            label="Email"
            name="email"
            type="email"
            placeholder="e.g. john.doe@example.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <FormInputField
            label="Password"
            name="password"
            type="password"
            placeholder="Use strong password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            onCapsLock={handleCapsLock}
            />
          <FormInputField
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            onCapsLock={handleCapsLock}
            />
          {capsLockIsOn && (
            <p className='text-error text-sm mt-1'>Caps Lock is ON!</p>
          )}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label className="text-sm">
              I agree to the{" "}
              <span
                className="text-brand-base cursor-pointer"
                // onClick={() => setShowTermsLink(!showTermsLink)}
              >
                terms and conditions
              </span>.  <span className="text-error" title="This field is required">*</span>
            </label>
          </div>
          <p className="text-error text-sm">{errors.acceptTerms}</p>
          <div className="flex justify-center items-center mt-4">
            <SubmitButton readyToSend={notReadyToSend}>
              {isLoading ? "Signing in..." : "Sign up"}
            </SubmitButton>
          </div>
        </form>
      </div>
  );
};

export default AdminSignUp;