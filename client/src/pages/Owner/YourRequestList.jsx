import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SideNavbar from "../Frontpage/SideNavBar";
import Spinner from "../Frontpage/Spinner";
import { getRequestPets, deleteRequestPet, setIsEditing, setRequestId } from "../../slices/RequestSlice";
import { useNavigate } from "react-router-dom";

function YourRequestList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { serverError, isLoading, requestTypes, requestPets } = useSelector((state) => state.request);
    // console.log('petId',petId)
    // console.log( "requestPets",requestPets)
    // console.log('requestTypes', requestTypes)
    useEffect(() => {
        dispatch(getRequestPets());
        // dispatch(myPetList())
    }, []);

    const handleEdit = (id) => {
        // console.log(id);
        dispatch(setIsEditing(true));
        dispatch(setRequestId(id));
        navigate('/requestPets');
    };

    const handleRemove = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this request?");
        if (confirm) {
            dispatch(deleteRequestPet(id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <SideNavbar />

            <div className="bg-white p-6 w-full max-h-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Service Requests</h2>

                {isLoading && <Spinner />}

                {requestPets && requestPets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {requestPets.map((request) => (

                            <div key={request._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <p className="text-sm text-gray-600">
                                    {request?.petId?.petImage ? (
                                        <img src={request.petId.petImage} alt="Pet" className="w-16 h-16 rounded-full object-cover" />
                                    ) : (
                                        "No image available"
                                    )}
                                </p>
                                <p className="text-sm text-gray-600">Pet Name: {request?.petId?.petName}</p>
                                <p className="text-sm text-gray-600">Type: {requestTypes.find(ele => ele._id === request?.requestType)?.type}</p>
                                <p className="text-sm text-gray-600">Pet Age: {request?.petId?.petAge}</p>
                                <p className="text-sm text-gray-600">Amount: {request.amount} ₹</p>
                                <p className="text-sm text-gray-600">Start: {new Date(request.startDatetime).toLocaleString()}</p>
                                <p className="text-sm text-gray-600">End: {new Date(request.endDatetime).toLocaleString()}</p>

                                <div className="flex justify-between mt-5">
                                    <div>
                                        <p className="mr-5 text-sm font-semibold hover:text-blue-500 hover:underline cursor-pointer" onClick={()=>navigate(`/allRequestInterest?requestId=${request._id}`,   { state: { amount: request.amount } })}> Interest people</p>
                                    </div>
                                    <div>
                                        <button
                                            className="mr-2 px-3 py-1 font-semibold text-sm text-white bg-green-400 hover:scale-110 hover:bg-green-600 shadow-sm rounded-sm cursor-pointer"
                                            onClick={() => handleEdit(request._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-3 py-1 font-semibold text-sm text-white bg-red-400 hover:scale-110 hover:bg-red-600 shadow-sm rounded-sm cursor-pointer"
                                            onClick={() => handleRemove(request._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No service requestPets found.</p>
                )}

                {serverError && serverError.length > 0 && (
                    <ul className="mt-4">
                        {serverError.map((ele, i) => (
                            <li key={i} className="text-sm font-semibold text-red-500 opacity-80">
                                {ele.msg}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default YourRequestList;
