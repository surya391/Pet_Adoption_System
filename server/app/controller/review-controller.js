import Review from "../models/review-model.js";
import { validationResult } from "express-validator";
import _ from "lodash"
import mongoose from "mongoose";
const reviewCltr = {};

// Create a new review
reviewCltr.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error : errors.array() });
    }
  
    const { userId } = _.pick(req.currentUser, ["userId"]); // Get userId from authenticated user
    const { serviceProviderId, rating, description } = _.pick(req.body, ["serviceProviderId", "rating", "description"]);
  
    if (!userId) {
      return res.status(400).json({ error: [{ msg: "User is not authenticated." }] })
    }
  
    try {
      // Create a new review with serviceProviderId, reviewerId, and rating
      const review = new Review({
        serviceProviderId,
        reviewerId: userId, // Set reviewerId to authenticated userId
        rating,
        description,
      });
      await review.save();
      res.status(201).json(review);
    } catch (error) {
      return res.status(500).json({ error: [{ msg:"Something went wrong." }] })
    }
  };
// Update a review
reviewCltr.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error : errors.array() });
  }

  try {
    const { userId } = _.pick(req.currentUser, [ "userId" ] );
    const { reviewId } = _.pick(req.query, [ "reviewId" ] );
    const { rating, description } = _.pick(req.body, ["serviceProviderId", "rating", "description"]);

    // console.log("Extracted User ID:", userId);
    // console.log("Review ID from Query Params:", reviewId);
    // console.log("Update Data:", { rating, description });
    
    const updatedReview = await Review.findOneAndUpdate(
      // { _id: reviewId, userId }, 
      { _id: new mongoose.Types.ObjectId(reviewId), reviewerId: new mongoose.Types.ObjectId(userId) },
      { $set: { rating, description } },
      { new: true, runValidators: true });

    if (!updatedReview) {
    return res.status(404).json({ error: [{ msg:  "Review not found."}] })
    }
    res.json(updatedReview);
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ error: [{ msg: "Something went wrong."}] })
  }
};
// Delete a review
reviewCltr.destroy = async (req, res) => {
  try {
    const { userId } = _.pick(req.currentUser, [ "userId" ] );
    const { reviewId } = _.pick(req.query, [ "reviewId" ] );
    // console.log(reviewId)
    // console.log(userId)

    const review = await Review.findOneAndDelete({_id: new mongoose.Types.ObjectId(reviewId),  reviewerId: new mongoose.Types.ObjectId(userId) });
    // console.log(review)
    if (!review) {
    return res.status(404).json({ error: [{ msg:  "Review not found." }] })
    }
    res.json({ message: "Review deleted successfully." });
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: [{ msg: "Something went wrong."}] })
  }
};
//serviceProviders can see the Review 
reviewCltr.listServiceProviderReviews = async (req, res) => {
  try {
    // const { userId } = _.pick(req.currentUser, [ "userId" ] );
      const { serviceProviderId } = _.pick(req.query, ["serviceProviderId"]);
      // Fetch reviews for the given service provider
      const reviews = await Review.find({ serviceProviderId })
          .sort({ createdAt: -1 }) // Sort by newest first
          .populate("reviewerId", "name"); // Populate reviewer details
      res.json(reviews);
  } catch (error) {
      return res.status(500).json({ error: [{ msg: error.message }] });
  }
};


reviewCltr.listOwnerReviews = async (req, res) => {
  try {
      const { userId } = _.pick(req.currentUser, [ "userId" ] );
      const reviews = await Review.find({  reviewerId: userId })
          .sort({ createdAt: -1 })
          .populate( "serviceProviderId", "name" )
      res.json( reviews );
  } catch (error) {
      return res.status(500).json({ error: [{ msg: error.message }] })
  }
}



export default reviewCltr;
