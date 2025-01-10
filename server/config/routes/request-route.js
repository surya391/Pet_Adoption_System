import express from 'express';
import { checkSchema } from 'express-validator';
import requestController from "../../app/controller/request-controller.js";
import authenticationUser from '../../app/middlewares/authentication.js';
import { requestSchema } from '../../app/validators/request-validation-schema.js';

const requestRouter = express.Router();

// Create a new request
requestRouter.post('/create', authenticationUser, checkSchema(requestSchema), requestController.create);

// Get all requests by the logged-in user
requestRouter.get('/my-requests', authenticationUser, requestController.list);

// Get request details by request ID
requestRouter.get('/:id', authenticationUser, requestController.show);

// Update request details by request ID
requestRouter.put('/update/:id', authenticationUser, checkSchema(requestSchema), requestController.update);

// Delete a request by request ID
requestRouter.delete('/delete/:id', authenticationUser, requestController.destroy);

export default requestRouter;
