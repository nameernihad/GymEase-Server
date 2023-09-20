const subscriptionRepoimpl = (subscriptionModel) => {
  const createSubscription = async (subscriptionData) => {
    try {
      const startDate = new Date();
      let endDate = new Date(startDate);

      switch (subscriptionData.duration) {
        case "oneMonth":
          endDate.setMonth(endDate.getMonth() + 1);
          break;
        case "sixMonths":
          endDate.setMonth(endDate.getMonth() + 6);
          break;
        case "oneYear":
          endDate.setFullYear(endDate.getFullYear() + 1);
          break;
        default:
          throw new Error("Invalid subscription duration");
      }

      const startDateFormatted = startDate.toLocaleDateString("en-GB", {
        day: "numeric",
      });
      const endDateFormatted = endDate.toLocaleDateString("en-GB", {
        day: "numeric",
      });

      const newSubscription = {
        user: subscriptionData.user,
        trainer: subscriptionData.trainer,
        duration: subscriptionData.duration,
        amount: subscriptionData.amount,
        startDate,
        endDate,
        startDateFormatted,
        endDateFormatted,
      };
      const createdSubscription = await subscriptionModel.create(
        newSubscription
      );

      return createdSubscription;
    } catch (error) {
      throw error;
    }
  };

  return {
    createSubscription,
  };
};

module.exports = {
  subscriptionRepoimpl,
};
