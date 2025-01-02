import { useState, useEffect, useRef, useContext } from "react";
import useSignup from "@hooks/useSignup";
import FormInputField from "@components/form/FormInputField";
import fleetflowLogo from '@assets/logo.png'; 
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

  const inputRef = useRef();
  const navigate = useNavigate();

  const { signup, isLoading } = useSignup();

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
    if (value.trim() === "") {
        error = "This field is required.";
    } else if (InputRedux[name] && !InputRedux[name].regex.test(value)) 
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

    if (!error && name === "email") {
      await checkAvailability(name, value);
  }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

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
      const { firstName, lastName, email, password } = formData;

      const success = await signup(firstName, lastName, email, password, "admin");
      
      if (success)
        navigate('/dashboard');   
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
            />
          <FormInputField
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
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
            disabled={isLoading}
            >
                {isLoading ? "Signing in..." : "Sign up"}
          </button>
          </div>
        </form>
      </div>
  );
};

export default AdminSignUp;