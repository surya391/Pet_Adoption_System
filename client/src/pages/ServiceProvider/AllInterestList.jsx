import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServiceProviderInterests, removeSPInterest } from "../../slices/IntersetSlice";

function AllInterestList() {
    const dispatch = useDispatch();
    const { getYourInterests, interestLoading, serverError } = useSelector((state) => state.interest);
    const { userInfo } = useSelector((state) => state.auth);
// console.log(getYourInterests)
    useEffect(() => {
        if (userInfo?.role === "serviceProvider") {
            dispatch(getServiceProviderInterests());
        }
    }, [userInfo, dispatch]);

    const handleUninterest = (interestId) => {
        console.log(interestId)
        dispatch(removeSPInterest(interestId))
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Interests</h2>

            {interestLoading && <p className="text-center text-blue-500">Loading...</p>}
            {/* {serverError && <p className="text-center text-red-500">{serverError}</p>} */}
            <div>
                {serverError && serverError.map((ele, i) => (
                    <li key={i} className="text-sm font-semibold text-red-500 opacity-80">{ele.msg}</li>
                ))}
            </div>
            {!interestLoading && getYourInterests?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getYourInterests.map((interest) => (
                        <div key={interest._id} className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300">
                            {interest.requestId?.petId && (
                                <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-4">
                                    {interest.requestId.petId.petImage && (
                                        <img
                                            src={interest.requestId.petId.petImage}
                                            alt="Pet"
                                            className="w-20 h-20 rounded-lg object-cover border border-gray-300"
                                        />
                                    )}
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Pet Details</h4>
                                        <p className="text-sm text-gray-600"><strong>Name:</strong> {interest.requestId.petId.petName}</p>
                                        <p className="text-sm text-gray-600"><strong>Breed:</strong> {interest.requestId.petId.petType}</p>
                                        <p className="text-sm text-gray-600"><strong>Age:</strong> {interest.requestId.petId.petAge}</p>
                                    </div>
                                </div>
                            )}

                            <p className="text-gray-700"><strong>Description:</strong> {interest.requestId?.description}</p>
                            <p className="text-gray-700"><strong>Amount:</strong> ${interest.requestId?.amount}</p>
                            <p className="text-gray-700"><strong>Start Date:</strong> {new Date(interest.requestId?.startDatetime).toLocaleDateString()}</p>
                            <p className="text-gray-700"><strong>End Date:</strong> {new Date(interest.requestId?.endDatetime).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">
                                        Status - <span className="font-semibold">{interest.requestId?.status}</span>
                                    </p>
                            {/* {interest.interestedServiceProviders.length > 0 && (
                                <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                                    <h4 className="font-semibold text-gray-700">Interested Service Providers</h4>
                                    <p className="text-sm text-gray-600">
                                        Status - <span className="font-semibold">{interest.interestedServiceProviders[1].status}</span>
                                    </p>
                                </div>
                            )} */}

                            {/* {interest.interestedServiceProviders.length > 0 && (
                                <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                                    <h4 className="font-semibold text-gray-700">Interested Service Providers</h4>
                                    {[...new Set(interest.interestedServiceProviders.map((provider) => provider.status))].map((status, index) => (
                                        <p key={index} className="text-sm text-gray-600">
                                            Status - <span className="font-semibold">{status}</span>
                                        </p>
                                    ))}
                                </div>
                            )} */}


                            <button
                                onClick={() => handleUninterest(interest?.requestId?._id)}
                                className="mt-4 w-full py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 font-semibold"
                            >
                                Uninterest
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !interestLoading && <p className="text-center text-gray-600">No interests found.</p>
            )}
        </div>
    );
}

export default AllInterestList;













// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getServiceProviderInterests, removeSPInterest } from "../../slices/IntersetSlice";

// function AllInterestList() {
//     const dispatch = useDispatch();
//     const { getYourInterests, interestLoading, serverError } = useSelector((state) => state.interest);
//     const { userInfo } = useSelector((state) => state.auth);
// console.log(getYourInterests)
//     useEffect(() => {
//         if (userInfo?.role === "serviceProvider") {
//             dispatch(getServiceProviderInterests());
//         }
//     }, [userInfo, dispatch]);

//     const handleUninterest = (interestId) => {
//         console.log(interestId)
//         dispatch(removeSPInterest(interestId))
//     };

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Interests</h2>

//             {interestLoading && <p className="text-center text-blue-500">Loading...</p>}
//             {/* {serverError && <p className="text-center text-red-500">{serverError}</p>} */}
//             <div>
//                 {serverError && serverError.map((ele, i) => (
//                     <li key={i} className="text-sm font-semibold text-red-500 opacity-80">{ele.msg}</li>
//                 ))}
//             </div>
//             {!interestLoading && getYourInterests?.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {getYourInterests.map((interest) => (
//                         <div key={interest._id} className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300">
//                             {interest.requestId?.petId && (
//                                 <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-4">
//                                     {interest.requestId.petId.petImage && (
//                                         <img
//                                             src={interest.requestId.petId.petImage}
//                                             alt="Pet"
//                                             className="w-20 h-20 rounded-lg object-cover border border-gray-300"
//                                         />
//                                     )}
//                                     <div>
//                                         <h4 className="font-semibold text-gray-700">Pet Details</h4>
//                                         <p className="text-sm text-gray-600"><strong>Name:</strong> {interest.requestId.petId.petName}</p>
//                                         <p className="text-sm text-gray-600"><strong>Breed:</strong> {interest.requestId.petId.petType}</p>
//                                         <p className="text-sm text-gray-600"><strong>Age:</strong> {interest.requestId.petId.petAge}</p>
//                                     </div>
//                                 </div>
//                             )}

//                             <p className="text-gray-700"><strong>Description:</strong> {interest.requestId?.description}</p>
//                             <p className="text-gray-700"><strong>Amount:</strong> ${interest.requestId?.amount}</p>
//                             <p className="text-gray-700"><strong>Start Date:</strong> {new Date(interest.requestId?.startDatetime).toLocaleDateString()}</p>
//                             <p className="text-gray-700"><strong>End Date:</strong> {new Date(interest.requestId?.endDatetime).toLocaleDateString()}</p>
//                             {/* <p className="text-sm text-gray-600">
//                                         Status - <span className="font-semibold">{interest.requestId?.status}</span>
//                                     </p> */}

//                             {interest.interestedServiceProviders.length > 0 && (
//                                 <div className="mt-3 bg-gray-50 p-3 rounded-lg">
//                                     <h4 className="font-semibold text-gray-700">Interested Service Providers</h4>
//                                     <p className="text-sm text-gray-600">
//                                         Status - <span className="font-semibold">{interest.interestedServiceProviders[1].status}</span>
//                                     </p>
//                                 </div>
//                             )}
                            

//                             {/* {interest.interestedServiceProviders.length > 0 && (
//                                 <div className="mt-3 bg-gray-50 p-3 rounded-lg">
//                                     <h4 className="font-semibold text-gray-700">Interested Service Providers</h4>
//                                     {[...new Set(interest.interestedServiceProviders.map((provider) => provider.status))].map((status, index) => (
//                                         <p key={index} className="text-sm text-gray-600">
//                                             Status - <span className="font-semibold">{status}</span>
//                                         </p>
//                                     ))}
//                                 </div>
//                             )} */}


//                             <button
//                                 onClick={() => handleUninterest(interest?.requestId?._id)}
//                                 className="mt-4 w-full py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 font-semibold"
//                             >
//                                 Uninterest
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 !interestLoading && <p className="text-center text-gray-600">No interests found.</p>
//             )}
//         </div>
//     );
// }

// export default AllInterestList;
 