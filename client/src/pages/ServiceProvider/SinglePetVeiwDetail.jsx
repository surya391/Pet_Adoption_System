// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { singleRequestView } from '../../slices/RequestSlice';
// import Spinner from "../Frontpage/Spinner";
// import { serviceProCreateInterest } from '../../slices/IntersetSlice';

// const SinglePetViewDetail = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");

//     const { requestView, isLoading } = useSelector((state) => state.request);
//     const { interestLoading } = useSelector((state) => state.interest);
    
//     useEffect(() => {
//         if (id) {
//             dispatch(singleRequestView(id));
//         }
//     }, [dispatch, id]);

//     const handleInterestClick = () => {
//         if (!requestView) return;

//         setIsButtonDisabled(true); // Disable button immediately
//         setErrorMessage(""); // Reset previous errors

//         const data = {
//             requestId: id,
//             ownerId: requestView.userId,
//         };

//         dispatch(serviceProCreateInterest(data))
//             .unwrap()
//             .then(() => {
//                 alert("Interest successfully added!");
//                 // navigate(-1); // Navigate back only after success
//             })
//             .catch(() => {
//                 setErrorMessage("⚠ Failed to add interest or already added.");
//                 setIsButtonDisabled(false); // Re-enable button if there's an error
//             });
//     };

//     if (isLoading) {
//         return <Spinner />;
//     }

//     if (!requestView) {
//         return <p className="text-gray-600">No details available for this request.</p>;
//     }

//     return (
//         <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen items-center justify-center">
//             <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 flex">
//                 {/* Left Section: Image */}
//                 <div className="w-1/3 flex justify-center items-center">
//                     <img
//                         src={requestView?.petId?.petImage || ""}
//                         alt="Pet"
//                         className="w-90 h-90 object-cover border-4 border-blue-500 shadow-md"
//                     />
//                 </div>

//                 {/* Right Section: Details */}
//                 <div className="w-2/3 pl-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Request Details</h1>
//                     <div className="space-y-4">
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Pet Name:</span> {requestView?.petId?.petName || "N/A"}
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Pet Age:</span> {requestView?.petId?.petAge || "N/A"}
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Amount:</span> {requestView?.amount || 0} ₹
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Start:</span>{" "}
//                             {requestView?.startDatetime ? new Date(requestView.startDatetime).toLocaleString() : "N/A"}
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">End:</span>{" "}
//                             {requestView?.endDatetime ? new Date(requestView.endDatetime).toLocaleString() : "N/A"}
//                         </p>
//                     </div>

//                     {/* Interest Button */}
//                     <div className="mt-8 flex justify-center">
//                         <button
//                             className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
//                             onClick={handleInterestClick}
//                             disabled={isButtonDisabled || interestLoading}
//                         >
//                             {interestLoading ? "Processing..." : isButtonDisabled ? "Interest Added" : "I'm Interested"}
//                         </button>
//                     </div>

//                     {/* Error Message & Retry Button */}
//                     {errorMessage && (
//                         <div className="text-center mt-4">
//                             <p className="text-red-500 text-sm">{errorMessage}</p>
//                             {/* <button
//                                 className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
//                                 onClick={handleInterestClick} // Retry without navigating back
//                                 disabled={isButtonDisabled} // Prevent multiple rapid clicks
//                             >
//                                 Retry
//                             </button> */}
//                         </div>
//                     )}

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SinglePetViewDetail;





































import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { singleRequestView } from '../../slices/RequestSlice';
import Spinner from "../Frontpage/Spinner";
import { serviceProCreateInterest } from '../../slices/IntersetSlice';

const SinglePetViewDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isInterested, setIsInterested] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { requestView, isLoading } = useSelector((state) => state.request);
    const { interestLoading } = useSelector((state) => state.interest);
    
    useEffect(() => {
        if (id) {
            dispatch(singleRequestView(id));
        }
    }, [dispatch, id]);
    
