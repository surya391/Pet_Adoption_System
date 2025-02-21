import express from 'express';
import { checkSchema } from 'express-validator';
import requestTypeController from "../../app/controller/request-type-controller.js";
import authenticationUser from '../../app/middlewares/authentication.js';
import authorizeUser from '../../app/middlewares/authorize.js';
import { requestTypeSchema } from '../../app/validators/request-type-validation-schema.js';

const requestTypeRouter = express.Router();

const permittedRole = ['admin'];

// Create a new request type
requestTypeRouter.post('/create', authenticationUser, authorizeUser(permittedRole), checkSchema(requestTypeSchema), requestTypeController.create);

// Update a request type by ID
requestTypeRouter.put('/update', authenticationUser, authorizeUser(permittedRole), checkSchema(requestTypeSchema), requestTypeController.update);

// Delete a request type by ID
requestTypeRouter.delete('/delete/:id', authenticationUser, authorizeUser(permittedRole), requestTypeController.destroy);

// Get all request types for the logged-in user
requestTypeRouter.get('/myRequestTypes', authenticationUser, authorizeUser(['admin','owner', 'serviceProvider']), requestTypeController.list);

// Get request type details by request type ID
requestTypeRouter.get('/:id', authenticationUser, authorizeUser(permittedRole), requestTypeController.show);



export default requestTypeRouter;
