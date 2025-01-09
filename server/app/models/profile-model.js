import { Schema, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    profilePic: {
      type: String,
    },
    age: {
      type: Number,
      min: 0, // Ensure age cannot be negative
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      postalCode: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Profile = model('Profile', ProfileSchema);
export default Profile;
