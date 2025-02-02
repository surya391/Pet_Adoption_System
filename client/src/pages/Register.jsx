// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate } from "react-router-dom";
// // import { userRegister } from "../slices/AuthSlice";
// // import { isEmail, isNumeric, isStrongPassword } from "validator";
// // import { toast, ToastContainer } from "react-toastify";
// // import { FiEye, FiEyeOff } from "react-icons/fi";
// // // import Spinner from "./Spinner"; 
// // // import "react-toastify/dist/ReactToastify.css";

// // const Register = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { isLoading, serverError } = useSelector((state) => state.auth);

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phoneNumber: "",
// //     role: "serviceProvider",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   const [click, setClick] = useState(false);
// //   const [isChecked, setIsChecked] = useState(false);
// //   const [clientErrors, setClientErrors] = useState({});
// //   const errors = {};

// //   const handleCheckedBoxChange = () => {
// //     setIsChecked(!isChecked);
// //   };

// //   const handleRoleChange = () => {
// //     setFormData({
// //         ...formData,
// //       role: formData.role === "serviceProvider"? "owner" : "serviceProvider"
// //     });
// //   };

// //   const validateInput = () => {
// //     if (formData.name.trim().length === 0) {
// //       errors.name = "Name field cannot be empty";
// //     }

// //     if (formData.email.trim().length === 0) {
// //       errors.email = "Email field cannot be empty";
// //     } else if (!isEmail(formData.email)) {
// //       errors.email = "Enter a valid email format";
// //     }

// //     if (formData.phoneNumber.trim().length === 0) {
// //       errors.phoneNumber = "Phone number field cannot be empty";
// //     }  else if (formData.phoneNumber.trim().length !== 10) {
// //       errors.phoneNumber = "Phone number should be 10 digits";
// //     }

// //     if (formData.password.trim().length === 0) {
// //       errors.password = "Password field cannot be empty";
// //     } else if (!isStrongPassword(formData.password, { minLength: 5 })) {
// //       errors.password =
// //         "Password must include at least 5 characters, one lowercase letter, one uppercase letter, one number, and one special character.";
// //     }

// //     if (formData.confirmPassword.trim().length === 0) {
// //       errors.confirmPassword = "Confirm password field cannot be empty";
// //     } else if (formData.password !== formData.confirmPassword) {
// //       errors.confirmPassword = "Password and Confirm password must match";
// //     }

// //     if (!isChecked) {
// //       errors.isChecked = "You must agree to the terms and conditions";
// //     }
// //   };
// // console.log(formData)
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     validateInput();
// //     if (Object.keys(errors).length !== 0) {
// //       setClientErrors(errors);
// //     } else {
// //       setClientErrors({});
// //         const actionResult = await dispatch(userRegister(formData));
// //         if (actionResult.type === userRegister.fulfilled.type) {
// //             toast.success('User register successfully')
// //           navigate("/login");
// //         }
// //     }
// //   };

