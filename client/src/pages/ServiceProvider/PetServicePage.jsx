// /* /* import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import SideNavbar from "../Frontpage/SideNavBar";
// import Spinner from "../Frontpage/Spinner";
// import { getPendingRequest} from "../../slices/RequestSlice";
// import { useNavigate } from "react-router-dom";

// function PetServicePage() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { pendingRequestList } = useSelector((state) => state.request);
//     const { userInfo } = useSelector((state)=> state.auth)
    
//       useEffect(()=>{
//         if(userInfo.role === 'serviceProvider'){
//           dispatch(getPendingRequest())
//         }
//     },[])
    
// console.log(pendingRequestList)
//     return (
//        <div>Hello</div>
//     );
// }

// export default PetServicePage;
//  */




// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// // import ServiceProviderNavbar from "../Frontpage/SeviceProviderNavbar"
// import Spinner from "../Frontpage/Spinner";
// import { getPendingRequest } from "../../slices/RequestSlice";
// import { useNavigate } from "react-router-dom";

// function PetServicePage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { pendingRequestList, isLoading } = useSelector((state) => state.request);
//   const { userInfo } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (userInfo?.role === "serviceProvider") {
//       dispatch(getPendingRequest());
//     }
//   }, [userInfo, dispatch]);

//   return (
//     <div className="flex">
//       {/* <ServiceProviderNavbar /> */}
//       <div className="w-full bg-gray-100 p-8">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4">Pending Requests</h1>
//         {isLoading ? (
//           <Spinner />
//         ) : pendingRequestList && pendingRequestList.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {pendingRequestList.map((request, index) => (
//               <div key={request.id || index} className="bg-white shadow-md rounded-lg p-4">

//                 <p className="text-sm text-gray-600">
//                   {request?.petId?.petImage ? (
//                     <img src={request.petId.petImage} alt="Pet" className="w-16 h-16 rounded-full object-cover" />
//                   ) : (
//                     "No image available"
//                   )}
//                 </p>
//                 <p className="text-sm text-gray-600">Pet Name: {request?.petId?.petName}</p>
//                 {/* <p className="text-sm text-gray-600">Type: {requestTypes.find(ele => ele._id === request?.requestType)?.type}</p> */}
//                 <p className="text-sm text-gray-600">Pet Age: {request?.petId?.petAge}</p>
//                 <p className="text-sm text-gray-600">Amount: {request.amount} ₹</p>
//                 <p className="text-sm text-gray-600">Start: {new Date(request.startDatetime).toLocaleString()}</p>
//                 <p className="text-sm text-gray-600">End: {new Date(request.endDatetime).toLocaleString()}</p>
//                 <button
//                   className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                   onClick={() => navigate(`/singlePetVeiwDetail/${request._id}`)}
//                 >
//                   View Details
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600">No pending requests at the moment.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PetServicePage; */





import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../Frontpage/Spinner";
import { getPendingRequest } from "../../slices/RequestSlice";
import { useNavigate } from "react-router-dom";

function PetServicePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pendingRequestList, isLoading } = useSelector((state) => state.request);
  const { userInfo } = useSelector((state) => state.auth);

  // State for modal and long press
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [longPressTimeout, setLongPressTimeout] = useState(null);

  // Fetch pending requests on load if user is a service provider
  useEffect(() => {
    if (userInfo?.role === "serviceProvider") {
      dispatch(getPendingRequest());
    }
  }, [userInfo, dispatch]);

  // Long press handling
  const handleLongPressStart = (request) => {
    const timeout = setTimeout(() => {
      setSelectedRequest(request);
      setShowModal(true);
    }, 300); 
    setLongPressTimeout(timeout);
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimeout);
    setLongPressTimeout(null);
  };

  return (
    <div className="flex">
      <div className="w-full bg-gray-100 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Pending Requests</h1>
        {isLoading ? (
          <Spinner />
        ) : pendingRequestList && pendingRequestList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingRequestList.map((request, index) => (
              <div
                key={request.id || index}
                className="bg-white shadow-md rounded-lg p-4 "
                onMouseDown={() => handleLongPressStart(request)}
                onMouseUp={handleLongPressEnd}
                onTouchStart={() => handleLongPressStart(request)}
                onTouchEnd={handleLongPressEnd}
              >
                {request?.petId?.petImage ? (
                  <img
                    src={request.petId.petImage}
                    alt="Pet"
                    className="w-16 h-16 rounded-full object-cover mb-2"
                  />
                ) : (
                  <p className="text-sm text-gray-600">No image available</p>
                )}
                <p className="text-sm text-gray-600">Pet Name: {request?.petId?.petName}</p>
                <p className="text-sm text-gray-600">Pet Age: {request?.petId?.petAge}</p>
                <p className="text-sm text-gray-600">Amount: {request.amount} ₹</p>
                <p className="text-sm text-gray-600">Start: {new Date(request.startDatetime).toLocaleString()}</p>
                <p className="text-sm text-gray-600"> End: {new Date(request.endDatetime).toLocaleString()}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                  onClick={() => navigate(`/singlePetVeiwDetail/${request._id}`)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No pending requests at the moment.</p>
        )}
      </div>

      {/* Modal for Enlarged View */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Pet Details</h2>
            {selectedRequest?.petId?.petImage && (
              <img
                src={selectedRequest.petId.petImage}
                alt="Pet"
                className="w-48 h-48 mx-auto object-cover rounded-md mb-4"
              />
            )}
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Pet Name:</span> {selectedRequest?.petId?.petName || "N/A"}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Pet Age:</span> {selectedRequest?.petId?.petAge || "N/A"}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Amount:</span> {selectedRequest?.amount || 0} ₹
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Start:</span>{" "}
              {selectedRequest?.startDatetime
                ? new Date(selectedRequest.startDatetime).toLocaleString()
                : "N/A"}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">End:</span>{" "}
              {selectedRequest?.endDatetime
                ? new Date(selectedRequest.endDatetime).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetServicePage;
