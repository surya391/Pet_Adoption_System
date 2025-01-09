import { Schema, model } from 'mongoose'
const RequestTypeSchema = new Schema(
    {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        requestType:{
          type: String,
          required: true
        }
      },
      { timestamps: true }
  );

  const RequestType = model('RequestType', RequestTypeSchema)
  export default RequestType