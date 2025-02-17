import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchInterests, removeInterest } from "../../slices/IntersetSlice";
// import  {  }

const AddedInterest = () => {
  <div>
  <p>added interset</p>
  </div>
    // const dispatch = useDispatch();
    // const { interests, isLoading } = useSelector((state) => state.interest);

    // useEffect(() => {
    //     dispatch(fetchInterests());
    // }, [dispatch]);

    // const handleRemoveInterest = (interestId) => {
    //     dispatch(removeInterest(interestId))
    //         .unwrap()
    //         .then(() => alert("Interest removed successfully!"))
    //         .catch(() => alert("Failed to remove interest."));
    // };

    // if (isLoading) {
    //     return <p>Loading interests...</p>;
    // }

    // if (!interests || interests.length === 0) {
    //     return <p>No interests added yet.</p>;
    // }

    // return (
    //     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    //         <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
    //             <h1 className="text-2xl font-bold text-center mb-4">My Interests</h1>
    //             <ul className="space-y-4">
    //                 {interests.map((interest) => (
    //                     <li key={interest.id} className="p-4 bg-gray-50 shadow rounded-lg flex justify-between items-center">
    //                         <span className="text-lg font-medium">{interest.petName}</span>
    //                         <button
    //                             className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
    //                             onClick={() => handleRemoveInterest(interest.id)}
    //                         >
    //                             Remove
    //                         </button>
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //     </div>
    // );
};

export default AddedInterest;
