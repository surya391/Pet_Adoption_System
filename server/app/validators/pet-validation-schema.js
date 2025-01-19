
export const petSchema = {
  petName: {
    exists: {
      errorMessage: "Pet name is required.",
    },
    notEmpty: {
      errorMessage: "Pet name cannot be empty.",
    },
    isString: {
      errorMessage: "Pet name must be a string.",
    },
    trim: true,
  },
  petType: {
    in:['body'],
    exists: {
      errorMessage: "Pet name is required.",
    },
    notEmpty: {
      errorMessage: "Pet name cannot be empty.",
    },
    isMongoId: {
      errorMessage: 'id is invalid'
    },
    trim: true,
  },
  petImage: {
    isString: {
      errorMessage: "Pet image must be a valid string (e.g., a URL).",
    },
    custom: {
      options: (value) => {
        if (value && !value.endsWith(".jpg") && !value.endsWith(".jpeg") && !value.endsWith(".png")) {
          throw new Error("Pet image must be a .jpg, .jpeg, or .png file.");
        }
        return true;
      },
    },
    trim: true,
  },
  petAge: {
    exists: {
      errorMessage: "Pet age is required.",
    },
    notEmpty: {
      errorMessage: "Pet age cannot be empty.",
    },
    isInt: {
      options: { min: 0, max: 25 },
      errorMessage: "Pet age must be between 0 and 25 years.",
    },
  },
  gender: {
    exists: {
      errorMessage: "Gender is required.",
    },
    isIn: {
      options: [["male", "female"]],
      errorMessage: "Gender must be 'male' or 'female'.",
    },
    trim: true,
  },
};
