// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux"
// import {  useLocation, useNavigate } from "react-router-dom";
// // import InfoPage from "../../images/InfoPage.jpg"
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { updatePassword } from "../../slices/ProfileSlice"; 
// import { isStrongPassword } from "validator";
// import Spinner from "./Spinner";

// const ChangePassword = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
   
//     const location = useLocation();
//     const { isLoading, serverError } = useSelector(state => state.profile);
//     const [formData, setFormData] = useState({
//         password: "",
//         confirmPassword: ""
//     });
//     const [click, setClick] = useState(false);
//     const [clientErrors, setClientErrors] = useState(null);
//     const errors = {};
    
 
//     const validateInput = () => {
//         if (formData.password.trim().length === 0) {
//             errors.password = "Password field can not be empty"
//         } else if (!isStrongPassword(formData.password)) {
//             errors.password = "Password should atleast contain One UppeerCase one LowerCase one Number and One Symbol with minimum 8 character";
//         } else if (formData.confirmPassword.trim().length === 0) {
//             console.log("filed is emapty")
//             errors.confirmPassword = " Confirm Password field can not be empty";
//         } else if (!(formData.password.trim() === formData.confirmPassword.trim())) {
//             errors.confirmPassword = "Password and Confirm Password should be same";
//         }
//     }
   
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         validateInput();
//         if (Object.keys(errors).length !== 0) {
//             setClientErrors(errors)
//         } else {
//             setClientErrors({})
//             const actionResult = await dispatch(updatePassword({  updatedPassword: formData.password }));
//             if (actionResult.type === updatePassword.fulfilled.type) {
//                 navigate("/profilepage");
//             }
//         }
//     }
//     return (
//         <div className="max-w-screen-xl h-auto mb-24">
//             {isLoading && <Spinner />}
            
//             <div className="flex justify-between items-center h-96">
               
//                 <div className="w-1/2 h-auto flex max-w-screen-sm  mt-10">
//                     <div className="bg-inherit  " >
//                         <div className="bg-white p-7 rounded-lg shadow-md w-96 h-auto ml-auto mr-auto  mt-10 overflow-y-auto">
//                             <div className="flex justify-center mb-4">
//                                 <h3 className=" font-semibold"> Change Your Password</h3>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 <div className=" mb-7 block ">
//                                     <label htmlFor="password" className="ml-1 block text-sm font-medium text-gray-700"> New Password  : </label>
//                                     <div className="relative">
//                                         <input
//                                             type="password"
//                                             name="password"
//                                             id="password"
//                                             value={formData.password}
//                                             onChange={(e) => {
//                                                 setFormData({ ...formData, password: e.target.value })
//                                             }}
//                                             placeholder="Enter your New Password ..."
//                                             className={`flex p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100 pr-10 ${clientErrors?.password ? "border-2 border-b-red-400" : "border"}`}
//                                         />

//                                     </div>
//                                     {clientErrors?.password && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.password}</span>}
//                                 </div>
//                                 <div className=" mb-7 block ">
//                                     <label htmlFor="confirmPassword" className="ml-1 block text-sm font-medium text-gray-700"> Confirm your new Password    : </label>
//                                     <div className="relative">
//                                         <input
//                                             type={click ? "text" : "password"}
//                                             name="confirmPassword"
//                                             id="confirmPassword"
//                                             value={formData.confirmPassword}
//                                             onChange={(e) => {
//                                                 setFormData({ ...formData, confirmPassword: e.target.value })
//                                             }}
//                                             placeholder="Confirm your new Password ...  "
//                                             className={`flex p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100 pr-10 ${clientErrors?.confirmPassword ? "border-2 border-b-red-400" : "border"}`}
//                                         />
//                                         {click ? <>
//                                             <FiEyeOff className="absolute  right-2  top-1/2 transform -translate-y-1/2"
//                                                 onClick={() => {
//                                                     setClick(!click)
//                                                 }}
//                                             />
//                                         </> : <>
//                                             <FiEye className="absolute  right-2  top-1/2 transform -translate-y-1/2"
//                                                 onClick={() => {
//                                                     setClick(!click)
//                                                 }}
//                                             />
//                                         </>}
//                                     </div>
//                                     {clientErrors?.confirmPassword && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.confirmPassword}</span>}
//                                 </div>

//                                 <div >
//                                     {
//                                         serverError && serverError.map((ele, i) => {
//                                             return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
//                                         })
//                                     }
//                                 </div>
//                                 <div className="  mt-2 mb-2 flex justify-center items-center ">
//                                     <input type="submit"
//                                         value="Update Password"
//                                         className="border rounded-md  bg-blue-400  text-white font-semibold  w-auto px-3 py-1 cursor-pointer hover:bg-blue-600 focus:outline-none active:bg-blue-800"
//                                     />
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default ChangePassword;










import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { updatePassword } from "../../slices/ProfileSlice"; 
import { isStrongPassword } from "validator";
import Spinner from "./Spinner";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, serverError } = useSelector(state => state.profile);
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [click, setClick] = useState(false);
    const [clientErrors, setClientErrors] = useState(null);
    const errors = {};

    const validateInput = () => {
        if (!formData.password.trim()) {
            errors.password = "Password field cannot be empty";
        } else if (!isStrongPassword(formData.password)) {
            errors.password = "Password must have at least one uppercase, one lowercase, one number, and one symbol (min 8 characters)";
        }
        if (!formData.confirmPassword.trim()) {
            errors.confirmPassword = "Confirm Password field cannot be empty";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords must match";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateInput();
        if (Object.keys(errors).length !== 0) {
            setClientErrors(errors);
        } else {
            setClientErrors({});
            const actionResult = await dispatch(updatePassword({ updatedPassword: formData.password }));
            if (actionResult.type === updatePassword.fulfilled.type) {
                navigate("/profilepage");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            {isLoading && <Spinner />}
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold text-center mb-4">Change Your Password</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password:
                        </label>
                        <div className="relative mt-2">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Enter your new password..."
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                                    clientErrors?.password ? "border-red-400" : "border-gray-300"
                                }`}
                            />
                        </div>
                        {clientErrors?.password && (
                            <span className="text-sm text-red-500 font-medium">{clientErrors.password}</span>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm New Password:
                        </label>
                        <div className="relative mt-2">
                            <input
                                type={click ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                placeholder="Confirm your new password..."
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                                    clientErrors?.confirmPassword ? "border-red-400" : "border-gray-300"
                                }`}
                            />
                            {/* Toggle Visibility */}
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={() => setClick(!click)}
                            >
                                {click ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {clientErrors?.confirmPassword && (
                            <span className="text-sm text-red-500 font-medium">{clientErrors.confirmPassword}</span>
                        )}
                    </div>

                    {/* Server Errors */}
                    {serverError?.length > 0 && (
                        <ul className="text-sm font-semibold text-red-500 opacity-80">
                            {serverError.map((ele, i) => (
                                <li key={i}>{ele.msg}</li>
                            ))}
                        </ul>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