// //   return (
// //     <div>
// //       <div>
// //         <div>
// //           <span>
// //             <Link to="/register"> Register </Link>
// //           </span>
// //           <span>
// //             <Link to="/login"> Login </Link>
// //           </span>
// //         </div>
// //       </div>
// //       <div>
// //         <div>
// //           <form onSubmit={handleSubmit}>
// //             <div>
// //               <p>pet adoption</p>
// //               {formData.role === "serviceProvider" ? (
// //                 <p>
// //                   <span> Are you a owner? </span>
// //                   <span onClick={handleRoleChange}> Register</span>
// //                 </p>
// //               ) : (
// //                 <p>
// //                   <span onClick={handleRoleChange}> Not a Owner? </span>
// //                 </p>
// //               )}
// //             </div>
// //             <div>
// //               <label> User Name: </label>
// //               <input
// //                 type="text"
// //                 value={formData.name}
// //                 placeholder="User Name"
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, name: e.target.value })
// //                 }
// //               />
// //               {clientErrors?.name && <span>{clientErrors?.name}</span>}
// //             </div>
// //             <div>
// //               <label>Email ID:</label>
// //               <input
// //                 type="text"
// //                 value={formData.email}
// //                 placeholder="Email ID"
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, email: e.target.value })
// //                 }
// //               />
// //               {clientErrors?.email && <span>{clientErrors?.email}</span>}
// //             </div>
// //             <div>
// //               <label>Phone Number:</label>
// //               <input
// //                 type="text"
// //                 value={formData.phoneNumber}
// //                 placeholder="Phone Number"
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, phoneNumber: e.target.value })
// //                 }
// //               />
// //               {clientErrors?.phoneNumber && (
// //                 <span>{clientErrors?.phoneNumber}</span>
// //               )}
// //             </div>
// //             <div>
// //               <label>Password:</label>
// //               <input
// //                 type="password"
// //                 value={formData.password}
// //                 placeholder="Password"
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, password: e.target.value })
// //                 }
// //               />
// //               {clientErrors?.password && <span>{clientErrors?.password}</span>}
// //             </div>
// //             <div>
// //               <label>Confirm Password:</label>
// //               <div>
// //                 <input
// //                   type={click ? "text" : "password"}
// //                   value={formData.confirmPassword}
// //                   placeholder="Confirm Password"
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, confirmPassword: e.target.value })
// //                   }
// //                 />
// //                 {click ? (
// //                   <FiEyeOff onClick={() => setClick(!click)} />
// //                 ) : (
// //                   <FiEye onClick={() => setClick(!click)} />
// //                 )}
// //               </div>
// //               {clientErrors?.confirmPassword && (
// //                 <span>{clientErrors?.confirmPassword}</span>
// //               )}
// //             </div>
// //             <div>
// //               <input
// //                 type="checkbox"
// //                 checked={isChecked}
// //                 onChange={handleCheckedBoxChange}
// //               />
// //               <span>Agree with Terms & conditions of Doczy</span>
// //               {clientErrors?.isChecked && <span>{clientErrors?.isChecked}</span>}
// //             </div>
// //             <div>
// //               {serverError &&
// //                 serverError.map((ele, i) => <li key={i}>{ele.msg}</li>)}
// //             </div>
// //             <div>
// //               <input type="submit" value="Register" />
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={2000}
// //         hideProgressBar={false}
// //         newestOnTop={false}
// //         closeOnClick
// //         rtl={false}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //         theme="light"
// //       />
// //     </div>
// //   );
// // };

// // export default Register;   
    


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { userRegister } from "../slices/AuthSlice";
// import { isEmail, isStrongPassword } from "validator";
// import { toast, ToastContainer } from "react-toastify";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import "react-toastify/dist/ReactToastify.css";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, serverError } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     role: "serviceProvider",
//     password: "",
//     confirmPassword: "",
//   });

//   const [click, setClick] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const [clientErrors, setClientErrors] = useState({});
//   const errors = {};

//   const handleCheckedBoxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   const handleRoleChange = () => {
//     setFormData({
//       ...formData,
//       role: formData.role === "serviceProvider" ? "owner" : "serviceProvider",
//     });
//   };

//   const validateInput = () => {
//     if (formData.name.trim().length === 0) {
//       errors.name = "Name field cannot be empty";
//     }

//     if (formData.email.trim().length === 0) {
//       errors.email = "Email field cannot be empty";
//     } else if (!isEmail(formData.email)) {
//       errors.email = "Enter a valid email format";
//     }

//     if (formData.phoneNumber.trim().length === 0) {
//       errors.phoneNumber = "Phone number field cannot be empty";
//     } else if (formData.phoneNumber.trim().length !== 10) {
//       errors.phoneNumber = "Phone number should be 10 digits";
//     }

//     if (formData.password.trim().length === 0) {
//       errors.password = "Password field cannot be empty";
//     } else if (!isStrongPassword(formData.password, { minLength: 5 })) {
//       errors.password =
//         "Password must include at least 5 characters, one lowercase letter, one uppercase letter, one number, and one special character.";
//     }

//     if (formData.confirmPassword.trim().length === 0) {
//       errors.confirmPassword = "Confirm password field cannot be empty";
//     } else if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = "Password and Confirm password must match";
//     }

