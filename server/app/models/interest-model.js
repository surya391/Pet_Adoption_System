import { Schema, model } from "mongoose"

const InterestSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    requestId: { type: Schema.Types.ObjectId, ref: "Request", required: true }, // Request owner ID
    interestedServiceProviders: [{
      pID: { type: Schema.Types.ObjectId, ref: "User", required: true },
      status: {
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending",
      }
    }]
  },
  { timestamps: true }
);

const Interest = model('Interest', InterestSchema);
export default Interest;




