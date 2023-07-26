const bcrypt = require("bcrypt");

const adminLogin = (adminRepo) => async (email, password) => {
  const admin = await adminRepo.adminfind(email);
  if (admin) {
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (isPasswordValid) {
      return admin;
    }
  }
  return null;
};
module.exports = {
  adminLogin,
};
