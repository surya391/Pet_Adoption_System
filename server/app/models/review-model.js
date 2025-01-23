import { Schema, model } from "mongoose"

const reviewSchema = new Schema({
  reviewerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming 'User' is your model for the user leaving the review
  },
  serviceProviderId: {
     type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },
    rating: {
    type: Number,
    required: true,
    
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Review = model('Review', reviewSchema);
export default Review;
