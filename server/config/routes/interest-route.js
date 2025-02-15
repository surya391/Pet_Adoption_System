import express from 'express';
import { checkSchema } from 'express-validator';
import interestCltr from '../../app/controller/interest-controller.js'; 
import authenticationUser from '../../app/middlewares/authentication.js';
import authorizeUser from '../../app/middlewares/authorize.js';
// import { interestValidationSchema } from '../../app/validators/interest-validation-schema.js'; 

const interestRouter = express.Router();

// Define the role(s) allowed to perform actions
const permittedRole = ['admin', 'serviceProvider'];

// Create a new interest   
interestRouter.post(
  '/create', 
  authenticationUser, 
  authorizeUser(permittedRole), 
  interestCltr.createInterest
);

interestRouter.post(                
  '/remove', 
  authenticationUser, 
  authorizeUser(permittedRole), 
  interestCltr.removeInterest
);


interestRouter.get(                
  '/allInterset', 
  authenticationUser, 
  authorizeUser(['owner']), 
  interestCltr.allInterest
);

// Get all interests for a specific provider
interestRouter.get(
  '/show', 
  authenticationUser, 
  authorizeUser((['owner','serviceProvider'])), 
  interestCltr.show
);

// Get interest details by interest ID
interestRouter.get(
  '/:id', 
  authenticationUser, 
  authorizeUser(permittedRole), 
  interestCltr.show
);

// Update an interest by ID
// interestRouter.put(
//   '/update/:id', 
//   authenticationUser, 
//   authorizeUser(permittedRole), 
//   checkSchema(interestValidationSchema),
//   interestCltr.update
// );

// Delete an interest by ID
// interestRouter.delete(
//   '/delete/:id', 
//   authenticationUser, 
//   authorizeUser(permittedRole), 
//   interestCltr.destroy
// );

export default interestRouter;


// there are two type of get operations 1. pet owner get the interests for that request 
// 2. provider see imself request made by him.