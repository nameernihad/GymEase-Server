const singleUser = (userRepository) => async (userId) => {
  console.log(userId, "usecase");
  const user = await userRepository.getUserById(userId);

  if (user) {
    return user;
  }
  return null;
};

module.exports = {
  singleUser,
};
