import { Schema, model } from "mongoose";

const RequestSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    phone: { type: String, required: true },
    requestType: { type: String, enum: ['temp_adoption', 'walking'], required: true },
    location: { type: String, required: true },
    description: { type: String },
    startDatetime: { type: Date, required: true },
    endDatetime: { type: Date, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
