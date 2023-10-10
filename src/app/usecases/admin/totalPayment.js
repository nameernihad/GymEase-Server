const totalPayment = (subscriptionRepo) => async () => {
    paymentdetails = await subscriptionRepo.totalPayment();
    return paymentdetails;
  };
  module.exports = {
    totalPayment,
  };
  