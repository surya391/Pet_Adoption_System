export const profileSchema = {
  bio: {
    // optional: true,
    in: ['body'],
    exists: {
      errorMessage: "bio is required.",
    },
    isLength: {
      options: { max: 500 },
      errorMessage: "Bio cannot exceed 500 characters.",
    },
    trim: true,
  },
  gender: {
    exists: {
      errorMessage: "Gender is required.",
    },
    isIn: {
      options: [["male", "female", "other"]],
      errorMessage: "Gender must be 'male', 'female', or 'other'.",
    },
    trim: true,
  },
  dateOfBirth: {
    isISO8601: {
      errorMessage: "Date of Birth must be a valid date (YYYY-MM-DD).",
    },
  },
  "address.buildingNo": {// for validating nested object 
    in: ['body'],
    exists: {
      errorMessage: "Building number filed is required"
    },
    notEmpty: {
      errorMessage: "Building number filed should not be empty"
    },
    trim: true
  },
  "address.street": {
    in: ['body'],
    exists: {
      errorMessage: "Street filed is required"
    },
    notEmpty: {
      errorMessage: "Street filed should not be empty"
    },
    trim: true
  },
  "address.city": {
    in: ['body'],
    exists: {
      errorMessage: "city field is required"
    },
    notEmpty: {
      errorMessage: "City field should not be empty"
    },
    trim: true
  },
  "address.state": {
    in: ['body'],
    exists: {
      errorMessage: "State filed is required"
    },
    notEmpty: {
      errorMessage: "State filed should not be empty"
    },
    trim: true
  },
  "address.country": {
    exists: {
      errorMessage: "Country filed is required"
    },
    notEmpty: {
      errorMessage: "Country filed should not be empty"
    },
    trim: true
  },
  "address.pincode": {
    in: ["body"],
    exists: {
      errorMessage: "Pincode is required"
    },
    notEmpty: {
      errorMessage: "Pincode should not be empty"
    },
    trim: true,
    isNumeric: {
      options: {
        no_symbols: true,
      },
      errorMessage: "Pincode should consist only number"
    },
    isLength: {
      options: {
        min: 6,
        max: 6
      },
      errorMessage: "Pincode should be 6 digits"
    }
  }
}

