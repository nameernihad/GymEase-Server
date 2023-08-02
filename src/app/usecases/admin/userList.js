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
module.exports = {
  UserList,
  BockUser,
};
