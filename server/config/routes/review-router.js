import express from 'express';
import { checkSchema } from 'express-validator';
import reviewController from '../../app/controller/review-controller.js';
import authenticationUser from '../../app/middlewares/authentication.js';
import authorizeUser from '../../app/middlewares/authorize.js';
import { reviewSchema } from '../../app/validators/review-validation-schema.js';

const reviewRouter = express.Router();

const ownerRole = ['owner'];  // Only owners can create, list, and delete reviews

// Create a new review (Owner only)
reviewRouter.post(
  '/create',
  authenticationUser,
  authorizeUser(ownerRole),  // Ensure only owners can create reviews
  checkSchema(reviewSchema), // Validate the request body
  reviewController.create
);

// Get all reviews (Owner only)
reviewRouter.get(
  '/my-reviews',
  authenticationUser,
  authorizeUser(ownerRole),  // Ensure only owners can list their reviews
  reviewController.listByUser
);

// Get all reviews for a specific service provider 
// reviewRouter.get(
//   '/service-provider/:serviceProviderId',
//   authenticationUser,
//   authorizeUser(ownerRole),  // Ensure only admins can view reviews for a service provider
//   reviewController.listByServiceProvider
// );

// // Get review details by review ID 
// reviewRouter.get(
//   '/:id',
//   authenticationUser,
//   authorizeUser(adminRole),  // Ensure only admins can access review details
//   reviewController.show
// );

// Update review details by review ID 
reviewRouter.put(
  '/update/:id',
  authenticationUser,
  authorizeUser(ownerRole),  // Ensure only admins can update reviews
  checkSchema(reviewSchema), // Validate the request body
  reviewController.update
);

// Delete a review by review ID (Owner only)
reviewRouter.delete(
  '/delete/:id',
  authenticationUser,
  authorizeUser(['owner','admin']),  // Ensure only owners can delete their reviews
  reviewController.destroy
);

export default reviewRouter;
