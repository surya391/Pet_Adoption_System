import Review from "../models/review-model.js";
import { validationResult } from "express-validator";

const reviewCltr = {};

// Create a new review
reviewCltr.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { userId } = req.currentUser; // Get userId from authenticated user
    const { serviceProviderId, rating, description } = req.body;
  
    if (!userId) {
      return res.status(400).json({ error: "User is not authenticated." });
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
    } catch (err) {
      console.error("Error while creating review:", err);  // Log the actual error
      res.status(500).json({ error: "Something went wrong." });
    }
  };

// List reviews by user
reviewCltr.listByUser = async (req, res) => {
  const { userId } = req.currentUser;
  try {
    const reviews = await Review.find({ reviewerId: userId });
    if (!reviews.length) {
      return res.status(404).json({ error: "No reviews found for this user." });
    }
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// List reviews for a service provider
// reviewCltr.listByServiceProvider = async (req, res) => {
//     const { serviceProviderId } = req.params; // Extract serviceProviderId from the request params
//     try {
//       // Correct the query to use serviceProviderId, not userId
//       const reviews = await Review.find({ serviceProviderId: serviceProviderId });
  
//       if (!reviews.length) {
//         return res.status(404).json({ error: "No reviews found for this service provider." });
//       }
  
//       // Return the reviews if found
//       res.json(reviews);
//     } catch (err) {
//       console.error("Error while fetching reviews:", err);
//       res.status(500).json({ error: "Something went wrong." });
//     }
//   };
  

// Get a single review by ID
reviewCltr.show = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Update a review
reviewCltr.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const updates = req.body;

  try {
    const review = await Review.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Delete a review
reviewCltr.destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.json({ message: "Review deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export default reviewCltr;
