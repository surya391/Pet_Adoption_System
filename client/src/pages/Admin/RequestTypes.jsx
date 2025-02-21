import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRequestTypes, updateRequestTypes, deleteRequestTypes, setIsEditing } from "../../slices/RequestSlice";

const RequestTypes = () => {
    const dispatch = useDispatch();
    const { requestTypes, isLoading, serverError, requestId } = useSelector((state) => state.request);
    const [formData, setFormData] = useState({ requestType: "" });
    const [editId, setEditId] = useState(null);
    const [clientErrors, setClientErrors] = useState(null);

    console.log("requestId", requestId)

    useEffect(() => {
        // console.log("page open")

        const type = requestTypes.find(ele => ele._id === requestId)
        if (type) {
            setFormData({
                requestType: type?.type || ""
            })
        }
       
    }, [requestId]);

    const formValidate = () => {
        let errors = {};
        if (!formData.requestType.trim()) errors.requestType = "Request type is required";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = formValidate();

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
            return;
        }
console.log(formData)
        setClientErrors(null);

        if (requestId) {
            // Update request type
            dispatch(updateRequestTypes({ id: requestId, type: formData.requestType }));
        } else {
            // Create new request type
            dispatch(createRequestTypes({ type: formData.requestType }));
        }

        // Reset form
        setFormData({ requestType: "" });
    };

    const handleEdit = (id) => {
        dispatch(setIsEditing(id))
    };

    const handleDelete = (id) => {
        dispatch(deleteRequestTypes(id));
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <div className="flex-1 p-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Manage Request Types
                </h2>

                {/* Request Type Form */}
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="text-sm font-medium text-gray-700">
                            {requestId ? "Edit" : "Add"} Request Type:
                        </label>
                        <input
                            type="text"
                            value={formData.requestType}
                            onChange={(e) => setFormData({ requestType: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter request type"
                        />
                        {clientErrors?.requestType && <p className="text-red-500 text-xs">{clientErrors.requestType}</p>}
                        <div>
                            {serverError?.length > 0 && serverError.map((ele, i) => (
                                <li key={i} className="text-sm font-semibold text-red-500 opacity-80">{ele.msg}</li>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition"
                        >
                            {requestId ? "Update" : "Create"}
                        </button>
                    </form>
                </div>

                {/* Request Types List */}
                <div className="mt-8 max-w-xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Existing Request Types:</h3>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul className="bg-white p-4 rounded-lg shadow-md">
                            {requestTypes.map((type) => (
                                <li key={type._id} className="flex justify-between items-center border-b py-2">
                                    <span className="text-gray-800">{type.type}</span>
                                    <div className="space-x-3">
                                        <button
                                            onClick={() => handleEdit(type._id, type.requestType)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(type._id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestTypes;
