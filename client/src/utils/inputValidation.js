export const InputRegex = {
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
      message:
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
    },
    oib: {
      regex: /^\d{11}$/,
      message: "OIB must be 11 digits long."
    }
  };
  const capitalise = (str) => str && str[0].toUpperCase() + str.slice(1);

  export const validateField = (name, value) => {
    const field = InputRegex[name];
    if (!value.trim()) {
      return `${capitalise(name)} is required.`;
    }
    if (field && !field.regex.test(value.trim())) {
      return field.message;
    }

    return null;
  };  