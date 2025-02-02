import express from 'express';
import { checkSchema } from 'express-validator';
import petTypeController from "../../app/controller/pet-type-controller.js";
import authenticationUser from '../../app/middlewares/authentication.js';
import authorizeUser from '../../app/middlewares/authorize.js';
import { petTypeSchema } from '../../app/validators/pet-type-validation-schema.js';


const petTypeRouter = express.Router();

// Define the role(s) allowed to perform actions
const permittedRole = ['admin'];

// Create a new pet type
petTypeRouter.post( '/create',  authenticationUser, authorizeUser(permittedRole), checkSchema(petTypeSchema),petTypeController.create);

// Get all pet types for the logged-in user
petTypeRouter.get('/get', authenticationUser,  petTypeController.list);

// Get pet type details by pet type ID
petTypeRouter.get('/:id', authenticationUser, authorizeUser(permittedRole), petTypeController.show);

// Update a pet type by ID
petTypeRouter.put('/update/:id',  authenticationUser, authorizeUser(permittedRole), checkSchema(petTypeSchema),  petTypeController.update);

// Delete a pet type by ID
petTypeRouter.delete('/delete/:id', authenticationUser, authorizeUser(permittedRole), petTypeController.destroy);

export default petTypeRouter;
