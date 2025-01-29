// import React from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { verifyAccount } from '../slices/AuthSlice'
// import './AccountVerify.css';

// const useQuery = ()=>{
//     return new URLSearchParams(useLocation().search)
// }

// const AccountVerify = () => {
//   const navigate  = useNavigate()
//   const dispatch = useDispatch()
//   const query = useQuery();
//   const userId = query.get("userId")
//   const token = query.get("token")
//   const [ isVerified, setIsVerified ] = useState(false)
//   const [ clientError, setClientError ] = useState(null)

//   const errors = { }
//   const formValidate = () =>{
//     if(!isVerified){
//         errors.isVerified = 'checkbox should be checked'
//     }
//   }
//   const handleSubmit = async(e) =>{
//     e.preventDefault()
//     formValidate()
//     if(Object.keys(errors).length > 0 ){
//         setClientError(errors)
//     }else{
//         setClientError(null)
//         try {
//             await dispatch(verifyAccount({ userId, token, isVerified })).unwrap()
//             .then(()=>{
//                 alert("Account Verified Successfully")
//                 navigate('/')
//             })
//             .catch((err)=>{
//                 console.log(err)
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
//   }
// // console.log(isVerified)
//     return (
//     <div  className="container">
//         <div>
//             <h2>Account Verify</h2>
//         </div>
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <input 
//                     type='checkbox'
//                     value = {isVerified}
//                     onChange={()=>setIsVerified(!isVerified)}
//                     />
//                     <p>your are one step away from verifing account</p>
//                 </div>
//                 <div>
//                     {clientError?.isVerified && <b>{clientError?.isVerified}</b>}
//                 </div>
//                 <div>
//                     <input 
//                     type='submit'
//                     value='Verify Account'
//                     />
//                 </div>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default AccountVerify


// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { verifyAccount } from '../slices/AuthSlice';
// import { ToastContainer, toast } from 'react-toastify'
// // import './AccountVerify.css';

// const useQuery = () => {
//     return new URLSearchParams(useLocation().search);
// };

// const AccountVerify = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const query = useQuery();
//     const userId = query.get('userId');
//     const token = query.get('token');
//     const [isVerified, setIsVerified] = useState(false);
//     const [clientError, setClientError] = useState(null);

//     const errors = {};
//     const formValidate = () => {
//         if (!isVerified) {
//             errors.isVerified = 'Checkbox should be checked';
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         formValidate();
//         if (Object.keys(errors).length > 0) {
//             setClientError(errors);
//         } else {
//             setClientError(null);
//             try {
//                 await dispatch(verifyAccount({ userId, token, isVerified }))
//                     .unwrap()
//                     .then(() => {
//                         toast.success('Account Verified Successfully');
//                         navigate('/');
//                     })
//                     .catch((err) => {
//                         // Extract and display the error message in an alert
//                         if (err && err.length > 0 && err[0].msg) {
//                             toast.error(`Error: ${err[0].msg}`);
//                         } else {
//                             toast.error('An unknown error occurred. Please try again.');
//                         }
//                     });
//             } catch (error) {
//                 console.error(error);
//                 toast.warning('Something went wrong. Please try again later.');
//             }
//         }
//     };

//     return (
//         <div className="container">
//             <div>
//                 <h2>Account Verify</h2>
//             </div>
//             <div>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <input
//                             type="checkbox"
//                             value={isVerified}
//                             onChange={() => setIsVerified(!isVerified)}
//                         />
//                         <p>You are one step away from verifying your account</p>
//                     </div>
//                     <div>
//                         {clientError?.isVerified && <b>{clientError?.isVerified}</b>}
//                     </div>
//                     <div>
//                         <input type="submit" value="Verify Account" />
//                     </div>
//                 </form>
//             </div>
//             {/* <ToastContainer
//                 position="top-right"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick={false}
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             /> */}
//         </div>
//     );
// };

// export default AccountVerify;




import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyAccount } from '../slices/AuthSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const AccountVerify = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const query = useQuery();
    const userId = query.get('userId');
    const token = query.get('token');
    const [isVerified, setIsVerified] = useState(false);
    const [clientError, setClientError] = useState(null);
    const [loading, setLoading] = useState(false);

    const errors = {};
    const formValidate = () => {
        if (!isVerified) {
            errors.isVerified = 'Checkbox should be checked';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formValidate();
        if (Object.keys(errors).length > 0) {
            setClientError(errors);
        } else {
            setClientError(null);
            setLoading(true);
            try {
                await dispatch(verifyAccount({ userId, token, isVerified }))
                    .unwrap()
                    .then(() => {
                        // toast.success('Account Verified Successfully');
                        navigate('/login');
                    })
                    .catch((err) => {
                        if (err && err.length > 0 && err[0].msg) {
                            toast.error(`Error: ${err[0].msg}`);
                        } else {
                            toast.error('An unknown error occurred. Please try again.');
                        }
                    });
            } catch (error) {
                console.error(error);
                toast.warning('Something went wrong. Please try again later.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-96 transition-transform transform hover:scale-105">
                <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">Account Verification</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            checked={isVerified}
                            onChange={() => setIsVerified(!isVerified)}
                        />
                        <p className="text-gray-600 text-sm">You are one step away from verifying your account</p>
                    </div>
                    {clientError?.isVerified && <p className="text-red-500 text-sm animate-bounce">{clientError.isVerified}</p>}
                    <button
                        type="submit"
                        className={`w-full py-2 rounded-lg shadow-md transition duration-200 ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify Account'}
                    </button>
                </form>
            </div>
            {/* <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover theme="light" /> */}
        </div>
    );
};

export default AccountVerify;