//     if (!isChecked) {
//       errors.isChecked = "You must agree to the terms and conditions";
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     validateInput();
//     if (Object.keys(errors).length !== 0) {
//       setClientErrors(errors);
//     } else {
//       setClientErrors({});
//       const actionResult = await dispatch(userRegister(formData));
//       if (actionResult.type === userRegister.fulfilled.type) {
//         toast.success("User register successfully");
//         navigate("/login");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-pet-image.jpg')" }}>
//       <div className="flex justify-center items-center h-full bg-black bg-opacity-50">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//           <div className="text-center mb-4">
//             <h2 className="text-2xl font-bold text-gray-700">Register</h2>
//             <div className="mt-2">
//               {formData.role === "serviceProvider" ? (
//                 <p className="text-sm text-gray-600">
//                   Are you an owner?{" "}
//                   <span
//                     onClick={handleRoleChange}
//                     className="text-blue-500 cursor-pointer hover:underline"
//                   >
//                     Register
//                   </span>
//                 </p>
//               ) : (
//                 <p className="text-sm text-gray-600">
//                   Not an Owner?{" "}
//                   <span
//                     onClick={handleRoleChange}
//                     className="text-blue-500 cursor-pointer hover:underline"
//                   >
//                     Switch to Service Provider
//                   </span>
//                 </p>
//               )}
//             </div>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700">User Name</label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 placeholder="User Name"
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {clientErrors?.name && <span className="text-red-500">{clientErrors?.name}</span>}
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700">Email ID</label>
//               <input
//                 type="text"
//                 value={formData.email}
//                 placeholder="Email ID"
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {clientErrors?.email && <span className="text-red-500">{clientErrors?.email}</span>}
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700">Phone Number</label>
//               <input
//                 type="text"
//                 value={formData.phoneNumber}
//                 placeholder="Phone Number"
//                 onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {clientErrors?.phoneNumber && <span className="text-red-500">{clientErrors?.phoneNumber}</span>}
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 value={formData.password}
//                 placeholder="Password"
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {clientErrors?.password && <span className="text-red-500">{clientErrors?.password}</span>}
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700">Confirm Password</label>
//               <div className="relative">
//                 <input
//                   type={click ? "text" : "password"}
//                   value={formData.confirmPassword}
//                   placeholder="Confirm Password"
//                   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                   className="w-full p-2 border rounded-md"
//                 />
//                 {click ? (
//                   <FiEyeOff
//                     onClick={() => setClick(!click)}
//                     className="absolute top-3 right-3 text-gray-600 cursor-pointer"
//                   />
//                 ) : (
//                   <FiEye
//                     onClick={() => setClick(!click)}
//                     className="absolute top-3 right-3 text-gray-600 cursor-pointer"
//                   />
//                 )}
//               </div>
//               {clientErrors?.confirmPassword && <span className="text-red-500">{clientErrors?.confirmPassword}</span>}
//             </div>

//             <div className="flex items-center mb-4">
//               <input
//                 type="checkbox"
//                 checked={isChecked}
//                 onChange={handleCheckedBoxChange}
//                 className="mr-2"
//               />
//               <span className="text-sm text-gray-600">
//                 Agree with <span className="text-blue-500 cursor-pointer hover:underline">Terms & Conditions</span>
//               </span>
//               {clientErrors?.isChecked && <span className="text-red-500">{clientErrors?.isChecked}</span>}
//             </div>

//             {serverError &&
//               serverError.map((ele, i) => <li key={i} className="text-red-500">{ele.msg}</li>)}

