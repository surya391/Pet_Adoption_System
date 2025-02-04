import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profilePet, updatePet } from "../../slices/PetSlice";
import Select from 'react-select'
import Spinner from "../Frontpage/Spinner";
import SideNavbar from "../Frontpage/SideNavBar";
import { useNavigate } from "react-router-dom";

function PetProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { serverError,  petTypes,yoursPets , isLoading, petId, isEditing } = useSelector((state) => state.pet);
    const pet = yoursPets.find((ele)=>ele._id === petId)

    const [formData, setFormData] = useState({
        petImage: pet?.petImage || null,
        petName: pet?.petName || "",
        petType: pet?.petType || "",
        petAge: pet?.petAge || "",
        gender: pet?.gender || "",
        file: null
    });

    // const [petPicPreview, setPicPreview] = useState(null);
    const [clientErrors, setClientErrors] = useState(null);

    const options = petTypes.map(ele => ({ value: ele.petType, label: ele.petType }))
    // console.log(options)
    // Validation function
    const formValidate = () => {
        let errors = {};
        if (!formData.petImage) errors.petImage = "Pet Image is required";
        if (!formData.petName.trim()) errors.petName = "Pet Name is required";
        if (!formData.petType.trim()) errors.petType = "Pet Type is required";
        if (!formData.gender.trim()) errors.gender = "Pet gender is required";
        if (!formData.petAge) {
            errors.petAge = "Pet age is required";
        }
        return errors;
    };

    const handleSelectChange = (selectedValue) => {
        setFormData({ ...formData, petType: selectedValue.value })
    }
    // console.log(formData)
    // useEffect(() => {
    //     if (petDetails) {
    //         setFormData({
    //             petImage: petDetails.petImage,
    //             petName: petDetails.petName,
    //             petType: petDetails.petType,
    //             petAge: petDetails.petAge,
    //             gender: petDetails.gender
    //         });

    //         if (petDetails.petImage) {
    //             setPicPreview(petDetails.petImage);
    //         }
    //     }
    // }, [petDetails]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = formValidate();

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            setClientErrors(null);

            const updateData = new FormData();
            if (formData.petImage) updateData.append("petImage", formData.petImage);
            updateData.append("petName", formData.petName);
            updateData.append("petType", formData.petType);
            updateData.append("petAge", formData.petAge);
            updateData.append("gender", formData.gender);
            if(!isEditing){
            dispatch(profilePet(updateData));
            }else{
               
                const actionResult = await  dispatch(updatePet({id:petId, formData}))
                            if (actionResult.type === updatePet.fulfilled.type) {
                                navigate('/yoursPetList');
                            }
            }
            // Reset form
            setFormData({
                petImage: null,
                petName: "",
                petType: "",
                petAge: "",
                gender: ""
            });

        }
    };

return (
    <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen">
      <div className="w-auto p-0">
        <SideNavbar />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">{ isEditing? "Edit " : "Add " }Pet Profile</h2>
          {isLoading && <Spinner />}
          <form onSubmit={handleSubmit} className="space-y-4">
             <label className="block text-sm font-medium text-gray-700">Pet Image:</label>
             <img src={formData.file? formData.file : formData.petImage} alt="Preview" className="mt-2 w-24 h-24 rounded-full shadow-md border-2 border-gray-300 object-cover" />
             <input
               type="file"
               accept="image/*"
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-gray-700 file:bg-gray-100 hover:file:bg-gray-200"
                 onChange={(e) => {
                     const file = e.target.files[0];
                     if (file) {
                         setFormData({ ...formData, petImage: file, file : URL.createObjectURL(file) });
                    }
                }}
            />
            {clientErrors?.petImage && <p className="text-red-500 text-xs">{clientErrors.petImage}</p>}

            <label className="block text-sm font-medium text-gray-700">Pet Name:</label>
            <input
                type="text"
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {clientErrors?.petName && <p className="text-red-500 text-xs">{clientErrors.petName}</p>}

            <label className="block text-sm font-medium text-gray-700">Pet Type:</label>
            <Select options={options} value={options.find(option => option.value === formData.petType)} onChange={handleSelectChange} className="mt-1 block w-full" />
            {clientErrors?.petType && <p className="text-red-500 text-xs">{clientErrors.petType}</p>}

            <label className="block text-sm font-medium text-gray-700">Age:</label>
            <input
                type="number"
                value={formData.petAge}
                onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {clientErrors?.petAge && <p className="text-red-500 text-xs">{clientErrors.petAge}</p>}

            <label className="block text-sm font-medium text-gray-700">Gender:</label>
            <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            {clientErrors?.gender && <p className="text-red-500 text-xs">{clientErrors.gender}</p>}

            <div>
                {serverError && serverError.map((ele, i) => (
                    <li key={i} className="text-sm font-semibold text-red-500 opacity-80">{ele.msg}</li>
                ))}
            </div>

            <div>
                <input
                    type="submit"
                    value = { isEditing? "Edit" : "Create" }
                    className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition mt-4 cursor-pointer"
                />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
  
}

