import express from 'express';
import { checkSchema } from 'express-validator';
import petCltr from "../../app/controller/pet-controller.js";
import authenticationUser from '../../app/middlewares/authentication.js';
import { petSchema } from '../../app/validators/pet-validation-schema.js';

const petRouter = express.Router();

// Create a new pet
petRouter.post('/create', authenticationUser, checkSchema(petSchema), petCltr.create);

// Get all pets by the logged-in user
petRouter.get('/my-pets', authenticationUser, petCltr.listByUser);

// Get pet details by pet ID
petRouter.get('/:id', authenticationUser, petCltr.show);


// Update pet details by pet ID
petRouter.put('/petUpdate/:id', authenticationUser, checkSchema(petSchema), petCltr.update);

// Delete a pet by pet ID
petRouter.delete('/petDelete/:id', authenticationUser, petCltr.destroy);

export default petRouter;