//             <div className="mb-4">
//               <button
//                 type="submit"
//                 className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../slices/AuthSlice";
import { isEmail, isStrongPassword } from "validator";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import petImage from './image/petImage.jpg';  
import Spinner from "./Frontpage/Spinner";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, serverError } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "serviceProvider",
    password: "",
    confirmPassword: "",
  });

  const [click, setClick] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [clientErrors, setClientErrors] = useState({});
  const errors = {};

  const handleRoleChange = () => {
    setFormData({
      ...formData,
      role: formData.role === "serviceProvider" ? "owner" : "serviceProvider",
    });
  };
  const handleCheckedBoxChange = () => {
    setIsChecked(!isChecked);
  };
  const validateInput = () => {
    if (formData.name.trim().length === 0) {
      errors.name = "Name field cannot be empty";
    }
    if (formData.email.trim().length === 0) {
      errors.email = "Email field cannot be empty";
    } else if (!isEmail(formData.email)) {
      errors.email = "Enter a valid email format";
    }
    if (formData.phoneNumber.trim().length === 0) {
      errors.phoneNumber = "Phone number field cannot be empty";
    } else if (formData.phoneNumber.trim().length !== 10) {
      errors.phoneNumber = "Phone number should be 10 digits";
    }
    if (formData.password.trim().length === 0) {
      errors.password = "Password field cannot be empty";
    } else if (!isStrongPassword(formData.password, { minLength: 5 })) {
      errors.password =
        "Password must include at least 5 characters, one lowercase letter, one uppercase letter, one number, and one special character.";
    }
    if (formData.confirmPassword.trim().length === 0) {
      errors.confirmPassword = "Confirm password field cannot be empty";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Password and Confirm password must match";
    }
    if (!isChecked) {
      errors.isChecked = "You must agree to the terms and conditions";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateInput();
    if (Object.keys(errors).length !== 0) {
      setClientErrors(errors);
    } else {
      setClientErrors({});
      const actionResult = await dispatch(userRegister(formData));
      console.log("ffa:",actionResult.type === userRegister.fulfilled.type)
      if (actionResult.type === userRegister.fulfilled.type) {
        // toast.success("User registered successfully!");
        navigate("/login");
      }
    }

    // toast.success("user")
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-10">
      {isLoading && <Spinner />}
      <div className="container mx-auto flex flex-wrap justify-center md:justify-end px-6   bg-opacity-90 backdrop-blur-lg p-8">
      <div className="w-full md:w-1/2 p-8 bg-white text-gray-800">
        <img
          src={petImage}
          alt="application Info page"
          className="rounded-lg mt-38 w-full "
          style={{
            backgroundColor: 'transparent',
          }}
        />
      </div>
        <div className="w-full md:w-1/2 p-8 bg-white  text-gray-800">

          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-yellow-500">Register</h2>
            <div className="mt-2">
              {formData.role === "serviceProvider" ? (
                <p className="text-sm text-gray-600">
                  Are you an owner?{" "}
                  <span
                    onClick={handleRoleChange}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Register
                  </span>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Not an Owner?{" "}
                  <span
                    onClick={handleRoleChange}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Switch to Service Provider
                  </span>
                </p>
              )}
            </div>

          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">User Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-800 border-gray-300 focus:border-yellow-400 outline-none"
              />
              {clientErrors?.name && <span className="text-red-400">{clientErrors.name}</span>}
            </div>
            <div>
              <label className="block text-gray-700">Email ID</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-800 border-gray-300 focus:border-yellow-400 outline-none"
              />
              {clientErrors?.email && <span className="text-red-400">{clientErrors.email}</span>}
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-800 border-gray-300 focus:border-yellow-400 outline-none"
              />
              {clientErrors?.phoneNumber && <span className="text-red-400">{clientErrors.phoneNumber}</span>}
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-800 border-gray-300 focus:border-yellow-400 outline-none"
              />
              {clientErrors?.password && <span className="text-red-400">{clientErrors.password}</span>}
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={click ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-800 border-gray-300 focus:border-yellow-400 outline-none"
                />
                {click ? (
                  <FiEyeOff onClick={() => setClick(!click)} className="absolute top-3 right-3 text-gray-400 cursor-pointer" />
                ) : (
                  <FiEye onClick={() => setClick(!click)} className="absolute top-3 right-3 text-gray-400 cursor-pointer" />
                )}
              </div>
              {clientErrors?.confirmPassword && <span className="text-red-400">{clientErrors.confirmPassword}</span>}
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckedBoxChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">
                Agree with <span className="text-blue-500 cursor-pointer hover:underline">Terms & Conditions</span>
              </span>
              {clientErrors?.isChecked && <span className="text-red-500">{clientErrors?.isChecked}</span>}
            </div>
            {serverError &&
              serverError.map((ele, i) => <li key={i} className="text-red-500">{ele.msg}</li>)}
            <button type="submit" className="w-full p-3 bg-yellow-500 text-gray-800 rounded-md font-semibold hover:bg-yellow-400 transition">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
