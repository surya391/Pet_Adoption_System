import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmail } from "validator";
import { forgotPassword } from "../../slices/AuthSlice";
import Spinner from "./Spinner";
import petImage from "../image/petImage8.jpg";
import { ToastContainer } from "react-toastify";


const ForgotPassword = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, serverError } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [clientErrors, setClientErrors] = useState(null);
    const errors = {};

    const validateInput = () => {
        if (!isEmail(email)) {
            errors.email = "Enter the Proper Email Format";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateInput();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            setClientErrors({});
            const actionResult = await dispatch(forgotPassword(email));
            console.log(actionResult)
            if (actionResult.type === forgotPassword.fulfilled.type) {
                // toast.success('wow')
                // navigate("/login");
                // toast.success("Your Password Has Been Reset Successfully");

                // Delay navigation by 5 seconds (5000 milliseconds)
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        }
    };

    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center relative"
            style={{ 
                backgroundImage: `url(${petImage})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center" 
            }}
        >
            {isLoading && <Spinner />}
            {/* Navigation Bar */}
            <div className="absolute top-5 left-10 right-0 flex justify-center">
                <div className="flex gap-6 bg-white shadow-md px-6 py-2 rounded-full opacity-80">
                    <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
                    <Link to="/login" className={`${location.pathname === "/login" ? "border-b-2 border-blue-600" : ""} text-blue-600 font-semibold`}>
                        Login
                    </Link>
                </div>
            </div>

            {/* Forgot Password Form */}
            
            <div className=" w-full flex justify-center pl-100">
            <div className="bg-white p-8  rounded-lg shadow-md w-96 mt-16 mb-10">
                <h3 className="font-semibold text-sm mb-3 text-center">
                    Enter your Registered Email
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-7">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your Registered email"
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-2 mt-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 
                                ${clientErrors?.email ? "border-red-400" : "border-gray-300"}`}
                        />
                        {clientErrors?.email && (
                            <span className="text-sm text-red-400 font-semibold">
                                {clientErrors.email}
                            </span>
                        )}
                    </div>

                    {serverError && serverError.map((ele, i) => (
                        <li key={i} className="text-sm font-semibold text-red-500 opacity-80">{ele.msg}</li>
                    ))}

                    <div className="mt-4 flex justify-center">
                        <input
                            type="submit"
                            value="Generate Link"
                            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none"
                        />
                    </div>
                </form>
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
    );
};

export default ForgotPassword;











// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux"
// import { isEmail } from "validator";
// import { userLogin, forgotPassword } from "../../slices/AuthSlice";
// import Spinner from "./Spinner";
// // import InfoPage from "../../images/InfoPage.jpg"
// // import petImage from "../image/petImage8"
// import petImage from "../image/petImage8.jpg";

// const ForgotPassword = () => {
//     const location = useLocation();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { isLoading, serverError } = useSelector((state) => state.auth);
//     const [email, setEmail] = useState("");
//     const [clientErrors, setClientErrors] = useState(null);
//     const errors = {}
  
//     const validateInput = () => {
//         if (!isEmail(email)) {
//             errors.email = "Enter the Proper Email Format"
//         }
//     }
 
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         validateInput();
//         if (Object.keys(errors).length > 0) {
//             setClientErrors(errors);
//         } else {
//             setClientErrors({}); 
//             const actionResult = await dispatch(forgotPassword(email));
//             if (actionResult.type === forgotPassword.fulfilled.type) {
//                 navigate("/");
//             }
//         }
//     }
//     return (
//         <div className="max-w-screen-xl h-auto   ">
//             {isLoading && <Spinner />}
//             <div className="flex items-center justify-center h-auto">
//                 <div className="w-2/3  font-bold opacity-70 bg-inherit  shadow-lg flex justify-center ">
//                     <span className="p-3 mr-10"> <Link to="/register" > Register </Link></span>
//                     <span className={
//                         `${location.pathname === "/login" ? " text-blue-600 border-b-2 border-blue-600" : ""}  p-3  ml-10 `
//                     } > <Link to="/login" > Login </Link></span>
//                 </div>
//             </div>
//             <div className="flex justify-between items-center h-96 mb-24 ">
//                 {/* <div className="w-1/2 h-full flex justify-center items-center">
//                     <img
//                         src={petImage}
//                         alt="application Info page"
//                         className="rounded-lg mt-24"
//                         height="350"
//                         width="350"
//                         style={{
//                             backgroundColor: 'transparent'
//                         }}
//                     />
//                 </div> */}
//                 <div className="w-1/2 h-full flex max-w-screen-sm ">
//                     <div className=" bg-inherit  mt-6" >
//                         <div className="bg-white p-8 rounded-lg shadow-md w-96  mt-10   mb-20">
//                             <h3 className=" font-semibold text-sm mb-3"> Enter your Registered email to get Reset Password Link</h3>
//                             <form onSubmit={handleSubmit}   >
//                                 <div className=" mb-7 block ">
//                                     <label  htmlFor = "email"className="   ml-1 block   text-sm font-medium text-gray-700">Email : </label>
//                                     <input
//                                         type="text"
//                                         id ="email"
//                                         name = "email"
//                                         value={email}
//                                         placeholder="Enter your Registered email ..."
//                                         onChange={(e) => {
//                                             setEmail(e.target.value);
//                                         }}
//                                         className={
//                                             `${clientErrors?.email ? "border-2 border-b-red-400" : "border"}  p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100`
//                                         }
//                                     />
//                                     {clientErrors?.email && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.email}</span>}
//                                 </div>
                                
//                                 <div >
//                                     {
//                                         serverError && serverError.map((ele, i) => {
//                                             return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
//                                         })
//                                     }
//                                 </div>
//                                 <div className=" mt-2  mb-2 flex justify-center items-center ">
//                                     <input type="submit"
//                                         value="Get Link"
//                                         className="border rounded-md  bg-blue-400  text-white font-semibold  w-24 p-1 hover:bg-blue-600 focus:outline-none active:bg-blue-800"
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
// export default ForgotPassword;