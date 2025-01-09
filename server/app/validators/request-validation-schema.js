
export const requestSchema = {
//   userId: {
//     exists: {
//       errorMessage: "User ID is required.",
//     },
//     isMongoId: {
//       errorMessage: "User ID must be a valid MongoDB ObjectId.",
//     },
//     custom: {
//       options: (value) => {
//         return mongoose.Types.ObjectId.isValid(value);
//       },
//     },
//   },
  petId: {
    exists: {
      errorMessage: "Pet ID is required.",
    },
    isMongoId: {
      errorMessage: "Pet ID must be a valid MongoDB ObjectId.",
    },
    custom: {
      options: (value) => {
        return mongoose.Types.ObjectId.isValid(value);
      },
    },
  },
  phone: {
    exists: {
      errorMessage: "Phone number is required.",
    },
    isString: {
      errorMessage: "Phone number must be a string.",
    },
    notEmpty: {
      errorMessage: "Phone number cannot be empty.",
    },
    isLength: {
        options: { min: 10, max: 10 },
        errorMessage: "Phone number must be exactly 10 digits.",
      },
      matches: {
        options: /^[0-9]{10}$/,
        errorMessage: "Phone number must contain only 10 digits.",
      },
  },
  requestType: {
    exists: {
      errorMessage: "Request type is required.",
    },
    isIn: {
      options: [['temp_adoption', 'walking']],
      errorMessage: "Request type must be either 'temp_adoption' or 'walking'.",
    },
  },
  location: {
    exists: {
      errorMessage: "Location is required.",
    },
    notEmpty: {
      errorMessage: "Location cannot be empty.",
    },
    isString: {
      errorMessage: "Location must be a string.",
    },
    trim: true,
  },
  description: {
    optional: true,
    options: { min: 0, max: 250 },
    isString: {
      errorMessage: "Description must be a string.",
    },
    trim: true,
  },
  startDatetime: {
    exists: {
      errorMessage: "Start date and time are required.",
    },
    custom: {
      options: (value) => {
        // Regular expression to match yyyy-mm-dd and time
        const regex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(Z|[\+\-]\d{2}:\d{2})?)?$/;
        if (!regex.test(value)) {
          throw new Error("Start date and time must be in valid format (yyyy-mm-ddTHH:MM:SSZ or yyyy-mm-dd HH:MM:SS).");
        }
        return true;
      },
    },
  },
  endDatetime: {
    exists: {
      errorMessage: "End date and time are required.",
    },
    custom: {
      options: (value) => {
        // Regular expression to match yyyy-mm-dd and time
        const regex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(Z|[\+\-]\d{2}:\d{2})?)?$/;
        if (!regex.test(value)) {
          throw new Error("End date and time must be in valid format (yyyy-mm-ddTHH:MM:SSZ or yyyy-mm-dd HH:MM:SS).");
        }
        return true;
      },
    },
  },
  status: {
    optional: true,
    isIn: {
      options: [["pending", "approved", "rejected"]],
      errorMessage: "Status must be one of 'pending', 'approved', or 'rejected'.",
    },
    trim: true,
  },
};
