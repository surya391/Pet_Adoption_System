import express from 'express'
import { checkSchema } from 'express-validator'
import userCltr from "../../app/controller/user-controller.js";
import authenticationUser from '../../app/middlewares/authentication.js';
import { userRegisterSchema, userLoginSchema, tokenValidatorSchema } from '../../app/validators/user-validation-schema.js'
const userRouter = express.Router()

userRouter.post("/signUp", checkSchema( userRegisterSchema), userCltr.signUp)
userRouter.post("/signIn", checkSchema( userLoginSchema), userCltr.signIn)
userRouter.get('/profile', authenticationUser, userCltr.profile);
userRouter.put('/verify',checkSchema(tokenValidatorSchema),userCltr.verify)

export default userRouter