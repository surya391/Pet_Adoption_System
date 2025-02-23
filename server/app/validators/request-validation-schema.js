
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
    in: ['body'], // Define where the field exists (e.g., 'body')
    exists: {
      errorMessage: "Pet ID is required.",
    },
    isMongoId: {
      errorMessage: "Pet ID must be a valid MongoDB ObjectId.",
    },
  },
  phone: {
    exists: {
      errorMessage: "Phone number is required.",
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
    notEmpty: {
      errorMessage: "Pet request type cannot be empty.",
    },
    isMongoId: {
      errorMessage: 'id is invalid'
    },
    trim : true
  },
  // location: {
  //   exists: {
  //     errorMessage: "Location is required.",
  //   },
  //   notEmpty: {
  //     errorMessage: "Location cannot be empty.",
  //   },
  //   isString: {
  //     errorMessage: "Location must be a string.",
  //   },
  //   trim: true,
  // },
  description: {
    in: ['body'],
    optional: true, 
    isString: {
      errorMessage: "Description must be a string",
    },
  },
  startDatetime: {
    in: ["body"],
    custom: {
      options: (value) => {
        const inputDate = new Date(value);
        const today = new Date();
        
        today.setHours(0, 0, 0, 0); // Reset time to compare only the date
  
        return (
          (!isNaN(Date.parse(value)) || 
          /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) &&
          inputDate >= today
        );
      },
      errorMessage:
        "Start date and time must be in a valid format (yyyy-mm-ddTHH:MM:SSZ or yyyy-mm-dd HH:MM:SS) and cannot be in the past.",
    },
  },
  
  // endDatetime: {
  //   in: ['body'],
  //   custom: {
  //     options: (value) => {
  //       return (
  //         !isNaN(Date.parse(value)) ||
  //         /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value) // Validate "yyyy-mm-dd HH:MM:SS" ; it can be interally same in the UTC formate.
  //       );
  //     },
  //     errorMessage:
  //       "End date and time must be in valid format (yyyy-mm-ddTHH:MM:SSZ or yyyy-mm-dd HH:MM:SS).",
  //   }
  // },
  endDatetime: {
  in: ['body'],
  custom: {
    options: (value, { req }) => {
      const start = new Date(req.body.startDatetime);
      const end = new Date(value);
      return end > start;
    },
    errorMessage: "End datetime must be after start datetime.",
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
  amount: {
    in: ["body"],
    exists: {
      errorMessage: "Amount is required.",
    },
    isNumeric: {
      errorMessage: "Amount must be a number.",
    },
    custom: {
      options: (value) => value >= 0,
      errorMessage: "Amount must be a positive number.",
    },
  },
  
};
