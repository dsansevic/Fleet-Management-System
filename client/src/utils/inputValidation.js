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
    },
    brand: {
      regex: /^[A-Za-z0-9\s-]+$/,
      message: "Brand can contain letters, numbers, spaces, and dashes."
    },
    model: {
      regex: /^[A-Za-z0-9\s-]+$/,
      message: "Model can contain letters, numbers, spaces, and dashes."
    },
    licensePlate: {
      regex: /^[A-Za-z0-9-]{4,10}$/,
      message: "License plate must be between 4 and 10 characters long and can contain letters, numbers, and dashes."
    },
    capacity: {
      regex: /^[1-50]\d*$/,
      message: "Capacity must be a positive number."
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