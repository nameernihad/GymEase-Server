const validation = (joinTrainerRepo) => async (validationDetails) => {
  const validate = await joinTrainerRepo.validation(validationDetails);

  return {
    validate,
  };
};
module.exports = {
  validation,
};
