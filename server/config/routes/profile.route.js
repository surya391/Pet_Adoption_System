import express from 'express';
import { checkSchema } from 'express-validator';
import profileCltr from '../../app/controller/profile-controller.js';
import authenticationUser from '../../app/middlewares/authentication.js';
import { profileSchema } from '../../app/validators/profile-validation-schema.js';
import upload from '../multer/multerConfig.js';
import { validationResult } from 'express-validator';


const profileRouter = express.Router();

// Create a profile
profileRouter.post("/user", authenticationUser, upload.single("profilePic"), checkSchema(profileSchema),  profileCltr.create);

// profileRouter.post("/user", authenticationUser, upload.single("profilePic"), checkSchema(profileSchema),  (req,res)=>{
//     const errors = validationResult(req);
//     console.log(errors)
//     res.send('hello')
// });

// Get the logged-in user's profile
profileRouter.get("/user",  authenticationUser,  profileCltr.show);

// Get a profile by ID
// profileRouter.get("/:id", authenticationUser, profileCltr.show);

// Update a profile by ID
profileRouter.put( "/user", authenticationUser,upload.single("profilePic"), checkSchema(profileSchema), profileCltr.update);

// profileRouter.put( "/user", authenticationUser,upload.single("profilePic"), checkSchema(profileSchema),(req,res)=>{
//         const errors = validationResult(req);
//     console.log(errors)
//     res.send('put')
// });



// Delete a profile by ID
// profileRouter.delete("/profileDelete/:id",  authenticationUser, profileCltr.destroy);



export default profileRouter;
