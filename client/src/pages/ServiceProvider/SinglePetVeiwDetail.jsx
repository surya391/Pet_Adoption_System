// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux';
// import { singleRequestView } from '../../slices/RequestSlice';

// const SinglePetVeiwDetail = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();

//     console.log("Pet ID:", id);
//     const { pendingRequestList, requestView, isLoading } = useSelector((state) => state.request);

//     useEffect(()=>{
//         dispatch(singleRequestView())
//     },[])

//     return (
//         <div>SinglePetVeiwDetail</div>
//     )
// }

// export default SinglePetVeiwDetail


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleRequestView } from '../../slices/RequestSlice';
import Spinner from "../Frontpage/Spinner";

const SinglePetVeiwDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { requestView, isLoading } = useSelector((state) => state.request);
    // console.log(requestView)
    useEffect(() => {
        if (id) {
            dispatch(singleRequestView(id));
        }
    }, [dispatch, id]);

    if (isLoading) {
        return <Spinner />;
    }

    if (!requestView) {
        return <p className="text-gray-600">No details available for this request.</p>;
    }

    return (
        <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen items-center justify-center">
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
                    <div className="mt-8 flex justify-center">
                        <button
                            className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
                            onClick={() => alert("I'm Interested")}
                        >
                            I'm Interested
                        </button>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default SinglePetVeiwDetail;

