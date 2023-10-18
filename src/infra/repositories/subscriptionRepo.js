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

  const findSubscription = async (trainerId) => {
    try {
      // Find all subscriptions and populate "user" and "trainer" fields
      const subscriptions = await subscriptionModel
        .find()
        .populate("user")
        .populate("trainer")
        .exec();

      // Filter the subscriptions based on the condition
      const filteredSubscriptions = subscriptions.filter((subscription) => {
        return (
          subscription.trainer.user._id.toString() === trainerId.toString()
        );
      });

      return filteredSubscriptions;
    } catch (error) {
      throw error;
    }
  };

  const totalPayment =  async () => {
    try {
    const data = await subscriptionModel.find();

    const totalSum = data.reduce((acc, item) => acc + item.amount, 0);

    return totalSum 
    } catch (error) {
      throw error;
    }
  }
  const calculateSubAmount =  async (trainerId) => {
    try {
     const subscriptions = await subscriptionModel
     .find()
     .populate("trainer")
     .exec();

   const filteredSubscriptions = subscriptions.filter((subscription) => {
     return (
       subscription.trainer.user._id.toString() === trainerId.toString()
     );
   });

   const totalSum = filteredSubscriptions.reduce((acc, item) => acc + item.amount, 0);

   return totalSum 
    } catch (error) {
      throw error;
    }
  }

  const durationCount =  async (trainerId) => {
    try {
      const subscriptions = await subscriptionModel
            .find()
            .populate("trainer")
            .exec();

        const filteredSubscriptions = subscriptions.filter((subscription) => {
            return (
                subscription.trainer.user._id.toString() === trainerId.toString()
            );
        });

        const oneMonthCount = filteredSubscriptions.filter(subscription => subscription.duration === 'oneMonth').length;
        const sixMonthCount = filteredSubscriptions.filter(subscription => subscription.duration === 'sixMonths').length;
        const oneYearCount = filteredSubscriptions.filter(subscription => subscription.duration === 'oneYear').length;

        const response = {
            oneMonth: oneMonthCount,
            sixMonths: sixMonthCount,
            oneYear: oneYearCount,
        };

       return response
    } catch (error) {
      throw error;

    }
  }

  const getAllSubscriptions = async () => {
    try {
      const subscriptions = await subscriptionModel
      .find()
      .populate("user")
      .populate({
          path: "trainer",
          populate: {
              path: "user",
          },
      })
      .exec();

      return subscriptions;
    } catch (error) {
      throw error;
    }
  };

  return {
    createSubscription,
    findSubscription,
    totalPayment,
    calculateSubAmount,
    durationCount,
    getAllSubscriptions
  };
};

module.exports = {
  subscriptionRepoimpl,
};
