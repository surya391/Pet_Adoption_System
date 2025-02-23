import express from 'express';
import { checkSchema } from 'express-validator';
import reviewController from '../../app/controller/review-controller.js';
import authenticationUser from '../../app/middlewares/authentication.js';
import authorizeUser from '../../app/middlewares/authorize.js';
import { reviewSchema } from '../../app/validators/review-validation-schema.js';

const reviewRouter = express.Router();

const ownerRole = ['owner'];  // Only owners can create, list, and delete reviews

// Create a new review (Owner only)
reviewRouter.post('/create', authenticationUser, authorizeUser(ownerRole),  checkSchema(reviewSchema), reviewController.create);

// Get all reviews (Owner only)
// reviewRouter.get('/my-reviews', authenticationUser, authorizeUser(ownerRole), reviewController.listByUser);


// Update review details by review ID 
reviewRouter.put('/update', authenticationUser, authorizeUser(ownerRole), checkSchema(reviewSchema), reviewController.update);

// Delete a review by review ID (Owner only)
reviewRouter.delete('/delete', authenticationUser, authorizeUser(['owner','admin']), reviewController.destroy);

reviewRouter.get("/my-reviews", authenticationUser, authorizeUser(["serviceProvider"]), reviewController.listServiceProviderReviews );

export default reviewRouter;
