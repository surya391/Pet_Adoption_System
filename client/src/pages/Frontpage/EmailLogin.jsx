// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { isEmail, isNumeric } from "validator";
// import { useSelector, useDispatch } from "react-redux";
// import RegisterLoading from './RegisterLoading';
// import { verifyEmail, sendEmailOtp, getUser } from "../../slices/AuthSlice";

// const EmailLogin = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { otpSent, isLoading, serverError } = useSelector(state => state.auth);
//     const [formData, setFormData] = useState({
//         email: "",
//         otp: ""
//     });
//     const [clientErrors, setClientErrors] = useState(null);
//     const errors = {};

//     const validateEmail = () => {
//         if (formData.email.trim().length === 0) {
//             errors.input = "Email field cannot be empty";
//         } else if (!isEmail(formData.email)) {
//             errors.input = "Enter a valid email address";
//         }
//     };

//     const handleSendOtp = (e) => {
//         e.preventDefault();
//         validateEmail();
//         if (Object.keys(errors).length > 0) {
//             setClientErrors(errors);
//         } else {
//             setClientErrors(null);
//             dispatch(sendEmailOtp(formData));
//         }
//     };

//     const validateOtp = () => {
//         if (formData.otp.trim().length === 0) {
//             errors.otp = "OTP field cannot be empty";
//         } else if (!isNumeric(formData.otp)) {
//             errors.otp = "OTP should contain only digits";
//         } else if (formData.otp.length !== 6) {
//             errors.otp = "OTP should be 6 digits long";
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         validateOtp();
//         if (Object.keys(errors).length > 0) {
//             setClientErrors(errors);
//         } else {
//             setClientErrors(null);
//             const result = await dispatch(verifyEmail(formData));
//             if (result.type === verifyEmail.fulfilled.type) {
//                 dispatch(getUser());
//                 navigate("/");
//             } else {
//                 console.log("Login failed", result.error);
//             }
//         }
//     };

//     return (
//         <div>
//             {isLoading && <RegisterLoading />}
//             <div>
//                 <form onSubmit={handleSubmit}>
//                     {!otpSent && (
//                         <div>
//                             <div>
//                                 <label>Email:</label>
//                                 <input
//                                     type="text"
//                                     value={formData.email}
//                                     placeholder="Enter your Email"
//                                     autoFocus
//                                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                                 />
//                                 {clientErrors?.input && <span>{clientErrors.input}</span>}
//                             </div>
//                             <div>
//                                 {serverError && serverError.map((ele, i) => (
//                                     <li key={i}>{ele.msg}</li>
//                                 ))}
//                             </div>
//                             <div>
//                                 <input
//                                     type="submit"
//                                     value="Send OTP"
//                                     onClick={handleSendOtp}
//                                 />
//                             </div>
//                         </div>
//                     )}
//                     {otpSent && (
//                         <div>
//                             <p>OTP Verification</p>
//                             <div>
//                                 <p>We have sent the One-Time-Password (OTP) to your email - {formData.email}</p>
//                             </div>
//                             <div>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter OTP here"
//                                     value={formData.otp}
//                                     onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
//                                 />
//                                 {clientErrors?.otp && <span>{clientErrors.otp}</span>}
//                             </div>
//                             <div>
//                                 {serverError && serverError.map((ele, i) => (
//                                     <li key={i}>{ele.msg}</li>
//                                 ))}
//                             </div>
//                             <div>
//                                 <input
//                                     type="submit"
//                                     value="Submit"
//                                 />
//                             </div>
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EmailLogin;








import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isEmail, isNumeric } from "validator";
import { useSelector, useDispatch } from "react-redux";
import RegisterLoading from "./RegisterLoading";
import { verifyEmail, sendEmailOtp, getUser } from "../../slices/AuthSlice";
import { Mail } from "lucide-react";
import petImage from "../image/petImage7.jpg"

const EmailLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { otpSent, isLoading, serverError } = useSelector(state => state.auth);
    console.log(serverError)
    const [formData, setFormData] = useState({ email: "", otp: "" });
    const [clientErrors, setClientErrors] = useState(null);
    const errors = {};

    const validateEmail = () => {
        if (formData.email.trim().length === 0) {
            errors.input = "Email field cannot be empty";
        } else if (!isEmail(formData.email)) {
            errors.input = "Enter a valid email address";
        }
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        validateEmail();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            setClientErrors(null);
            dispatch(sendEmailOtp(formData));
        }
    };

    const validateOtp = () => {
        if (formData.otp.trim().length === 0) {
            errors.otp = "OTP field cannot be empty";
        } else if (!isNumeric(formData.otp)) {
            errors.otp = "OTP should contain only digits";
        } else if (formData.otp.length !== 6) {
            errors.otp = "OTP should be 6 digits long";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateOtp();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            setClientErrors(null);
            const result = await dispatch(verifyEmail(formData));
            if (result.type === verifyEmail.fulfilled.type) {
                dispatch(getUser());
                navigate("/");
            }
        }
    };

    return (
        <div  className="min-h-screen flex items-center justify-center"
                    style={{ backgroundImage: `url(${petImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {isLoading && <RegisterLoading />}
            <div className=" p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Email Login</h2>
                <form onSubmit={handleSubmit}>
                    {!otpSent && (
                        <div>
                            <div className="relative mb-4">
                                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={formData.email}
                                    placeholder="Enter your Email"
                                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoFocus
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                {clientErrors?.input && <p className="text-red-500 text-sm mt-1">{clientErrors.input}</p>}
                            </div>
                            {serverError && serverError.length > 0 && serverError.map((ele, i) => (
                                <p key={i} className="text-red-500 text-sm">{ele.msg}</p>
                            ))}

                            <button
                                type="button"
                                onClick={handleSendOtp}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Send OTP
                            </button>
                        </div>
                    )}
                    {otpSent && (
                        <div>
                            <p className="text-center text-gray-700 mb-4">We have sent an OTP to {formData.email}</p>
                            <input
                                type="text"
                                placeholder="Enter OTP here"
                                value={formData.otp}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                            />
                            {clientErrors?.otp && <p className="text-red-500 text-sm mt-1">{clientErrors.otp}</p>}
                            {serverError && serverError.map((ele, i) => (
                                <p key={i} className="text-red-500 text-sm">{ele.msg}</p>
                            ))}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EmailLogin;