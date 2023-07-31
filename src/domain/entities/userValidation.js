const { UserRepoImpl } = require("../../infra/repositories/userRepo");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;

const isEmailValid = (email) => emailRegex.test(email);
const isPhoneValid = (phone) => phoneRegex.test(phone);

const validatename = (name) => {
  if (name.length < 3) {
    return "Name must be at least 3 characters long.";
  }
  return null;
};

const validateEmail = (email) => {
  if (!isEmailValid(email)) {
    return "Invalid email format.";
  }
  return null;
};

const validatePassword = (password) => {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return null;
};

const validatePhone = (phone) => {
  if (!isPhoneValid(phone)) {
    return "Invalid phone number format.";
  }
  return null;
};

const validateSignupData = async (data) => {
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
const validateLoginData = (data) => {
  const { email, password } = data;
  const errors = [];

  const emailError = validateEmail(email);
  if (emailError) {
    errors.push(emailError);
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.push(passwordError);
  }

  return errors;
};

module.exports = {
  validateSignupData,
  validateLoginData,
};
