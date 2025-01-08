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

const userCltr = {}

userCltr.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    const user = new User(body)
    try {
        const salt = await bcryptjs.genSalt()
        const hash = await bcryptjs.hash(body.password, salt)
        user.password = hash
        //to make the first user as admin
        const userCount = await User.countDocuments()
        if (userCount == 0) {
            user.role = 'admin'
        }
        await user.save()
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong..' })
    }
}

userCltr.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ errors: 'invalid email or password' })
        }
        const verify = await bcryptjs.compare(password, user.password)
        if (!verify) {
            return res.status(404).json({ errors: 'invalid email or password' })
        }
        const tokenData = { userId: user._id, role: user.role }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ token })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "something went wrong.." })
    }
}

userCltr.profile = async (req, res) => {
    try {
        const user = await User.findById(req.currentUser.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(_.pick(user,['_id','email','role','phoneNumber']));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong.' });
    }
}

export default userCltr
