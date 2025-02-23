import express from 'express';
import { checkSchema } from 'express-validator';
import requestController from "../../app/controller/request-controller.js";
import authenticationUser from '../../app/middlewares/authentication.js';
import authorizeUser from '../../app/middlewares/authorize.js';

import { requestSchema } from '../../app/validators/request-validation-schema.js';

const requestRouter = express.Router();

// Create a new request
requestRouter.post('/create', authenticationUser, checkSchema(requestSchema), requestController.create);

// Get all requests by the logged-in user
requestRouter.get('/my-requests', authenticationUser, requestController.list);

requestRouter.get('/pendingRequest', authenticationUser, requestController.listPendingRequests);


// Get request details by request ID
requestRouter.get('/singleRequestView/:id', authenticationUser, requestController.show);

// Update request details by request ID
requestRouter.put('/updateRequestPet', authenticationUser, checkSchema(requestSchema), requestController.update);

// Delete a request by request ID
requestRouter.delete('/deleteRequestPet', authenticationUser, requestController.destroy);

requestRouter.get('/search', authenticationUser,authorizeUser(['serviceProvider']) ,requestController.search);


export default requestRouter;
