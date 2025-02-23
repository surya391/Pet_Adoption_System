import { Schema, model } from "mongoose"

const reviewSchema = new Schema({
  reviewerId: {         // reviewer id is a owner ID
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming 'User' is your model for the user leaving the review
  },
  serviceProviderId: {
     type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  rating:  Number,
  description: String
}, { timestamps: true });

const Review = model('Review', reviewSchema);
export default Review;
