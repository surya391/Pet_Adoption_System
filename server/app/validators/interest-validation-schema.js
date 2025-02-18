export const interestValidationSchema = {
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

  export const requestId = {
    in: ["query"],
    exists: {
      errorMessage: "Request ID is required.",
    },
    isMongoId: {
      errorMessage: "Invalid Request ID format. Must be a valid MongoDB ObjectID.",
    },
  }
  