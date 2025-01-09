import User from "../models/user-model.js"; // Adjust the path based on your folder structure

export const profileSchema = {
    // userId: {
    //   exists: {
    //     errorMessage: "User ID is required.",
    //   },
    //   notEmpty: {
    //     errorMessage: "User ID cannot be empty.",
    //   },
    //   custom: {
    //     options: async function (value) {
    //       const user = await User.findById(value);
    //       if (!user) {
    //         throw new Error("User not found.");
    //       }
    //       return true;
    //     },
    //   },
    // },
    profilePic: {
      optional: true, // Allow this field to be optional
      isString: {
        errorMessage: "Profile picture must be a valid string (e.g., a URL).",
      },
      custom: {
        options: (value) => {
          if (!value.endsWith(".jpg")) {
            throw new Error("Profile picture must be a .jpg file.");
          }
          return true;
        },
      },
      trim: true,
    },
    age: {
      optional: true,
      isInt: {
        options: { min: 0 },
        errorMessage: "Age must be a non-negative integer.",
      },
    },
    bio: {
      optional: true,
      isString: {
        errorMessage: "Bio must be a string.",
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
      optional: true,
      isISO8601: {
        errorMessage: "Date of Birth must be a valid date (YYYY-MM-DD).",
      },
    },
    address: {
      optional: true,
      custom: {
        options: (value) => {
          if (value) {
            const { street, city, state, country, postalCode } = value;
            if (
              typeof street !== "string" ||
              typeof city !== "string" ||
              typeof state !== "string" ||
              typeof country !== "string" ||
              typeof postalCode !== "string"
            ) {
              throw new Error("Address fields must be valid strings.");
            }
          }
          return true;
        },
      },
    },
  };
  