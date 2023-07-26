// validation.js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;

const isEmailValid = (email) => emailRegex.test(email);
const isPhoneValid = (phone) => phoneRegex.test(phone);

const validatename = (name) => {
  if (!name) {
    return "name is required.";
  }
  if (name.length < 3) {
    return "name must be at least 3 characters long.";
  }
  return null;
};

const validateEmail = (email) => {
  if (!email || !isEmailValid(email)) {
    return "Invalid email format.";
  }
  return null;
};

const validatePassword = (password) => {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return null;
};

const validatePhone = (phone) => {
  if (!phone || !isPhoneValid(phone)) {
    return "Invalid phone number format.";
  }
  return null;
};

const validateSignupData = (data) => {
  const { name, email, password, phone } = data;
  const errors = [];

  const nameError = validatename(name);
  if (nameError) {
    errors.push(nameError);
  }

  const emailError = validateEmail(email);
  if (emailError) {
    errors.push(emailError);
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.push(passwordError);
  }

  const phoneError = validatePhone(phone);
  if (phoneError) {
    errors.push(phoneError);
  }

  return errors;
};

module.exports = {
  validateSignupData,
};
