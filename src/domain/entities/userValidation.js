const AppError = require("../../utilis/error");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const isEmailValid = (email) => emailRegex.test(email);
const isPhoneValid = (phone) => phoneRegex.test(phone);
const isPasswordValid = (password) => passwordRegex.test(password);

const validateName = (name) => {
  if (name.trim().length < 3) {
    throw new AppError("Name must be at least 3 characters long.", 400);
  }
};

const validateEmail = (email) => {
  if (!isEmailValid(email)) {
    throw new AppError("Invalid email format.", 400);
  }
};

const validatePassword = (password) => {
  if (password.trim().length < 6) {
    throw new AppError("Password must be at least 6 characters long.", 400);
  }

  if (!isPasswordValid(password)) {
    throw new AppError(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).",
      400
    );
  }
};

const validatePhone = (phone) => {
  if (!isPhoneValid(phone)) {
    throw new AppError("Invalid phone number format.", 400);
  }
};

const validateSignupData = async (name, email, phone, password) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  validatePhone(phone);
};

const validateLoginData = (data) => {
  const { email, password } = data;
  validateEmail(email);
  validatePassword(password);
};

module.exports = { validateSignupData, validateLoginData };
