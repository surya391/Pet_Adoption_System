import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createRequestPet, myPetList, updateRequestPet } from "../../slices/RequestSlice";
import SideNavbar from "../Frontpage/SideNavBar";
import Spinner from "../Frontpage/Spinner";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"

function RequestPets() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { serverError, isLoading, petId, requestTypes, requestPets, isEditing, requestId } = useSelector((state) => state.request);


    const [formData, setFormData] = useState({
        petId: "",
        description: "",
        requestType: "",
        phone: "",
        startDatetime: "",
        endDatetime: "",
        amount: "",
    });

    useEffect(() => {
        if (isEditing) {
            const requestInfo = requestPets.find((ele) => ele._id === requestId)
            // console.log("requestInfo", requestInfo)
            setFormData({
                petId: requestInfo?.petId?._id,
                description: requestInfo?.description,
                requestType: requestInfo?.requestType,
                phone: requestInfo?.phone,
                // startDatetime: requestInfo?.startDatetime,
                // endDatetime: requestInfo?.endDatetime,
                startDatetime: format(new Date(requestInfo?.startDatetime), "yyyy-MM-dd HH:mm:ss"),
                endDatetime: format(new Date(requestInfo?.endDatetime), "yyyy-MM-dd HH:mm:ss"),
                // startDatetime: format(requestInfo?.startDatetime, 'yyyy-MM-ddThh:mm'),
                // endDatetime: format(requestInfo?.endDatetime, 'yyyy-MM-ddThh:mm'),
                
                amount: requestInfo?.amount,
            })
        }
    }, [])

    const options = petId.map(ele => ({ value: ele._id, label: ele.petName }));
    // console.log(options)
    const option = requestTypes.map(ele => ({ value: ele._id, label: ele.type }));

    const [clientErrors, setClientErrors] = useState({});

    const formValidate = () => {
        let errors = {};
        if (!formData.petId) errors.petId = "Pet details are required";
        if (!formData.description) errors.description = "Description is required";
        if (!formData.requestType) errors.requestType = "Request type is required";
        // if (!formData.location) errors.location = "Location is required";
        if (!formData.phone) errors.phone = "Phone number is required";
        if (!formData.startDatetime) errors.startDatetime = "Start date is required";
        if (!formData.endDatetime) errors.endDatetime = "End date is required";
        if (!formData.amount) {
            errors.amount = "Amount is required"
        } else if (formData.amount < 1) {
            errors.amount = "Amount is greater then zero"
        }
        return errors;
    };
    const handleSelectChange = (selectedValue) => {
        // console.log(selectedValue)
        setFormData({ ...formData, petId: selectedValue.value })
    }
    const handleChange = (selectedValue) => {
        setFormData({ ...formData, requestType: selectedValue.value })
    }
    // console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = formValidate();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            setClientErrors({});

            const updateData = new FormData();
            updateData.append("description", formData.description);
            updateData.append("requestType", formData.requestType);
            updateData.append("phone", formData.phone);
            updateData.append("startDatetime", formData.startDatetime);
            updateData.append("endDatetime", formData.endDatetime);
            updateData.append("amount", formData.amount);

            if (!isEditing) {
                dispatch(createRequestPet(formData));
            } else {
                const actionResult = await dispatch(updateRequestPet({ id: requestId, formData }))
                // console.log(actionResult)
                if (actionResult.type === updateRequestPet.fulfilled.type) {
                    navigate('/requestList');
                }
            }

            setFormData({
                petId: "",
                description: "",
                requestType: "",
                phone: "",
                startDatetime: "",
                endDatetime: "",
                amount: "",
            });
        }
    };

    return (
        <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen">
            <SideNavbar />
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-4">
                <h2 className="text-2xl font-bold text-gray-700 text-center">Request Pet Service</h2>
                {isLoading && <Spinner />}
                <form onSubmit={handleSubmit} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Pet Name:</label>
                    <Select options={options} value={options.find(option => option.value === formData.petId)} onChange={handleSelectChange} className="mt-1 block w-full" isDisabled={isEditing} />
                    {clientErrors?.petId && <p className="text-red-500 text-xs">{clientErrors.petId}</p>}

                    <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.description && <p className="text-red-500">{clientErrors.description}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Request Type:</label>
                        <Select
                            options={option}
                            value={option.find(option => option.value === formData.requestType)}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                        />
                        {clientErrors?.requestType && <p className="text-red-500 text-xs">{clientErrors.requestType}</p>}
                    </div>

                    {/* <div>
                        <label className="block text-gray-700 font-medium">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.location && <p className="text-red-500">{clientErrors.location}</p>}
                    </div> */}

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
                    <div>
                        <input
                            type="submit"
                            // value = { isEditing? "Edit" : "Create" }
                            // value="submit"
                            value={isEditing ? "Update" : "Create"}
                            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition mt-4 cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </div>
    );

}

export default RequestPets;
