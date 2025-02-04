import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createRequestPet } from "../../slices/RequestSlice";
import SideNavbar from "../Frontpage/SideNavBar";
import Select from 'react-select'

function RequestPets() {
    const dispatch = useDispatch();
    const { serverError, isLoading, petId, requestDetails } = useSelector((state) => state.request);
    console.log(petId)
    const [formData, setFormData] = useState({
        petId: "",
        description: "",
        requestType: "",
        location: "",
        phone: "",
        startDatetime: "",
        endDatetime: "",
        amount: "",
    });
    const options = petId.map(ele => ({ value: ele.petId, label: ele.petId }))

    const [clientErrors, setClientErrors] = useState({});

    const formValidate = () => {
        let errors = {};
        if (!formData.petId) errors.petId = "Pet details are required";
        if (!formData.description) errors.description = "Description is required";
        if (!formData.requestType) errors.requestType = "Request type is required";
        if (!formData.location) errors.location = "Location is required";
        if (!formData.phone) errors.phone = "Phone number is required";
        if (!formData.startDatetime) errors.startDatetime = "Start date is required";
        if (!formData.endDatetime) errors.endDatetime = "End date is required";
        if (!formData.amount) errors.amount = "Amount is required";
        return errors;
    };
    const handleSelectChange = (selectedValue) => {
        setFormData({ ...formData, petId: selectedValue.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = formValidate();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            setClientErrors({});
              
            dispatch(createRequestPet(formData));
            setFormData({
                petId: "",
                description: "",
                requestType: "",
                location: "",
                phone: "",
                startDatetime: "",
                endDatetime: "",
                amount: "",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <SideNavbar />
            <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Request Pet Service</h2>
                {/* {serverError && <p className="text-red-500 text-center mb-4">{serverError}</p>} */}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* <div>
                        <label className="block text-gray-700 font-medium">Pet ID</label>
                        <input
                            type="text"
                            value={formData.petId}
                            onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.petId && <p className="text-red-500">{clientErrors.petId}</p>}
                    </div> */}
                     <label className="block text-sm font-medium text-gray-700">Pet Id:</label>
            <Select options={options} onChange={handleSelectChange} className="mt-1 block w-full" />
            {clientErrors?.petId && <p className="text-red-500 text-xs">{clientErrors.petId}</p>}

                    <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.description && <p className="text-red-500">{clientErrors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Request Type</label>
                        <input
                            type="text"
                            value={formData.requestType}
                            onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.requestType && <p className="text-red-500">{clientErrors.requestType}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.location && <p className="text-red-500">{clientErrors.location}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Phone</label>
                        <input
                            type="number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.phone && <p className="text-red-500">{clientErrors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Start Date</label>
                        <input
                            type="datetime-local"
                            value={formData.startDatetime}
                            onChange={(e) => setFormData({ ...formData, startDatetime: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.startDatetime && <p className="text-red-500">{clientErrors.startDatetime}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">End Date</label>
                        <input
                            type="datetime-local"
                            value={formData.endDatetime}
                            onChange={(e) => setFormData({ ...formData, endDatetime: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.endDatetime && <p className="text-red-500">{clientErrors.endDatetime}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Amount</label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.amount && <p className="text-red-500">{clientErrors.amount}</p>}
                    </div>
                    <div>
                        {
                            serverError && serverError.map((ele, i) => {
                                return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
                            })
                        }
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 rounded-md text-white font-semibold transition ${isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RequestPets;
