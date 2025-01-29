// import User from "../models/user-model.js";
// import bcryptjs from "bcryptjs";
// import { validationResult } from "express-validator";

// const userCltr = {};

// userCltr.signup = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { name, email, password, phoneNumber, role } = req.body;

//   try {
//     if (!email || !password || !name || !phoneNumber) {
//       throw new Error("All fields are required.");
//     }

//     const userAlreadyExists = await User.findOne({ email });
//     if (userAlreadyExists) {
//       return res.status(400).json({ success: false, message: "User already exists" });
//     }

//     const salt = await bcryptjs.genSalt();
//     const hash = await bcryptjs.hash(password, salt);

//     const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

//     // To make the first user as admin
//     const userCount = await User.countDocuments()
//     if (userCount == 0) {
//         user.role = 'admin'
//     }

//     const user = new User({
//       name,
//       email,
//       password: hash,
//       phoneNumber,
//       role : user.role, 
//       verificationToken,
//       verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
//     });

//     await user.save();

//     res.status(201).json({user});
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export default userCltr;


import User from "../models/user-model.js";
import _ from 'lodash'
import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import randToken from 'rand-token'
import Token from '../models/token-model.js'
import mailSender from "../utils/mailSender.js";
import { TOKEN_EMAIL_TEMPLATE } from '../utils/mailTemplate.js'



const userCltr = {}

// userCltr.register = async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//     }
//     const body = req.body
//     const user = new User(body)
//     try {
//         const salt = await bcryptjs.genSalt()
//         const hash = await bcryptjs.hash(body.password, salt)
//         user.password = hash
//         //to make the first user as admin
//         const userCount = await User.countDocuments()
//         if (userCount == 0) {
//             user.role = 'admin'
//         }
//         await user.save()
//         res.status(201).json(user)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ error: 'something went wrong..' })
//     }
// }

userCltr.signUp = async(req,res) =>{
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status( 400 ).json( { error : errors.array() })
    } 
    try {
        const { name, email, role, password, phoneNumber } = _.pick(req.body,['name','email','password','role','phoneNumber'])
        const user = new User({name, email, phoneNumber, role, password})
        const count = await User.countDocuments()
        if(count !== 0 && role == 'admin'){
            return res.status(500).json([{ msg: "Can't be able to create an account as a admin"}])
        }
        const salt = await bcryptjs.genSalt()
        const hash = await bcryptjs.hash(password, salt)
        user.password = hash
        // user.role == 'owner' ? user.isVerified = false : user.isVerified = true
        const base_url = process.env.BASE_URL;
        const token = randToken.generate(32);
        const url = `${base_url}/verify?userId=${user._id}&token=${token}` //slugs verify /:userId/:token using params
        const html = TOKEN_EMAIL_TEMPLATE.replace("{token}",url)
        await mailSender(user.email, "Account Verification", html)
        await new Token({ userId : user._id, token }).save()
        await user.save()
        const body = _.pick(user, ['_id','name','email','phoneNumber','role'])
        return res.status(201).json(body)
    } catch (error) {
        return res.status(500).json([{ msg : "Something went wrong, while signUp!"}])
    }
}

// userCltr.login = async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//     }
//     const { email, password } = req.body
//     try {
//         const user = await User.findOne({ email })
//         if (!user) {
//             return res.status(404).json({ errors: 'invalid email or password' })
//         }
//         const verify = await bcryptjs.compare(password, user.password)
//         if (!verify) {
//             return res.status(404).json({ errors: 'invalid email or password' })
//         }
//         const tokenData = { userId: user._id, role: user.role }
//         const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' })
//         res.json({ token })

//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ error: "something went wrong.." })
//     }
// }

userCltr.signIn = async ( req,res ) =>{
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status( 400 ).json( { error : errors.array() })
    } 
    try {
        const { email, password } = _.pick(req.body, ['email','password'])
        const user = await User.findOne({ email })
        if(!user){
            return res.status(404).json({error: [{msg: 'Email is not registered'}]})
        }
        if(!user.isVerified){
            return res.status(404).json({error: [{msg: 'User not verified'}]})
        }
        const isValid = await bcryptjs.compare(password, user.password)
        if(!isValid){
            return res.status(400).json({error: [{ msg: 'Invalid email/password' }]})
        }
        const tokenData = {
            userId: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            isVerified: user.isVerified
        } 
        const {JWT_SECRET, JWT_EXPIRE_IN } = process.env
        const token = await jwt.sign(tokenData, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN })
        res.json({token:`Bearer ${token}`})
    } catch (error) {
        return res.status(500).json({error:[{msg:"something went wrong! while signIn"}]})
    }
}

userCltr.verify = async(req,res) =>{
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status( 400 ).json( { error : errors.array() })
    } 
    try {
        // console.log("function invoked")
        const { userId, token } = _.pick(req.query, ["userId", "token"])
        const { isVerified } = _.pick(req.body,["isVerified"])
        const user = await User.findOne({_id: userId})
        if(!user){
            return res.status(404).json({ error: [{ msg: "User is not registered" }]})
        }
        const tokenData = await Token.findOne({userId,token})
        if(!tokenData){
            return res.status(404).json({ error : [{ msg: "Token is invalid"}]})
        }
        await User.findByIdAndUpdate(userId, { isVerified }, { new:true, runValidators: true })
        await Token.findOneAndDelete( {userId, token } )
        res.json({ msg:" Account verified successfully " })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:[{msg:"something went wrong! while verify account"}]})
    }
}

userCltr.account = async (req, res) => {
    try {
        const user = await User.findById(req.currentUser.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(_.pick(user,['_id','email','role','phoneNumber','name']));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong.' });
    }
}

export default userCltr
