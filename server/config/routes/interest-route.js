import express from 'express';
import { checkSchema } from 'express-validator';
import interestCltr from '../../app/controller/interest-controller.js'; 
import authenticationUser from '../../app/middlewares/authentication.js';
import authorizeUser from '../../app/middlewares/authorize.js';
import { requestId } from '../../app/validators/interest-validation-schema.js';
// import { interestValidationSchema } from '../../app/validators/interest-validation-schema.js'; 

const interestRouter = express.Router();

// Define the role(s) allowed to perform actions
const permittedRole = ['admin', 'serviceProvider'];

// Create a new interest   
interestRouter.post('/create', authenticationUser, authorizeUser(permittedRole), interestCltr.createInterest);

interestRouter.put('/remove', authenticationUser, authorizeUser(permittedRole), interestCltr.removeInterest);

interestRouter.get('/allInterset', authenticationUser, authorizeUser(['owner']), interestCltr.allInterest);

interestRouter.get('/getServiceProviderInterests', authenticationUser, authorizeUser(['serviceProvider']), interestCltr.getServiceProviderInterests);

interestRouter.get('/getOwnerInterests', authenticationUser, authorizeUser(['owner']), checkSchema({ requestId }),interestCltr.getOwnerInterests);


interestRouter.put('/updateInterestStatus', authenticationUser, authorizeUser(['owner']), interestCltr.updateInterestStatus);





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



export default interestRouter;


// there are two type of get operations 1. pet owner get the interests for that request 
// 2. provider see imself request made by him.