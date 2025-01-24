import express from 'express'
import { checkSchema } from 'express-validator'
import userCltr from "../../app/controller/user-controller.js";
import authenticationUser from '../../app/middlewares/authentication.js';
import { userRegisterSchema, userLoginSchema, tokenValidatorSchema } from '../../app/validators/user-validation-schema.js'
import { emailValidationSchema, otpValidationSchema } from '../../app/validators/email-validation-schema.js';
import otpCltr from '../../app/controller/otpController.js';

const userRouter = express.Router()

userRouter.post("/signUp", checkSchema( userRegisterSchema), userCltr.signUp)
userRouter.post("/signIn", checkSchema( userLoginSchema), userCltr.signIn)
userRouter.get('/profile', authenticationUser, userCltr.profile);
userRouter.put('/verify',checkSchema(tokenValidatorSchema),userCltr.verify)
userRouter.post('/sendEmail/otp', checkSchema(emailValidationSchema),otpCltr.sendEmailOtp)
userRouter.post('/EmailVerify', checkSchema(otpValidationSchema),otpCltr.verifyOtp)

export default userRouter