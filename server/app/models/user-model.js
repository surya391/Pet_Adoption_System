// import { Schema, model } from "mongoose"

// const userSchema = Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     phoneNumber: {
//         type: Number,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['admin', 'owner', 'serviceProvider']
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     resetPasswordToken: String,
//     resetPasswordExpiresAt: Date,
//     verificationToken: String,
//     verificationTokenExpiresAt: Date
// }, { timestamps: true })

// const User = model('User', userSchema)

// export default User


import { Schema, model } from "mongoose"
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: Number,
    role: {
        type : String,
        enum : [ "admin", "owner", "serviceProvider"]
    }
}, { timestamps: true })

const User = model('User', userSchema)

export default User