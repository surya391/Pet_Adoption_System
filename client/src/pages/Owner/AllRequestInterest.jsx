import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allRequestInterest } from "../../slices/IntersetSlice";
import { useLocation, useNavigate } from "react-router-dom";

function AllRequestInterest() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { getOwnerInterests, interestLoading, serverError } = useSelector(
        (state) => state.interest
    );
// console.log(getOwnerInterests)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const requestId = queryParams.get("requestId");

    if (!requestId) {
        return navigate("/requestList");
    }

    useEffect(() => {
        dispatch(allRequestInterest(requestId));
    }, [dispatch, requestId]);

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                    &#8592; Back
                </button>
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Owner's Interests</h2>
            {interestLoading && <p className="text-center text-xl">Loading...</p>}
            {serverError && <p className="text-red-500 text-center">Error: {serverError}</p>}
            {getOwnerInterests?.length > 0 ? (
                getOwnerInterests.map((interest) => (
                    <div key={interest?._id} className="border bg-white p-5 rounded-lg shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl font-medium text-gray-700 mb-3">
                            {/* <span className="font-bold text-gray-900">Request ID:</span> {interest?.requestId?.petId?.petName} */}
                        </h3>
                        <p className="text-gray-600 font-medium mb-2"><strong>Interested Service Providers:</strong></p>
                        <ul>
                            {interest?.interestedServiceProviders?.map((provider) => (
                                <li key={provider?._id} className="flex items-center mb-4">
                                    {/* Profile Picture */}
                                    <div className="w-40 h-32 overflow-hidden mr-4 border-2 border-blue-500 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                                        <img
                                            src={provider?.profile?.profilePic}
                                            alt="Profile Picture"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">{provider?.provider?.name}</p>
                                        <p className="text-gray-600">Email: {provider?.provider?.email}</p>
                                        <p className="text-gray-600">Status: <span className="font-semibold">{provider?.status}</span></p>
                                        <p className="text-gray-600">
                                            Location: {provider?.profile?.address?.city}, {provider?.profile?.address?.state}, {provider?.profile?.address?.country}
                                        </p>
                                        <div className="flex space-x-4">
                                            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                Accept
                                            </button>

                                            <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p className="text-center text-lg text-gray-600">No interests found for your requests.</p>
            )}
        </div>
    );
}

export default AllRequestInterest;















// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { allRequestInterest } from "../../slices/IntersetSlice"
// import { useLocation, useNavigate } from "react-router-dom";

// function AllRequestInterest() {
//   const dispatch = useDispatch();

//   const { getOwnerInterests, interestLoading, serverError } = useSelector(
//     (state) => state.interest
//   );

//   const location = useLocation()
//   const navigate = useNavigate()
//   const queryParams = new URLSearchParams(location.search)
//   const requestId = queryParams.get("requestId")
// //   console.log(requestId)
// //   console.log('serverError', serverError)
// //   console.log('getOwnerInterests', getOwnerInterests)
//   if(!requestId){
//     return navigate('/requestList')
//   }

//   useEffect(() => {
//     dispatch(allRequestInterest(requestId));
//   }, [dispatch]);


//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-3">Owner's Interests</h2>

//       {interestLoading && <p>Loading...</p>}
//       {serverError && <p className="text-red-500">Error: {serverError}</p>}

//       {getOwnerInterests?.length > 0 ? (
//         getOwnerInterests.map((interest) => (
//           <div key={interest?._id} className="border p-3 rounded-lg mb-3">
//             <h3 className="font-medium">Request ID: {interest?.requestId?.petId?.petName}</h3>
//             <p><strong>Interested Service Providers:</strong></p>
//             <ul>
//             {interest?.interestedServiceProviders?.map((provider) => (
//   <li key={provider?._id} className="ml-4">
//     <div>
//       <img src={provider?.profile?.profilePic} alt="Profile Picture" className="w-16 h-16 rounded-full" />
//     </div>
//     <div>
//       <strong>Name:</strong> {provider?.provider?.name}<br/>
//       <strong>Email:</strong> {provider?.provider?.email}<br/>
//       <strong>Status:</strong> {provider?.status}<br/>
//       <strong>Location:</strong> {provider?.profile?.address?.city}, {provider?.profile?.address?.state}, {provider?.profile?.address?.country}<br/>
//       <button>Accept</button>
//     </div>
//   </li>
// ))}

//             </ul>
//           </div>
//         ))
//       ) : (
//         <p>No interests found for your requests.</p>
//       )}
//     </div>
//   );
// }

// export default AllRequestInterest;
