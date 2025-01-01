import { useState, useEffect, useRef } from "react";
import FormInputField from "@components/form/FormInputField";
import fleetflowLogo from '@assets/logo.png'; 
import axios from "axios";
import { Link } from "react-router-dom";

function AdminSignUp () {
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
    oib:"",
    password: "",
    confirmPassword: "",
    acceptTerms: ""
  });
  const inputRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const InputRedux = {
    email: {
        regex: /^\S+@\S+\.\S+$/,
        message: "Email must be in format username@domain.tld."
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

  const checkAvailability = async (field, value) => {
    try {
        const response = await axios.post('http://localhost:3000/user/check-availability', {
            [field]: value,
        });
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: error.response.data.message,
            }));
        }
    }
};
  const validateInput = (name, value) => {
    let error = "";
    if (value.trim() === "" && name != "oib") {
        error = "This field is required.";
    } else if (InputRedux[name] && value.trim() !== "" && !InputRedux[name].regex.test(value)) 
        error = InputRedux[name].message;

    return error;
  };

  const handleInputChange = async (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    const error = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));

    if (!error && (name === "email" || name === "oib")) {
      await checkAvailability(name, value);
  }
  };

  const handleRegister = async (e) => {
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
        try {
            const response = await axios.post('http://localhost:3000/user/signup', {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              oib: formData.oib || undefined,
              password: formData.password,
            });
            localStorage.setItem('token', response.data.token);
          } catch (error) {
            console.error(error);
          }
    };
}

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
            required={true}
          />
          <FormInputField
            label="Last name"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            required={true}
          />
          <FormInputField
            label="Email"
            name="email"
            type="email"
            placeholder="e.g. john.doe@example.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required={true}
          />
          <FormInputField
            label="OIB"
            name="oib"
            placeholder="11 digits, optional"
            value={formData.oib}
            onChange={handleInputChange}
            required={false}
            error={errors.oib}
          />
          <div className="text-xs mb-2 text-gray-600 bg-gray-100 p-2 border rounded-md">
            <p>Providing your OIB is optional, but it can significantly enhance your experience if 
              you are connected to multiple companies, allowing you to access them without repeated logins. 
              Rest assured, your OIB will be securely stored and processed in compliance with data protection laws (GDPR).</p>
          </div>
          <FormInputField
            label="Password"
            name="password"
            type="password"
            placeholder="Use strong password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required={true}
            />
          <FormInputField
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required={true}
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
                className="text-brand-base cursor-pointer"
                // onClick={() => setShowTermsLink(!showTermsLink)}
              >
                terms and conditions
              </span>.
            </label>
          </div>
          <span className="text-error text-sm">{errors.acceptTerms}</span>
          <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className={`w-fit py-3 px-7 ${!formData.acceptTerms || Object.values(errors).some((error) => error) || formData.password !== formData.confirmPassword
              ? "bg-gray-400 cursor-default"
              : "bg-brand-dark hover:bg-brand-base"} text-white rounded-md`}
          >
            Register
          </button>
          </div>
        </form>
      </div>
  );
};

export default AdminSignUp;