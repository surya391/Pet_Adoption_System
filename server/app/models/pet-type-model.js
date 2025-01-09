import { Schema, model } from "mongoose";

const PetTypeSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      petType:{
        type: String,
        required: true
      }
    },
    { timestamps: true }
  );
  
  const PetType = model('PetType', PetTypeSchema);
  export default PetType;