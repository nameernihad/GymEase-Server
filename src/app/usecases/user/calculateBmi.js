const BMIcalculate = (userRepository) => async (userId) => {
    const BMI = await userRepository.calculatingBMI(userId);
  
    if (BMI) {
      return BMI;
    }
    return null;
  };
  
  module.exports = {
    BMIcalculate,
  };