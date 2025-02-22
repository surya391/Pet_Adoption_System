import OTP from '../models/otp-model.js'
import _ from 'lodash'
import User from "../models/user-model.js"
import mailSender from "../utils/mailSender.js"
import { OTP_EMAIL_TEMPLATE } from '../utils/mailTemplate.js'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

const otpCltr = {}

otpCltr.sendEmailOtp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error : errors.array() })
    }
    try {
        const { email } = _.pick(req.body, ["email"])
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: [{ msg: "user is not registered" }] })
        }
        if (!user.isVerified) {
            return res.status(403).json({ error: [{ msg: "user is not Verified" }] })
        }
        let otp = await OTP.findOne({ userId: user._id })
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
        const randamNumber = Math.round(100000 + Math.random() * 900000)
        if (otp) {
            otp.otp = randamNumber;
            otp.expiresAt = expiresAt;
            otp.retryCount = 3
            await otp.save()
        } else {
            otp = new OTP({
                userId: user._id,
                otp: randamNumber,
                expiresAt
            })
            await otp.save()
        }
        const html = OTP_EMAIL_TEMPLATE.replace('{verificationCode}', randamNumber)
        await mailSender(email, 'OTP for Login ', html);
        res.status(201).json({ msg: "OTP sent Successfully" })

    } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong, while sending Email OTP!" }] })
    }

}

otpCltr.verifyOtp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    try {
        const { email, otp } = _.pick(req.body, ["email", "otp"])
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: [{ msg: "user is not registered" }] })
        }
        if (!user.isVerified) {
            return res.status(403).json({ error: [{ msg: "user is not Verified" }] })
        }
        let otpRecord = await OTP.findOne({ userId: user._id })
        if (!otpRecord) {
            return res.status(404).json({ error: [{ msg: "OTP is not present for this User." }] })
        }
        if (otpRecord.retryCount === 0) {
            return res.status(403).json({ error: [{ msg: "Exceded the attempts for login" }] })
        }
        if (otpRecord.expiresAt < new Date()) {
            return res.status(403).json({ error: [{ msg: "OTP is expired" }] })
        }
        console.log('otpRecored', otpRecord.otp)
        console.log('revicedOTP', otp)
        console.log('otpVerify',otpRecord.otp === Number(otp) )
        if (otpRecord.otp === Number(otp)) {
            const tokenData = {
                userId: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                isVerified: user.isVerified
            } 
            const { JWT_SECRET, JWT_EXPIRE_IN } = process.env
            const token = await jwt.sign(tokenData, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN })
            res.json({ token: `Bearer ${token}` })
        } else {
            const newCount = {
                retryCount: otpRecord.retryCount - 1
            }
            const updateOTP = await OTP.findOneAndUpdate({ userId: user._id }, newCount, { new: true, runValidators: true })
            return res.status(409).json({error : [{msg: `Wrong OTP, you have still they are ${updateOTP.retryCount} chance`}]})
        }
    } catch (error) {
        return res.status(500).json({error : [{msg: "Something went wrong, while verifying Otp!"}]})
    }
}


export default otpCltr