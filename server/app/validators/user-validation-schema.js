// import User from '../models/user-model.js';

// export const userRegisterSchema = {
//     name: {
//         in: ['body'],
//         exists: {
//             errorMessage: 'name should be required'
//         },
//         notEmpty: {
//             errorMessage: "name should not be empty"
//         },
//         trim: true
//     },
//     email: {
//         in: ['body'],
//         exists: {
//             errorMessage: 'email should be required'
//         },
//         notEmpty: {
//             errorMessage: "email should not be empty"
//         },
//         isEmail: {
//             errorMessage: "email is correct format"
//         },
//         trim: true,
//         normalizeEmail: true,
//         custom: {
//             options: async function (value) {
//                 const user = await User.findOne({ email: value })
//                 if (user) {
//                     throw new Error("email is already taken")
//                 }
//                 return true
//             }
//         }
//     },
//     password: {
//         exists: {
//             errorMessage: 'password should be required'
//         },
//         notEmpty: {
//             errorMessage: "password should not be empty"
//         },
//         isStrongPassword: {
//             options: {
//                 minLength: 5,
//                 minLowerCase: 1,
//                 minUpperCase: 1,
//                 minNumber: 1,
//                 minSymbols: 1
//             },
//             errorMessage: "Password must include at least 5 characters, one lowercase letter, one uppercase letter, one number, and one special character."
//         },
//         trim: true,
//     },
//     phoneNumber: {
//         in: ["body"],
//         exists: {
//             errorMessage: " Phone Number is required "
//         },
//         notEmpty: {
//             errorMessage: "Phone Number should not be empty"
//         },
//         trim: true,
//         // isNumeric : {
//         //     options : {
//         //         no_symbols: true, // using this property we can prevent + - to added to phone number
//         //     },
//         //     errorMessage : "Phone Number should consists only Number"
//         // },
//         isMobilePhone: {
//             options: ["any"], // Supports international formats
//             errorMessage: "Phone Number should be valid",
//         },
//         isLength: {
//             options: {
//                 min: 10,
//                 max: 10
//             },
//             errorMessage: "Phone Number should be 10 digits"
//         },
//         custom: {
//             options: async function (value) {
//                 const user = await User.findOne({ phoneNumber: value })
//                 if (user) {
//                     throw new Error("Number is already taken register")
//                 }
//                 return true
//             }
//         }
//     },
//     // role: {
//     //     in: ["body"],
//     //     exists: {
//     //         errorMessage: "Role  field is required"
//     //     },
//     //     notEmpty: {
//     //         errorMessage: "Role field should not be empty"
//     //     },
//     //     trim: true,
//     //     isIn: {
//     //         options: [['admin', 'owner', 'serviceProvider']],
//     //         errorMessage: "Role should be one of the following: admin, owner, or serviceProvider."
//     //     }
//     // }
// }

// export const userLoginSchema = {
//     email: {
//         exists: {
//             errorMessage: "Email is required.",
//         },
//         notEmpty: {
//             errorMessage: "Email cannot be empty.",
//         },
//         isEmail: {
//             errorMessage: "Please provide a valid email address.",
//         },
//         trim: true,
//         normalizeEmail: true,
//     },
//     password: {
//         exists: {
//             errorMessage: "Password is required.",
//         },
//         notEmpty: {
//             errorMessage: "Password cannot be empty.",
//         },
//         isStrongPassword: {
//             options: {
//                 minLength: 5,
//                 minLowercase: 1,
//                 minNumbers: 1,
//                 minUppercase: 1,
//                 minSymbols: 1,
//             },
//             errorMessage:
//                 "Password must include at least 5 characters, one lowercase letter, one uppercase letter, one number, and one special character.",
//         },
//         trim: true,
//     },
// };


import User from "../models/user-model.js";
export const userRegisterSchema = {
    email:{
        exists:{
            errorMessage:'email should be required'
        },
        notEmpty:{
            errorMessage:"email should not be empty"
        },
        isEmail: {
            errorMessage: "email is correct formate"
        },
        trim:true,
        normalizeEmail:true,
        custom:{
            options :async function (value) {
                const user = await User.findOne({ email:value })
                if(user){
                    throw new Error("email is already taken")
                }
                return true
            }
        }
    },
    password:{
        exists:{
            errorMessage:'password should be required'
        },
        notEmpty:{
            errorMessage:"password should not be empty"
        },
        isStrongPassword: {
            options: {
                minLength: 5,
                minLowerCase: 1,
                minUpperCase: 1,
                minNumber: 1,
                minSymbols: 1
            },
            errorMessage: "Password must include at least 5 characters, one lowercase letter, one uppercase letter, one number, and one special character."
        },
        trim:true,
    },
    phoneNumber: {
        in: ["body"],
        exists: {
            errorMessage: " Phone Number is required "
        },
        notEmpty: {
            errorMessage: "Phone Number should not be empty"
        },
        trim: true,
        // isNumeric : {
        //     options : {
        //         no_symbols: true, // using this property we can prevent + - to added to phone number
        //     },
        //     errorMessage : "Phone Number should consists only Number"
        // },
        isMobilePhone: {
            options: ["any"], // Supports international formats
            errorMessage: "Phone Number should be valid",
        },
        isLength: {
            options: {
                min: 10,
                max: 10
            },
            errorMessage: "Phone Number should be 10 digits"
        },
        custom: {
            options: async function (value) {
                const user = await User.findOne({ phoneNumber: value })
                if (user) {
                    throw new Error("Number is already taken register")
                }
                return true
            }
        }
    },
    role: {
        in: ["body"],
        exists: {
            errorMessage: "Role  field is required"
        },
        notEmpty: {
            errorMessage: "Role field should not be empty"
        },
        trim: true,
        isIn: {
            options: [['admin', 'owner', 'serviceProvider']],
            errorMessage: "Role should be one of the following: admin, owner, or serviceProvider."
        }
    }
}

export const userLoginSchema = {
    email: {
        exists: {
            errorMessage: "Email is required.",
        },
        notEmpty: {
            errorMessage: "Email cannot be empty.",
        },
        isEmail: {
            errorMessage: "Please provide a valid email address.",
        },
        trim: true,
        normalizeEmail: true,
    },
    password: {
        exists: {
            errorMessage: "Password is required.",
        },
        notEmpty: {
            errorMessage: "Password cannot be empty.",
        },
        isStrongPassword: {
            options: {
                minLength: 5,
                minLowercase: 1,
                minNumbers: 1,
                minUppercase: 1,
                minSymbols: 1,
            },
            errorMessage:
                "Password must include at least 5 characters, one lowercase letter, one uppercase letter, one number, and one special character.",
        },
        trim: true,
    },
};

export const tokenValidatorSchema = {
    userId: {
        in:['query'],
        isMongoId:{errorMessage : 'UserId is invalid' }
    },
    token : {
        in:['query'],
        isLength: {
            options:{
                min : 32,
                max : 32
            },
            errorMessage:'token should be 32 digits'
        }
    }
}