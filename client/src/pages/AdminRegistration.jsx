import { useState, useEffect, useRef } from "react";
import FormInputField from "../components/FormInputField";
import fleetflowLogo from '../assets/logo.png'; 

function Register () {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    oib: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    oib: "",
    password: "",
    confirmPassword: "",
    acceptTerms: ""
  });
  const inputRef = useRef();
  const [showOIBExplanation, setShowOIBExplanation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const InputRedux = {
    email: {
        regex: /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/,
        message: "Email must be in format username@domain.tld and contain only letters (A-Z, a-z)."
    },
    firstName: {
        regex: /^[A-Za-z\u00C0-\u00FF\u0100-\u017F]+(?:[-'\s][A-Za-z\u00C0-\u00FF\u0100-\u017F]+)*$/,
        message: "Please enter your first name."
      },      
    lastName: {
        regex: /^[A-Za-z\u00C0-\u00FF\u0100-\u017F]+(?:[-'\s][A-Za-z\u00C0-\u00FF\u0100-\u017F]+)*$/,
        message: "Please enter your surname."
    },
    oib: {
        regex: /^\d{11}$/,
        message: "Please enter a valid OIB (11 digits)."
    },
    password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        message: "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
    }
  };

  const validateInput = (name, value) => {
    let error = "";
    if (value.trim() === "") {
        error = "This field is required.";
    } else if (InputRedux[name] && !InputRedux[name].regex.test(value)) 
        error = InputRedux[name].message;

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const error = validateInput(name, value);

    if (type === "checkbox") {
        setFormData((prevState) => ({
          ...prevState,
          [name]: checked, 
        })); 
        return;
    }
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    if (!formData.acceptTerms) {
      setErrors((prevState) => ({
        ...prevState,
        acceptTerms: "You must accept the terms and conditions."
      }));
      return;
    } 
    else {
      setErrors((prevState) => ({
        ...prevState,
        acceptTerms: ""
      }));
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match."
      }));
      return;
    }

    if (!Object.values(errors).some((error) => error) && formData.acceptTerms) {
      console.log(formData);

      // povezivanje s backendom
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-7 bg-white p-6 rounded-lg shadow-lg relative z-10">
       <div className="flex items-center justify-center mb-4">
          <h2 className="text-3xl font-semibold mr-2">Sign up to </h2>
            {/* dodat klik na logo  */}
          <img src={fleetflowLogo} alt="FleetFlow Logo" className="w-40 cursor-pointer" />
        </div>
        <p className="text-center mb-2">Already have an account? <span className="text-linkText cursor-pointer">Log in</span></p>
        <form onSubmit={handleRegister}>
          <FormInputField
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            ref={inputRef}
          />
          <FormInputField
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
          <FormInputField
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <span
            className="text-linkText cursor-pointer text-sm"
            onClick={() => setShowOIBExplanation(!showOIBExplanation)}
          >
            Why do we need your OIB?
          </span>
          <div className="text-sm mb-2">
            {showOIBExplanation && (
              <div className="mt-2 text-gray-600 bg-gray-100 p-3 border border-gray-300 rounded-md">
                <p className="font-semibold">Why do we need your OIB?</p>
                <p>Your OIB is required to ensure the uniqueness of your account. It helps us avoid duplicate accounts and ensures efficient management within the system. Rest assured, your OIB will be securely stored and processed in compliance with data protection laws (GDPR).</p>
              </div>
            )}
          </div>
          <FormInputField
            name="oib"
            placeholder="OIB"
            value={formData.oib}
            onChange={handleInputChange}
            error={errors.oib}
          />
          <FormInputField
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            />
          <FormInputField
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            />
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
                className="text-linkText cursor-pointer"
                // onClick={() => setShowTermsLink(!showTermsLink)}
              >
                terms and conditions
              </span>.
            </label>
          </div>
          <span className="text-errorText text-sm">{errors.acceptTerms}</span>

          <button
            type="submit"
            className={`w-full py-3 ${!formData.acceptTerms || Object.values(errors).some((error) => error) || formData.password !== formData.confirmPassword
              ? "bg-gray-400"
              : "bg-linkText hover:bg-blue-600"} text-white rounded-md`}
          >
            Register
          </button>
        </form>
      </div>
  );
};

export default Register;
