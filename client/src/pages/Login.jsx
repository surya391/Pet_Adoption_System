import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmail } from 'validator';
import { userLogin, getUser } from "../slices/AuthSlice";
import { FiEyeOff, FiEye } from 'react-icons/fi';
import petImage from "./image/petImage5.jpg";

// import EmailLogin from "./Frontpage/EmailLogin";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, serverError } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [click, setClick] = useState(false);
    const [clientErrors, setClientErrors] = useState(null);
    const errors = {};

    const validateInput = () => {
        if (formData.email.trim().length === 0) {
            errors.email = "Email field can not be empty";
        } else if (!isEmail(formData.email)) {
            errors.email = "Enter the proper email format";
        }
        if (formData.password.trim().length === 0) {
            errors.password = "Password field cannot be empty";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateInput();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            setClientErrors({});

            const actionResult = await dispatch(userLogin(formData));
            if (actionResult.type === userLogin.fulfilled.type) {
                dispatch(getUser());
                navigate('/dashboard');
            }
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundImage: `url(${petImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="w-full ml-60 mr-auto sm:w-96  p-8  transition-transform duration-300">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-blue-600">Login</h2>
                    {/* <div className="mt-4 flex justify-between">
                        <span>
                            <Link to="/register" className="text-blue-500 hover:underline font-semibold">Register</Link>
                        </span>
                    </div> */}<br/>
                      <div className="text-left font-semibold text-black text-gray-600 mt-2 ">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="text-red-500 hover:underline font-semibold">
                            Register
                        </Link>
                    </p>
                </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Email ID</label>
                        <input
                            type="email"
                            value={formData.email}
                            placeholder="Enter your email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
                        />
                        {clientErrors?.email && <span className="text-red-500 text-xs">{clientErrors.email}</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={click ? "text" : "password"}
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
                            />
                            {click ? (
                                <FiEyeOff
                                    onClick={() => setClick(!click)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                />
                            ) : (
                                <FiEye
                                    onClick={() => setClick(!click)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                />
                            )}
                        </div>
                        {clientErrors?.password && <span className="text-red-500 text-xs">{clientErrors.password}</span>}
                    </div>
                    <div className="mb-4">
                        {serverError &&
                            serverError.map((ele, i) => <li key={i} className="text-red-500 text-sm">{ele.msg}</li>)}
                    </div>
                    <div className="mb-6">
                        <button type="submit" className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                            Login
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <p className="text-sm font-semibold text-gray-600 text-center hover:text-gray-800">
                            Login with{" "}
                            <span
                                className="cursor-pointer hover:underline text-blue-600"
                                onClick={() => navigate("/loginwithemail")}
                            >
                                Email
                            </span>
                        </p>
                    </div>

                    <div className="text-center font-semibold text-sm text-gray-600 mt-2 hover:text-gray-800">
                        <p>
                            Forgot password?{" "}
                            <Link to="/forgot-password" className="text-blue-500 hover:underline text-blue-600">
                                 Reset now
                            </Link>
                        </p>
                    </div>

                </form>
                {/* <div className="text-left font-semibold text-sm text-gray-600 mt-2 hover:text-gray-800">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="text-red-500 hover:underline font-semibold">
                            Register
                        </Link>
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default Login;





// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { isEmail } from 'validator'
// import { toast } from "react-toastify";
// import { userLogin, getUser } from "../slices/AuthSlice";
// import { FiEyeOff,FiEye } from 'react-icons/fi'

// const Login = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { isLoading, serverError } = useSelector((state) => state.auth);
//     const [formData, setFormData] = useState({
//         email: "",
//         password: ""
//     });
//     const [click, setClick] = useState(false);
//     const [clientErrors, setClientErrors] = useState(null);
//     const errors = {}

//     const validateInput = () => {
//         if (formData.email.trim().length === 0) {
//             errors.email = "Email field can not be empty"
//         } else if (!isEmail(formData.email)) {
//             errors.email = "Enter the proper email format"
//         }
//         if (formData.password.trim().length === 0) {
//             errors.password = "Password field cannot be empty"
//         }
//     }
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         validateInput();
//         if (Object.keys(errors).length > 0) {
//             setClientErrors(errors);
//         } else {
//             setClientErrors({});

//            const actionResult = await dispatch(userLogin(formData))
//            if(actionResult.type === userLogin.fulfilled.type){
//             dispatch(getUser());
//             toast.success("User Login Successfully", { authClose: 2000 });
//             navigate('/')
//            }
//         }
//     }
//     return (
//         <div>
//         {/* {isLoading && <Spinner />} */}
//         <div>
//           <div>
//             <span>
//               <Link to="/register">Register</Link>
//             </span>
//             <span>
//               <Link to="/login">Login</Link>
//             </span>
//           </div>
//         </div>
//         <div>
//           {/* <div>
//             <img src={InfoPage} alt="application Info page" />
//           </div> */}
//           <div>
//             <div>
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <label> Email ID:</label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     placeholder=" Email ID"
//                     onChange={(e) => setFormData({...formData, email:e.target.value})}
//                   />
//                   {clientErrors?.email && <span>{clientErrors.email}</span>}
//                 </div>
//                 <div>
//                   <label>Password:</label>
//                   <div>
//                     <input
//                       type={click ? "text" : "password"}
//                       value={formData.password}
//                       placeholder="Password"
//                       onChange={(e) => setFormData({...formData, password:e.target.value})}
//                     />
//                     {click ? (
//                       <FiEyeOff onClick={() => setClick(!click)} />
//                     ) : (
//                       <FiEye onClick={() => setClick(!click)} />
//                     )}
//                   </div>
//                   {clientErrors?.password && <span>{clientErrors.password}</span>}
//                 </div>
//                 <div>
//                   {serverError &&
//                     serverError.map((ele, i) => <li key={i}>{ele.msg}</li>)}
//                 </div>
//                 <div>
//                   <input type="submit" value="Login" />
//                 </div>
//                 <div>
//                   <p>Forgot password?</p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
// }



// export default Login




// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { isEmail } from 'validator'
// import { userLogin, getUser } from "../slices/AuthSlice";
// import { FiEyeOff, FiEye } from 'react-icons/fi';

// const Login = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { isLoading, serverError } = useSelector((state) => state.auth);
//     const [formData, setFormData] = useState({
//         email: "",
//         password: ""
//     });
//     const [click, setClick] = useState(false);
//     const [clientErrors, setClientErrors] = useState(null);
//     const errors = {};

//     const validateInput = () => {
//         if (formData.email.trim().length === 0) {
//             errors.email = "Email field can not be empty";
//         } else if (!isEmail(formData.email)) {
//             errors.email = "Enter the proper email format";
//         }
//         if (formData.password.trim().length === 0) {
//             errors.password = "Password field cannot be empty";
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         validateInput();
//         if (Object.keys(errors).length > 0) {
//             setClientErrors(errors);
//         } else {
//             setClientErrors({});

//             const actionResult = await dispatch(userLogin(formData));
//             if (actionResult.type === userLogin.fulfilled.type) {
//                 dispatch(getUser());
//                 // toast.success("User Login Successfully", { authClose: 2000 });
//                 navigate('/');
//             }
//         }
//     };

//     return (
//         <div className="bg-gray-50 min-h-screen flex items-center justify-center">
//             <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-md">
//                 <div className="text-center mb-6">
//                     <h2 className="text-3xl font-bold text-gray-700">Login</h2>
//                     <div className="mt-4 flex justify-between">
//                         <span>
//                             <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
//                         </span>
//                         {/* <span>
//                             <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
//                         </span> */}
//                     </div>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-semibold mb-2">Email ID</label>
//                         <input
//                             type="email"
//                             value={formData.email}
//                             placeholder="Email ID"
//                             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                         {clientErrors?.email && <span className="text-red-500 text-xs">{clientErrors.email}</span>}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
//                         <div className="relative">
//                             <input
//                                 type={click ? "text" : "password"}
//                                 value={formData.password}
//                                 placeholder="Password"
//                                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                             {click ? (
//                                 <FiEyeOff
//                                     onClick={() => setClick(!click)}
//                                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
//                                 />
//                             ) : (
//                                 <FiEye
//                                     onClick={() => setClick(!click)}
//                                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
//                                 />
//                             )}
//                         </div>
//                         {clientErrors?.password && <span className="text-red-500 text-xs">{clientErrors.password}</span>}
//                     </div>
//                     <div className="mb-4">
//                         {serverError &&
//                             serverError.map((ele, i) => <li key={i} className="text-red-500 text-sm">{ele.msg}</li>)}
//                     </div>
//                     <div className="mb-4">
//                         <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//                             Login
//                         </button>
//                     </div>
//                     <div className="text-center text-sm text-gray-600">
//                         <p>Forgot your password? <Link to="/forgot-password" className="text-blue-500 hover:underline">Reset it</Link></p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;



