const userUpdate = (userRepository) => async (userId, userDetails) => {
  const updatedData = await userRepository.UpdatedUser(userId, userDetails);

  if (updatedData) {
    return updatedData;
  }
  return null;
};

module.exports = {
  userUpdate,
};
