import express from 'express';
import { checkSchema } from 'express-validator';
import profileCltr from '../../app/controller/profile-controller.js';
import authenticationUser from '../../app/middlewares/authentication.js';
import { profileSchema } from '../../app/validators/profile-validation-schema.js';
import upload from '../multer/multerConfig.js';


const profileRouter = express.Router();

// Create a profile
profileRouter.post("/profileCreate", authenticationUser, checkSchema(profileSchema), upload.single("profilePic"), profileCltr.create);

// Get the logged-in user's profile
profileRouter.get("/profile/user",  authenticationUser,  profileCltr.show);

// Get a profile by ID
// profileRouter.get("/:id", authenticationUser, profileCltr.show);

// Update a profile by ID
profileRouter.put( "/profileUpdate/:id", authenticationUser, checkSchema(profileSchema), profileCltr.update);

// Delete a profile by ID
// profileRouter.delete("/profileDelete/:id",  authenticationUser, profileCltr.destroy);



export default profileRouter;
