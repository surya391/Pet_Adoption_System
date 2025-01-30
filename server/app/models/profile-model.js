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
    address : {
      buildingNo: String,
      street: String,
      city : String,
      state : String,
      country : String,
      pincode : Number,
      latitude : Number,
      longitude : Number
  },
  },
  { timestamps: true }
);

const Profile = model('Profile', ProfileSchema);
export default Profile;
