// import { useState } from 'react';
// import axios from 'axios';
// export default function Register() {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         phoneNumber: "",
//         role: "serviceProvider",
//         password: "",
//         confirmPassword: ""
//     });

//     const [clientErrors, setClientErrors] = useState({});
//     const [serverErrors, setServerErrors] = useState(null);

//     const isEmail = (email) => /\S+@\S+\.\S+/.test(email);
//     const isNumeric = (value) => /^\d+$/.test(value); // 
//     const isStrongPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{5,}$/.test(password); 

//     const runClientValidation = () => {
//         const errors = {};

//         if (form.name.trim().length === 0) {
//             errors.name = "Name cannot be empty";
//         }
//         if (form.email.trim().length === 0) {
//             errors.email = "Email field cannot be empty";
//         } else if (!isEmail(form.email)) {
//             errors.email = "Enter a valid email address";
//         }
//         if (form.phoneNumber.trim().length === 0) {
//             errors.phoneNumber = "Phone number field cannot be empty";
//         } else if (!isNumeric(form.phoneNumber)) {
//             errors.phoneNumber = "Phone number should contain digits only";
//         } else if (form.phoneNumber.trim().length !== 10) {
//             errors.phoneNumber = "Phone number should be 10 digits";
//         }
//         if (form.password.trim().length === 0) {
//             errors.password = "Password field cannot be empty";
//         } else if (!isStrongPassword(form.password)) {
//             errors.password = "Password must include at least 5 characters, one lowercase letter, one uppercase letter, one number, and one special character.";
//         }
//         if (form.confirmPassword.trim().length === 0) {
//             errors.confirmPassword = "Confirm password field cannot be empty";
//         } else if (form.password !== form.confirmPassword) {
//             errors.confirmPassword = "Password and confirm password should match";
//         }

//         setClientErrors(errors);
//         return Object.keys(errors).length === 0; 
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (runClientValidation()) {
//             try {
//                 const response = await axios.post('http://localhost:3001/api/auth/signUp', form);
//                 console.log(response.data); 
//             } catch (err) {
//                 setServerErrors(err.response?.data?.error[0].msg || ["Server error occurred"]);
//                 console.log(err)
//             }
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 {serverErrors && (
//                     <div>
//                         <h3>Server Errors</h3>
//                         <ul>
//                             {serverErrors.map((error, i) => (
//                                 <li key={i}>{error}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//                 <label htmlFor="name">Name: </label>
//                 <input
//                     type="text"
//                     id="name"
//                     value={form.name}
//                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 />
//                 {clientErrors.name && <span style={{ color: 'red' }}>{clientErrors.name}</span>}
//                 <br />

//                 <label htmlFor="email">Email: </label>
//                 <input
//                     type="text"
//                     id="email"
//                     value={form.email}
//                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 />
//                 {clientErrors.email && <span style={{ color: 'red' }}>{clientErrors.email}</span>}
//                 <br />

//                 <label htmlFor="phoneNumber">Phone Number: </label>
//                 <input
//                     type="text"
//                     id="phoneNumber"
//                     value={form.phoneNumber}
//                     onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
//                 />
//                 {clientErrors.phoneNumber && <span style={{ color: 'red' }}>{clientErrors.phoneNumber}</span>}
//                 <br />

//                 <label>Role: </label>
//                 <input
//                     type="radio"
//                     name="role"
//                     value="owner"
//                     checked={form.role === "owner"}
//                     onChange={(e) => setForm({ ...form, role: e.target.value })}
//                 />
//                 <label htmlFor="owner">Owner</label>
//                 <input
//                     type="radio"
//                     name="role"
//                     value="serviceProvider"
//                     checked={form.role === "serviceProvider"}
//                     onChange={(e) => setForm({ ...form, role: e.target.value })}
//                 />
//                 <label htmlFor="serviceProvider">Service Provider</label>
//                 <br />

//                 <label htmlFor="password">Password: </label>
//                 <input
//                     type="password"
//                     id="password"
//                     value={form.password}
//                     onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 />
//                 {clientErrors.password && <span style={{ color: 'red' }}>{clientErrors.password}</span>}
//                 <br />

//                 <label htmlFor="confirmPassword">Confirm Password: </label>
//                 <input
//                     type="password"
//                     id="confirmPassword"
//                     value={form.confirmPassword}
//                     onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
//                 />
//                 {clientErrors.confirmPassword && <span style={{ color: 'red' }}>{clientErrors.confirmPassword}</span>}
//                 <br />

//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// }

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../slices/AuthSlice";
import { isEmail, isNumeric, isStrongPassword } from "validator";
import { toast, ToastContainer } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Spinner from "./Spinner"; 
// import "react-toastify/dist/ReactToastify.css";

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

  const handleCheckedBoxChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  const handleRoleChange = () => {
    setFormData((prevState) => ({
      ...prevState,
      role: prevState.role === "serviceProvider" ? "owner" : "serviceProvider",
    }));
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
    } else if (!isNumeric(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number should contain digits only";
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
      try {
        const actionResult = await dispatch(userRegister(formData));
        if (userRegister.fulfilled.match(actionResult)) {
          toast.success("User registered successfully!");
          navigate("/login");
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    }
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <div>
        <div>
          <span>
            <Link to="/register"> Register </Link>
          </span>
          <span>
            <Link to="/login"> Login </Link>
          </span>
        </div>
      </div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <p>Join Doczy</p>
              {formData.role === "customer" ? (
                <p>
                  <span> Are you a Doctor? </span>
                  <span onClick={handleRoleChange}> Register</span>
                </p>
              ) : (
                <p>
                  <span onClick={handleRoleChange}> Not a Owner? </span>
                </p>
              )}
            </div>
            <div>
              <label> User Name: </label>
              <input
                type="text"
                value={formData.name}
                placeholder="User Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {clientErrors?.name && <span>{clientErrors?.name}</span>}
            </div>
            <div>
              <label>Email ID:</label>
              <input
                type="text"
                value={formData.email}
                placeholder="Email ID"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {clientErrors?.email && <span>{clientErrors?.email}</span>}
            </div>
            <div>
              <label>Phone Number:</label>
              <input
                type="text"
                value={formData.phoneNumber}
                placeholder="Phone Number"
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
              {clientErrors?.phoneNumber && (
                <span>{clientErrors?.phoneNumber}</span>
              )}
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={formData.password}
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {clientErrors?.password && <span>{clientErrors?.password}</span>}
            </div>
            <div>
              <label>Confirm Password:</label>
              <div>
                <input
                  type={click ? "text" : "password"}
                  value={formData.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
                {click ? (
                  <FiEyeOff onClick={() => setClick(!click)} />
                ) : (
                  <FiEye onClick={() => setClick(!click)} />
                )}
              </div>
              {clientErrors?.confirmPassword && (
                <span>{clientErrors?.confirmPassword}</span>
              )}
            </div>
            <div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckedBoxChange}
              />
              <span>Agree with Terms & conditions of Doczy</span>
              {clientErrors?.isChecked && <span>{clientErrors?.isChecked}</span>}
            </div>
            <div>
              {serverError &&
                serverError.map((ele, i) => <li key={i}>{ele.msg}</li>)}
            </div>
            <div>
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
