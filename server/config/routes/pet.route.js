import express from 'express';
import { checkSchema } from 'express-validator';
import petCltr from "../../app/controller/pet-controller.js";
import authenticationUser from '../../app/middlewares/authentication.js';
import { petSchema } from '../../app/validators/pet-validation-schema.js';
import upload from '../multer/multerConfig.js';

const petRouter = express.Router();

// Create a new pet
petRouter.post('/create', authenticationUser, upload.single("petImage"), checkSchema(petSchema),petCltr.create);

// Get all pets by the logged-in user
petRouter.get('/my-pets', authenticationUser, petCltr.listByUser);

// Get pet details by pet ID
petRouter.get('/singlePet', authenticationUser, petCltr.show);


// Update pet details by pet ID
petRouter.put('/updatePet', authenticationUser, upload.single("petImage"), checkSchema(petSchema), petCltr.update);

// Delete a pet by pet ID
petRouter.delete('/deletePet', authenticationUser, petCltr.destroy);



export default petRouter;
