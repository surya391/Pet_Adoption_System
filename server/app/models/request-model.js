import { Schema, model } from "mongoose";

const RequestSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    phone: { type: Number, required: true },
    // requestType: { type: String, enum: ['temp_adoption', 'walking'], required: true },
    requestType:{
      type: Schema.Types.ObjectId ,
      ref:"RequestType",
      required: true
    },
    // location: { type: String, required: true },
    profileId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    description: { type: String, required: true },
    startDatetime: { type: Date, required: true },
    endDatetime: { type: Date, required: true },
    amount:{type: Number, required: true},
    status: { type: String, enum: ["available", "closed"], default: "available" }
  },
  { timestamps: true }
);

const Request = model('Request', RequestSchema);

export default Request
