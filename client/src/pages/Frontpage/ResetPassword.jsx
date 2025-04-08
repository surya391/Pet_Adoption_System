import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom";
// import InfoPage from "../../images/InfoPage.jpg"
import { resetPassword } from "../../slices/AuthSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { isStrongPassword } from "validator";
import Spinner from "./Spinner";
import petImage from "../image/petImage9.jpg";
import { ToastContainer } from "react-toastify";


const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");
    const token = queryParams.get("token");
    const { isLoading, serverError } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [click, setClick] = useState(false);
    const [clientErrors, setClientErrors] = useState(null);
    const errors = {};
    
    if (!userId || !token) {
        return navigate("/login")
    }
    
    const validateInput = () => {
        if (formData.password.trim().length === 0) {
            errors.password = "Password field can not be empty"
        } else if (!isStrongPassword(formData.password)) {
            errors.password = "Password should atleast contain One UppeerCase one LowerCase one Number and One Symbol with minimum 8 character";
        } else if (formData.confirmPassword.trim().length === 0) {
            console.log("filed is emapty")
            errors.confirmPassword = " Confirm Password field can not be empty";
        } else if (!(formData.password.trim() === formData.confirmPassword.trim())) {
            errors.confirmPassword = "Password and Confirm Password should be same";
        }
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        validateInput();
        if (Object.keys(errors).length !== 0) {
            setClientErrors(errors)
        } else {
            setClientErrors({})
            const actionResult = await dispatch(resetPassword({ userId, token, password: formData.password }));
            if (actionResult.type === resetPassword.fulfilled.type) {
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        }
    }
    return (
        <div   className="min-h-screen flex flex-col items-center justify-center relative"
                    style={{ 
                        backgroundImage: `url(${petImage})`, 
                        backgroundSize: "cover", 
                        backgroundPosition: "center" 
                    }}>
            {isLoading && <Spinner />}
            <div className="flex items-center justify-center h-auto">
                <div className="w-2/3  font-bold opacity-70 bg-inherit  shadow-lg flex justify-center ">
                    <span className={
                        `${location.pathname === "/register" ? " text-blue-600 border-b-2 border-blue-600" : ""}  p-3  mr-10 `
                    } > <Link to="/register" > Register </Link></span>
                    <span className="p-3 ml-10"> <Link to="/login" > Login </Link></span>
                </div>
            </div>
            <div className="flex justify-between items-center h-96">

                <div className=" w-full flex justify-center pr-200">
                    <div className="bg-inherit  " >
                        <div className=" p-7 rounded-lg shadow-md w-96 h-auto ml-auto mr-auto  mt-10 overflow-y-auto">
                            <div className="flex justify-center mb-4">
                                <h3 className=" font-semibold"> Reset Your Password</h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className=" mb-7 block ">
                                    <label htmlFor="password" className="ml-1 block text-sm font-medium text-gray-700"> New Password  : </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={(e) => {
                                                setFormData({ ...formData, password: e.target.value })
                                            }}
                                            placeholder="Enter your New Password ..."
                                            className={`flex p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100 pr-10 ${clientErrors?.password ? "border-2 border-b-red-400" : "border"}`}
                                        />

                                    </div>
                                    {clientErrors?.password && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.password}</span>}
                                </div>
                                <div className=" mb-7 block ">
                                    <label htmlFor="confirmPassword" className="ml-1 block text-sm font-medium text-gray-700"> Confirm your new Password    : </label>
                                    <div className="relative">
                                        <input
                                            type={click ? "text" : "password"}
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={(e) => {
                                                setFormData({ ...formData, confirmPassword: e.target.value })
                                            }}
                                            placeholder="Confirm your new Password ...  "
                                            className={`flex p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100 pr-10 ${clientErrors?.confirmPassword ? "border-2 border-b-red-400" : "border"}`}
                                        />
                                        {click ? <>
                                            <FiEyeOff className="absolute  right-2  top-1/2 transform -translate-y-1/2"
                                                onClick={() => {
                                                    setClick(!click)
                                                }}
                                            />
                                        </> : <>
                                            <FiEye className="absolute  right-2  top-1/2 transform -translate-y-1/2"
                                                onClick={() => {
                                                    setClick(!click)
                                                }}
                                            />
                                        </>}
                                    </div>
                                    {clientErrors?.confirmPassword && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.confirmPassword}</span>}
                                </div>

                                <div >
                                    {
                                        serverError && serverError.map((ele, i) => {
                                            return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
                                        })
                                    }
                                </div>
                                <div className="  mt-2 mb-2 flex justify-center items-center ">
                                    <input type="submit"
                                        value="Reset Password"
                                        className="border rounded-md  bg-blue-400  text-white font-semibold  w-auto px-3 py-1 cursor-pointer hover:bg-blue-600 focus:outline-none active:bg-blue-800"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}
export default ResetPassword;