const { UserModel } = require("../database/userModel");

const adminRepoimpl = (userModel) => {
  const adminfind = async (email) => {
    const admin = await userModel.findOne({ email, isAdmin: true });
    return admin ? admin.toObject() : null;
  };

  return {
    adminfind,
  };
};

module.exports = {
  adminRepoimpl,
};
