const setNewPassword = (userRepository) => async (userId, password) => {
  const upatedUser = await userRepository.PasswordReset(userId, password);
  if (upatedUser) {
    console.log(upatedUser);
    return upatedUser;
  }
  return null;
};

module.exports = {
  setNewPassword,
};
