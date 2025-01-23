import { Schema, model } from "mongoose"

const InterestSchema = new Schema(
    {
      providerId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Service provider ID
      requestId:  { type: Schema.Types.ObjectId, ref: "Request", required: true }, // Request owner ID
      status: {
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending",
      },
    },
    { timestamps: true }
  );
  
  const Interest= model('Interest', InterestSchema);
  export default Interest;