const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };
    const handleInterestClick = () => {
        if (!requestView || isInterested) return;

        setErrorMessage("");

        const data = {
            requestId: id,
            ownerId: requestView.userId,
        };

        dispatch(serviceProCreateInterest(data))
            .unwrap()
            .then(() => {
                alert("Interest successfully added!");
                setIsInterested(true); // Mark as interested, preventing further clicks
            })
            .catch(() => {
                setErrorMessage("⚠ Failed to add interest or already added.");
            });
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (!requestView) {
        return <p className="text-gray-600">No details available for this request.</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
              <div className="flex justify-end mb-4">
                <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                    &#8592; Back
                </button>
            </div>
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 flex">
                {/* Left Section: Image */}
                <div className="w-1/3 flex justify-center items-center">
                    <img
                        src={requestView?.petId?.petImage || ""}
                        alt="Pet"
                        className="w-90 h-90 object-cover border-4 border-blue-500 shadow-md"
                    />
                </div>

                {/* Right Section: Details */}
                <div className="w-2/3 pl-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Request Details</h1>
                    <div className="space-y-4">
                        <p className="text-lg text-gray-700 font-medium">
                            <span className="font-semibold text-gray-800">Pet Name:</span> {requestView?.petId?.petName || "N/A"}
                        </p>
                        <p className="text-lg text-gray-700 font-medium">
                            <span className="font-semibold text-gray-800">Pet Age:</span> {requestView?.petId?.petAge || "N/A"}
                        </p>
                        <p className="text-lg text-gray-700 font-medium">
                            <span className="font-semibold text-gray-800">Amount:</span> {requestView?.amount || 0} ₹
                        </p>
                        <p className="text-lg text-gray-700 font-medium">
                            <span className="font-semibold text-gray-800">Start:</span>{" "}
                            {requestView?.startDatetime ? new Date(requestView.startDatetime).toLocaleString() : "N/A"}
                        </p>
                        <p className="text-lg text-gray-700 font-medium">
                            <span className="font-semibold text-gray-800">End:</span>{" "}
                            {requestView?.endDatetime ? new Date(requestView.endDatetime).toLocaleString() : "N/A"}
                        </p>
                    </div>

                    {/* Interest Button */}
                    <div className="mt-8 flex justify-center">
                        <button
                            className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
                            onClick={handleInterestClick}
                            disabled={isInterested || interestLoading}
                        >
                            {interestLoading ? "Processing..." : isInterested ? "Interest Added" : "I'm Interested"}
                        </button>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="text-center mt-4">
                            <p className="text-red-500 text-sm">{errorMessage}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SinglePetViewDetail;











///////////////////////////////////     its the final important other are checking


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { singleRequestView } from '../../slices/RequestSlice';
// import Spinner from "../Frontpage/Spinner";
// import { serviceProCreateInterest } from '../../slices/IntersetSlice';
// import { useNavigate } from "react-router-dom";

// const SinglePetVeiwDetail = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//     const { requestView, isLoading } = useSelector((state) => state.request);
//     // console.log("requestView",requestView)
//     const { interestLoading, serverError } = useSelector((state) => state.interest);
    
//     useEffect(() => {
//         if (id) {
//             dispatch(singleRequestView(id));
//         }
//     }, [dispatch, id]);

//     const handleInterestClick = () => {
//         if (!requestView) return;

//         setIsButtonDisabled(true); // Disable button immediately after click

//         const data = {
//             requestId: id,
//             ownerId: requestView.userId, // Assuming requestView contains ownerId
//         };

//         dispatch(serviceProCreateInterest(data))
//             .unwrap()
//             .then(() => {
//                 alert("Interest successfully added!");
//             })
//             // .catch((error) => {
//             //     // console.log(error?.response?.data?.message)
//             //     alert("⚠ Failed to add interest or already added.", );
//             //     setIsButtonDisabled(false); // Re-enable button if there's an error
//             //     navigate('/petServicePage')
//             // });

//             .catch((error) => {
//                 alert("⚠ Failed to add interest or already added.");
//                 setIsButtonDisabled(false);
                
//                 // Refetch interests before navigating
//                 dispatch(getServiceProviderInterests()).then(() => {
//                     navigate('/petServicePage');
//                 });
//             });
            
//     };

//     if (isLoading) {
//         return <Spinner />;
//     }

//     if (!requestView) {
//         return <p className="text-gray-600">No details available for this request.</p>;
//     }

//     return (
//         <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen items-center justify-center">
//             <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 flex">
//                 {/* Left Section: Image */}
//                 <div className="w-1/3 flex justify-center items-center">
//                     <img
//                         src={requestView?.petId?.petImage || ""}
//                         alt="Pet"
//                         className="w-90 h-90 object-cover border-4 border-blue-500 shadow-md"
//                     />
//                 </div>

//                 {/* Right Section: Details */}
//                 <div className="w-2/3 pl-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Request Details</h1>
//                     <div className="space-y-4">
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Pet Name:</span> {requestView?.petId?.petName || "N/A"}
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Pet Age:</span> {requestView?.petId?.petAge || "N/A"}
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Amount:</span> {requestView?.amount || 0} ₹
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Start:</span>{" "}
//                             {requestView?.startDatetime ? new Date(requestView.startDatetime).toLocaleString() : "N/A"}
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">End:</span>{" "}
//                             {requestView?.endDatetime ? new Date(requestView.endDatetime).toLocaleString() : "N/A"}
//                         </p>
//                     </div>
//                     <div className="mt-8 flex justify-center">
//                         <button
//                             className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
//                             onClick={handleInterestClick}
//                             disabled={isButtonDisabled || interestLoading}
//                         >
//                             {interestLoading ? "Processing..." : isButtonDisabled ? "Interest Added" : "I'm Interested"}
//                         </button>
//                     </div>
//                     {/* {serverError && <p className="text-red-500 text-center mt-4">{serverError}</p>} */}
//                     <div>
//                         {Array.isArray(serverError) && serverError.map((ele, i) => (
//                         <li key={i} className="text-sm font-semibold text-red-500 opacity-80">
//                         {ele.message || ele}
//                         </li>
//                     ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SinglePetVeiwDetail;









// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { singleRequestView } from '../../slices/RequestSlice';
// import Spinner from "../Frontpage/Spinner";
// import { serviceProCreateInterest } from '../../slices/IntersetSlice';

// const SinglePetVeiwDetail = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();

//     const { requestView, isLoading } = useSelector((state) => state.request);
//         const { interestLoading, serverError } = useSelector((state) => state.interest);
    
//     // console.log(requestView)
//     useEffect(() => {
//         if (id) {
//             dispatch(singleRequestView(id));
//         }
//     }, [dispatch, id]);

//     const handleInterestClick = () => {
//         if (!requestView) return;

//         const data = {
//             requestId: id,
//             ownerId: requestView.ownerId, // Assuming requestView contains ownerId
//         };

//         dispatch(serviceProCreateInterest(data))
//             .unwrap()
//             .then(() => {
//                 alert("Interest successfully added!");
//             })
//             .catch((error) => {
//                 alert(error || "Failed to add interest");
//             });
//     };

//     if (isLoading) {
//         return <Spinner />;
//     }

//     if (!requestView) {
//         return <p className="text-gray-600">No details available for this request.</p>;
//     }

//     return (
//         <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen items-center justify-center">
//             <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 flex">
//                 {/* Left Section: Image */}
//                 <div className="w-1/3 flex justify-center items-center">
//                     <img
//                         src={requestView?.petId?.petImage || ""}
//                         alt="Pet"
//                         className="w-90 h-90 object-cover border-4 border-blue-500 shadow-md"
//                     />
//                 </div>


//                 {/* Right Section: Details */}
//                 <div className="w-2/3 pl-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Request Details</h1>
//                     <div className="space-y-4">
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Pet Name:</span> {requestView?.petId?.petName || "N/A"}
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Pet Age:</span> {requestView?.petId?.petAge || "N/A"}
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Amount:</span> {requestView?.amount || 0} ₹
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">Start:</span>{" "}
//                             {requestView?.startDatetime ? new Date(requestView.startDatetime).toLocaleString() : "N/A"}
//                         </p>
//                         <p className="text-lg text-gray-700 font-medium">
//                             <span className="font-semibold text-gray-800">End:</span>{" "}
//                             {requestView?.endDatetime ? new Date(requestView.endDatetime).toLocaleString() : "N/A"}
//                         </p>
//                     </div>
//                     <div className="mt-8 flex justify-center">
//                         <button
//                             className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
//                             onClick={handleInterestClick}
//                             disabled={interestLoading}
//                         >
//                             {interestLoading ? "Processing..." : "I'm Interested"}
//                         </button>
//                     </div>
//                     {serverError && <p className="text-red-500 text-center mt-4">{serverError}</p>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SinglePetVeiwDetail;

