export const emailValidationSchema = {
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
    }
}

export const otpValidationSchema = {
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
    },
     otp : {
        in : [ "body" ],
        exists : {
            errorMessage : "OTP is required"
        },
        notEmpty : {
            errorMessage : "OTP Should not be empty"
        },
        trim :  true,
        isLength : {
            options :{
                min : 6,
                max:  6
            },
            errorMessage : "OTP should be 6 degits"
        },
        isNumeric : {
            options : {
                no_symbols :  true
            },
            errorMessage : "OTP consis only Number"
        },    
    }
} 