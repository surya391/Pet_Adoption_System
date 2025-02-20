import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createpetTypes,  updatePetType, deletePetType} from "../../slices/PetSlice";

const PetTypes = () => {
    const dispatch = useDispatch();
    const { petTypes, isLoading, serverError } = useSelector((state) => state.pet);
    
    const [formData, setFormData] = useState({ petType: "" });
    const [editId, setEditId] = useState(null);
    const [clientErrors, setClientErrors] = useState(null);
    

    useEffect(() => {
        // dispatch(fetchPetTypes()); // Fetch pet types on mount
    }, [dispatch]);

    const formValidate = () => {
        let errors = {};
        if (!formData.petType.trim()) errors.petType = "Pet type is required";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = formValidate();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
            return;
        }
        setClientErrors(null);

        if (editId) {
          console.log(editId)
            // Update pet type
            dispatch(updatePetType({ id: editId, petType: formData.petType }));
            setEditId(null);
        } else {
            // Create new pet type
            dispatch(createpetTypes({ petType: formData.petType }));
        }

        // Reset form
        setFormData({ petType: "" });
    };

    const handleEdit = (id, type) => {
        setEditId(id);
        setFormData({ petType: type });
    };

    const handleDelete = (id) => {
      console.log(id)
        dispatch(deletePetType(id));
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <div className="flex-1 p-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Manage Pet Types
                </h2>

                {/* Pet Type Form */}
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="text-sm font-medium text-gray-700">
                            {editId ? "Edit" : "Add"} Pet Type:
                        </label>
                        <input
                            type="text"
                            value={formData.petType}
                            onChange={(e) => setFormData({ petType: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter pet type"
                        />
                        {clientErrors?.petType && <p className="text-red-500 text-xs">{clientErrors.petType}</p>}
                        <div>
                        {
                            serverError && serverError.map((ele, i) => {
                                return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
                            })
                        }
                    </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition"
                        >
                            {editId ? "Update" : "Create"}
                        </button>
                    </form>
                </div>

                {/* Pet Types List */}
                <div className="mt-8 max-w-xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Existing Pet Types:</h3>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul className="bg-white p-4 rounded-lg shadow-md">
                            {petTypes.map((type) => (
                                <li key={type._id} className="flex justify-between items-center border-b py-2">
                                    <span className="text-gray-800">{type.petType}</span>
                                    <div className="space-x-3">
                                        <button
                                            onClick={() => handleEdit(type._id, type.petType)}
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

export default PetTypes;













// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {  createpetTypes, petTypes } from "../../slices/PetSlice";

// const PetTypes = () => {
//     const dispatch = useDispatch();
//     const { petTypes, isLoading } = useSelector((state) => state.pet);
    
//     const [petType, setPetType] = useState("");
//     const [editId, setEditId] = useState(null);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         // dispatch(petTypes());
//     }, [dispatch]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!petType.trim()) {
//             setError("Pet type is required");
//             return;
//         }
//         setError("");

//         if (editId) {
//             // dispatch(updatePetType({ id: editId, petType }));
//             setEditId(null);
//         } else {
//             dispatch(createpetTypes({ petType }));
//         }
//         setPetType("");
//     };

//     const handleEdit = (id, type) => {
//         setEditId(id);
//         setPetType(type);
//     };

//     const handleDelete = (id) => {
//         dispatch(deletePetType(id));
//     };

//     return (
//         <div className="flex bg-gray-100 min-h-screen">
//             <div className="flex-1 p-6">
//                 <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
//                     Manage Pet Types
//                 </h2>

//                 {/* Pet Type Form */}
//                 <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <label className="text-sm font-medium text-gray-700">
//                             {editId ? "Edit" : "Add"} Pet Type:
//                         </label>
//                         <input
//                             type="text"
//                             value={petType}
//                             onChange={(e) => setPetType(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                             placeholder="Enter pet type"
//                         />
//                         {error && <p className="text-red-500 text-xs">{error}</p>}

//                         <button
//                             type="submit"
//                             className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition"
//                         >
//                             {editId ? "Update" : "Create"}
//                         </button>
//                     </form>
//                 </div>

//                 {/* Pet Types List */}
//                 <div className="mt-8 max-w-xl mx-auto">
//                     <h3 className="text-lg font-semibold text-gray-700 mb-2">Existing Pet Types:</h3>
//                     {isLoading ? (
//                         <p>Loading...</p>
//                     ) : (
//                         <ul className="bg-white p-4 rounded-lg shadow-md">
//                             {petTypes.map((type) => (
//                                 <li
//                                     key={type._id}
//                                     className="flex justify-between items-center border-b py-2"
//                                 >
//                                     <span className="text-gray-800">{type.petType}</span>
//                                     <div className="space-x-3">
//                                         <button
//                                             onClick={() => handleEdit(type._id, type.petType)}
//                                             className="text-blue-500 hover:underline"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(type._id)}
//                                             className="text-red-500 hover:underline"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PetTypes;