export default PetProfile;




    // return (
    //     <div>
    //         <h2>Pet Profile</h2>
    //         {isLoading && <Spinner />}
    //         <form onSubmit={handleSubmit}>
    //             <label>Pet Image:</label>
    //             <input
    //                 type="file"
    //                 accept="image/*"
    //                 onChange={(e) => {
    //                     const file = e.target.files[0];
    //                     if (file) {
    //                         setFormData({ ...formData, petImage: file });
    //                         setPicPreview(URL.createObjectURL(file));
    //                     }
    //                 }}
    //             />
    //             {petPicPreview && <img src={petPicPreview} alt="Preview" width="100" />}
    //             {clientErrors?.petImage && <p style={{ color: "red" }}>{clientErrors.petImage}</p>}<br />

    //             <br />
    //             <label>Pet Name:</label>
    //             <input
    //                 type="text"
    //                 value={formData.petName}
    //                 onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
    //             />
    //             {clientErrors?.petName && <p style={{ color: "red" }}>{clientErrors.petName}</p>}<br />

    //             <label htmlFor="petType">Pet Type:</label>
    //             <Select
    //                 options={options}
    //                 onChange={handleSelectChange}
    //             />

    //             {clientErrors?.petType && <p style={{ color: "red" }}>{clientErrors.petType}</p>}<br />

    //             <label>Age:</label>
    //             <input
    //                 type="number"
    //                 value={formData.petAge}
    //                 onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
    //             />
    //             {clientErrors?.petAge && <p style={{ color: "red" }}>{clientErrors.petAge}</p>}<br />

    //             <label>Gender:</label>
    //             <select
    //                 value={formData.gender}
    //                 onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
    //             >
    //                 <option value="">Select Gender</option>
    //                 <option value="male">Male</option>
    //                 <option value="female">Female</option>
    //             </select>
    //             {clientErrors?.gender && <p style={{ color: "red" }}>{clientErrors.gender}</p>}<br />

    //             <div >
    //                 {
    //                     serverError && serverError.map((ele, i) => {
    //                         return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
    //                     })
    //                 }
    //             </div>
    //             <div>
    //                 <input type="submit" value = "Create"/>
    //             </div>
    //         </form>
    //     </div>
    // );

// return(
//     <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen">
//         <div className="w-auto p-0  pr">
//                 <SideNavbar />
//         </div>
            
//     <div className="bg-white p-6 w-full max-h-md">
//         <div >
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Pet Profile</h2>
        
//         {isLoading && <Spinner />}
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <label className="block text-sm font-medium text-gray-700">Pet Image:</label>
//             <input
//                 type="file"
//                 accept="image/*"
//                 className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-gray-700 file:bg-gray-100 hover:file:bg-gray-200"
//                 onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                         setFormData({ ...formData, petImage: file });
//                         setPicPreview(URL.createObjectURL(file));
//                     }
//                 }}
//             />
//             {petPicPreview && <img src={petPicPreview} alt="Preview" className="mt-2 w-24 h-24 rounded-full shadow-md border-2 border-gray-300 object-cover" />}
//             {clientErrors?.petImage && <p className="text-red-500 text-xs">{clientErrors.petImage}</p>}

//             <label className="block text-sm font-medium text-gray-700">Pet Name:</label>
//             <input
//                 type="text"
//                 value={formData.petName}
//                 onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {clientErrors?.petName && <p className="text-red-500 text-xs">{clientErrors.petName}</p>}

//             <label className="block text-sm font-medium text-gray-700">Pet Type:</label>
//             <Select options={options} onChange={handleSelectChange} className="mt-1 block w-full" />
//             {clientErrors?.petType && <p className="text-red-500 text-xs">{clientErrors.petType}</p>}

//             <label className="block text-sm font-medium text-gray-700">Age:</label>
//             <input
//                 type="number"
//                 value={formData.petAge}
//                 onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {clientErrors?.petAge && <p className="text-red-500 text-xs">{clientErrors.petAge}</p>}

//             <label className="block text-sm font-medium text-gray-700">Gender:</label>
//             <select
//                 value={formData.gender}
//                 onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//             </select>
//             {clientErrors?.gender && <p className="text-red-500 text-xs">{clientErrors.gender}</p>}

//             <div>
//                 {serverError && serverError.map((ele, i) => (
//                     <li key={i} className="text-sm font-semibold text-red-500 opacity-80">{ele.msg}</li>
//                 ))}
//             </div>

//             <div>
//                 <input
//                     type="submit"
//                     value="Create"
//                     className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition mt-4 cursor-pointer"
//                 />
//             </div>
//         </form></div>
//     </div>
// </div>)

