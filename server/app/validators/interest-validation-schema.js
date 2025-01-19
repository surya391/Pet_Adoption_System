export const interestValidationSchema = {
    // providerId: {
    //   in: ["body"],
    //   exists: {
    //     errorMessage: "Provider ID is required.",
    //   },
    //   isMongoId: {
    //     errorMessage: "Invalid Provider ID format. Must be a valid MongoDB ObjectID.",
    //   },
    // },
    requestId: {
      in: ["body"],
      exists: {
        errorMessage: "Request ID is required.",
      },
      isMongoId: {
        errorMessage: "Invalid Request ID format. Must be a valid MongoDB ObjectID.",
      },
    },
    status: {
      in: ["body"],
      optional: true, 
      isIn: {
        options: [["accepted", "rejected", "pending"]],
        errorMessage: "Status must be one of: 'accepted', 'rejected', or 'pending'.",
      },
    },
  };
  