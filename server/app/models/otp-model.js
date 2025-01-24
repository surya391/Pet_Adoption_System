import { model, Schema } from 'mongoose'

const otpSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    otp: Number,
    retryCount: {
        type: Number,
        default: 3
    },
    expiresAt : Date
},{timestamps : true})

const OTP = model('OTP', otpSchema)
export default OTP