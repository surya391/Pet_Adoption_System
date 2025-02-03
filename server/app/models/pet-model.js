import { Schema, model } from "mongoose";

const PetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    petName: {
      type: String,
      required: true
    },
    petType: {
      type: String,
      // type: Schema.Types.ObjectId,
      // ref: "PetType",
      required: true
    },
    petImage: {
      type: String,
      required: true
    },
    petAge: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
  },
  { timestamps: true }
);

const Pet = model('Pet', PetSchema);
export default Pet;