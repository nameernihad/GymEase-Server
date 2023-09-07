const showRequests = (joinTrainerRepo) => async () => {
  const allRequest = await joinTrainerRepo.getAllRequest();

  return {
    allRequest,
  };
};
module.exports = {
  showRequests,
};
