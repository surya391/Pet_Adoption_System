import { body } from 'express-validator';
import mongoose from 'mongoose';

export const reviewSchema = {
  serviceProviderId: {
    in: ["body"],
    exists: {
      errorMessage: "Service Provider ID is required.",
    },
    isMongoId: {
      errorMessage: "Invalid Service Provider ID format.",
    },
  },
  rating: {
    in: ["body"],
    exists: {
      errorMessage: "Rating is required.",
    },
    isInt: {
      options: { min: 1, max: 5 },
      errorMessage: "Rating must be an integer between 1 and 5.",
    },
  },
  description: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { max: 200 },
      errorMessage: "Description cannot exceed 200 characters.",
    },
    isString: {
      errorMessage: "Description must be a string.",
    },
    trim: true,
  },
};
