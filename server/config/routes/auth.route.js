import express from 'express'
import { checkSchema } from 'express-validator'
import userCltr from "../../app/controller/user-controller.js";
import authenticationUser from '../../app/middlewares/authentication.js';
import { userRegisterSchema, userLoginSchema } from '../../app/validators/user-validation-schema.js'
const userRouter = express.Router()

userRouter.post("/register", checkSchema( userRegisterSchema), userCltr.register)
userRouter.post("/login", checkSchema( userLoginSchema), userCltr.login)
userRouter.get('/profile', authenticationUser, userCltr.profile);

export default userRouter