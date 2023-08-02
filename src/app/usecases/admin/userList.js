const UserList = (userRepo) => async () => {
  userdetails = await userRepo.find();
  return userdetails;
};

const BockUser = (userRepo) => async (userId, status) => {
  if (status === "Block") {
    const updatedUser = await userRepo.BlockingUser(userId);
    return updatedUser;
  } else if (status === "Unblock") {
    const updatedUser = await userRepo.UnBlockingUser(userId);
    return updatedUser;
  }
};

const showUserById = (userRepo) => async (userId) => {
  console.log(userId, "usecase id");
  const singleUser = await userRepo.getUserById(userId);
  console.log(singleUser, "usecase user");
  if (singleUser) {
    return singleUser;
  }
};
module.exports = {
  UserList,
  BockUser,
  showUserById,
};
