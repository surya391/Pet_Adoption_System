

// import { Schema, model } from "mongoose"
// const userSchema = new Schema({
//     name: String,
//     email: String,
//     password: String,
//     phoneNumber: Number,
//     role: {
//         type : String,
//         enum : [ "admin", "owner", "serviceProvider"]
//     }
// }, { timestamps: true })

// const User = model('User', userSchema)

// export default User


import { model, Schema } from 'mongoose'

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    PhoneNumber: Number,
    role:{
        type: String,
        enum: [ 'admin', 'owner', 'serviceProvider'],
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},{ timestamps: true})
const User = model('model', userSchema)
export default User