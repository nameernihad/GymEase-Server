const { UserModel } = require("../database/userModel");

const trainerRepoimpl = (userModel) => {
  const trainerfind = async (email) => {
    const trainer = await userModel.findOne({ email, isTrainer: true });
    return trainer ? trainer.toObject() : null;
  };

  return {
    trainerfind,
  };
};

module.exports = {
  trainerRepoimpl,
};
