const UserList = (userRepo) => async () => {
  userdetails = await userRepo.find();
  return userdetails;
};

const BockUser = (userRepo) => async (userId) => {
  const updatedUser = await userRepo.BlockingUser(userId);
  return updatedUser;
};

const showUserById = (userRepo) => async (userId) => {
  const singleUser = await userRepo.getUserById(userId);
  if (singleUser) {
    return singleUser;
  }
};
module.exports = {
  UserList,
  BockUser,
  showUserById,
};
