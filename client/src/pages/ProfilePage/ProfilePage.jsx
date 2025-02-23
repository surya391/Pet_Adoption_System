import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  createProfile, updateProfile } from '../../slices/ProfileSlice';
import { format } from "date-fns"
import Spinner from '../Frontpage/Spinner';
import SideNavbar from '../Frontpage/SideNavBar';

import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const dispatch = useDispatch();
    // const { serverError, userDetails, isLoading, profile } = useSelector(state => state.profile);
    const { serverError, userDetails, isLoading  } = useSelector(state => state.profile);

    const navigate = useNavigate();


    const { userInfo } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        profilePic: null,
        bio: "",
        gender: "",
        dateOfBirth: "",
        address: {
            buildingNo: "",
            street: "",
            city: "",
            state: "",
            country: "",
            pincode: ""
        }
    });

    const [profilePicPreview, setProfilePicPreview] = useState(null);
    // const [userDetail, setUserDetail] = useState([]);
    const [clientErrors, setClientErrors] = useState(null);

    useEffect(() => {
        if (userDetails) {
            setFormData({
                profilePic: userDetails?.profilePic,
                bio: userDetails?.bio,
                gender: userDetails?.gender,
                dateOfBirth: format(userDetails?.dateOfBirth, 'yyyy-MM-dd'),
                address: {
                    buildingNo: userDetails?.address?.buildingNo,
                    street: userDetails?.address?.street,
                    city: userDetails?.address?.city,
                    state: userDetails?.address?.state,
                    country: userDetails?.address?.country,
                    pincode: userDetails?.address?.pincode
                }
            })
        }
    }, [userDetails]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicPreview(URL.createObjectURL(file));
            setFormData({
                ...formData,
                profilePic: file
            });
        }
    };

    const formvalidate = () => {
        let errors = {};

        if (!formData.bio.trim()) errors.bio = "Bio cannot be empty";
        if (!formData.gender.trim()) errors.gender = "Gender cannot be empty";
        if (!formData.dateOfBirth.trim()) errors.dateOfBirth = "DOB must be in yyyy-mm-dd format";

        if (!formData.address.buildingNo.trim()) {
            errors.buildingNo = "Building No cannot be empty";
        }
        if (!formData.address.street.trim()) {
            errors.street = "Street cannot be empty";
        }
        if (!formData.address.city.trim()) {
            errors.city = "City cannot be empty";
        }
        if (!formData.address.state.trim()) {
            errors.state = "State cannot be empty";
        }
        if (!formData.address.country.trim()) {
            errors.country = "Country cannot be empty";
        }
        if (!formData.address.pincode) {
            errors.pincode = "Pincode cannot be empty";
        } else if (formData.address.pincode.length < 6 || formData.address.pincode.length > 6) {
            errors.pincode = "Pincode must be exactly 6 digits";
        }

        return errors;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = formvalidate();

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            setClientErrors(null);

            const uploadData = new FormData();
            uploadData.append("bio", formData.bio);
            uploadData.append("gender", formData.gender);
            uploadData.append("dateOfBirth", formData.dateOfBirth);
            if (formData.profilePic !== "null") {
                uploadData.append("profilePic", formData.profilePic);
            }
            Object.keys(formData.address).forEach(key => {
                uploadData.append(`address[${key}]`, formData.address[key]);
            });

            if (userDetails) {
                dispatch(updateProfile(uploadData));
            } else {
                dispatch(createProfile(uploadData));
            }
        }
    };

    return (
<div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen">
  {/* {<SideNavbar /> }  */}
  {/* {(userInfo?.role === "owner" || userInfo?.role === "admin") && <SideNavbar />} */}
  {(userInfo?.role === "owner" && <SideNavbar />)}

  <div className="w-full bg-white shadow-lg p-8">
    <div>
      <h2 className="text-2xl text-gray-800 mb-4 text-center">Profile Page</h2>
      {isLoading && <Spinner />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-row w-full">
          {/* Left Column */}
          <div className="w-1/2 p-2 mx-3">
            {/* Profile Picture Section */}
            <div className="flex items-center space-x-4 mb-4">
              <div>
                {formData.profilePic && (
                  <img
                    src={formData.profilePic}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full shadow-md"
                  />
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="p-1 border border-gray-300 rounded-md text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Bio Section */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Bio</label>
              <input
                type="text"
                placeholder="Add a short bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {clientErrors?.bio && <p className="text-sm text-red-500 mt-1">{clientErrors.bio}</p>}
            </div>

            {/* Gender Section */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {clientErrors?.gender && <p className="text-sm text-red-500 mt-1">{clientErrors.gender}</p>}
            </div>

            {/* Date of Birth Section */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {clientErrors?.dateOfBirth && (
                <p className="text-sm text-red-500 mt-1">{clientErrors.dateOfBirth}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2 p-6  ">
            {/* Address Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Address</h3>
              <div className="grid grid-cols-2 gap-4">
                {["buildingNo", "street", "city", "state", "country", "pincode"].map((field, index) => (
                  <div key={index}>
                    <label className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
                    <input
                      type={field === "pincode" ? "number" : "text"}
                      value={formData.address[field]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, [field]: e.target.value },
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {clientErrors?.[field] && (
                      <p className="text-sm text-red-500 mt-1">{clientErrors[field]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            {/* <div className="flex justify-center">
              <button
                type="submit"
                className={`px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition duration-300 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div> */}


<div className="flex space-x-4"> 
  <button
    type="submit"
    className={`px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition duration-300 ${
      isLoading ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={isLoading}
  >
    {isLoading ? "Submitting..." : "Submit"}
  </button>
  
  <button 
  onClick={() => navigate('/changepassword')}
  className={`px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition duration-300 ${
    isLoading ? "opacity-50 cursor-not-allowed" : ""
  }`}
  disabled={isLoading}
>
  Update Password
</button>

</div>

          </div>
        </div>
      </form>
    </div>
  </div>
  
</div> 

    )
}
export default ProfilePage;

        // <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen">
        //     <SideNavbar />
        //     <div className="w-full   bg-white shadow-lg p-8 ">
        //         <div>
        //             <h2 className="text-2xl text-gray-800 mb-4 text-center">Profile Page</h2>
        //             {isLoading && <Spinner />}
        //             <form onSubmit={handleSubmit} className="space-y-4">
        //                 <div className='flex flex-row w-full'>
        //                     <div className='p-2 mx-3 '>
        //                         {/* Profile Picture Section */}
        //                         <div className="flex items-center space-x-2">
        //                             <div>
        //                                 {formData.profilePic && (
        //                                     <img
        //                                         src={formData.profilePic}
        //                                         alt="Profile Preview"
        //                                         className="w-30 h-30 rounded-full shadow-md"
        //                                     />
        //                                 )}
        //                             </div>
        //                             <div>
        //                                 <label className="block text-gray-700 font-medium mb-1">Profile Picture</label>
        //                                 <input
        //                                     type="file"
        //                                     accept="image/*"
        //                                     onChange={handleImageChange}
        //                                     className="p-1 border border-gray-300 rounded-md text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                                 />
        //                             </div>
        //                         </div>


        //                         {/* Bio Section */}
        //                         <div>
        //                             <label className="block text-gray-700 font-medium mb-1">Bio</label>
        //                             <input
        //                                 type="text"
        //                                 placeholder="Add a short bio"
        //                                 value={formData.bio}
        //                                 onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        //                                 className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                             />
        //                             {clientErrors?.bio && <p className="text-sm text-red-500 mt-1">{clientErrors.bio}</p>}
        //                         </div>

        //                         {/* Gender Section */}
        //                         <div>
        //                             <label className="block text-gray-700 font-medium mb-1">Gender</label>
        //                             <select
        //                                 value={formData.gender}
        //                                 onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        //                                 className="w-full p-1 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                             >
        //                                 <option value="" disabled>
        //                                     Select Gender
        //                                 </option>
        //                                 <option value="male">Male</option>
        //                                 <option value="female">Female</option>
        //                                 <option value="other">Other</option>
        //                             </select>
        //                             {clientErrors?.gender && <p className="text-sm text-red-500 mt-1">{clientErrors.gender}</p>}
        //                         </div>

        //                         {/* Date of Birth Section */}
        //                         <div>
        //                             <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
        //                             <input
        //                                 type="date"
        //                                 value={formData.dateOfBirth}
        //                                 onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        //                                 className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                             />
        //                             {clientErrors?.dateOfBirth && (
        //                                 <p className="text-sm text-red-500 mt-1">{clientErrors.dateOfBirth}</p>
        //                             )}
        //                         </div>
        //                     </div>
        //                     <div>
        //                         {/* Address Section */}
        //                         <div> 
        //                             <h3 className="text-lg font-semibold text-gray-700 mb-2">Address : </h3>
        //                             {["buildingNo", "street", "city", "state", "country", "pincode"].map((field, index) => (
        //                                 <div key={index} className="mb-2">
        //                                     <label className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
        //                                     <input
        //                                         type={field === "pincode" ? "number" : "text"}
        //                                         value={formData.address[field]}
        //                                         onChange={(e) =>
        //                                             setFormData({
        //                                                 ...formData,
        //                                                 address: { ...formData.address, [field]: e.target.value },
        //                                             })
        //                                         }
        //                                         className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                                     />
        //                                     {clientErrors?.[field] && (
        //                                         <p className="text-sm text-red-500 mt-1">{clientErrors[field]}</p>
        //                                     )}
        //                                 </div>
        //                             ))}
        //                         </div>

        //                         {/* Submit Button */}
        //                         <div className="flex justify-center">
        //                             <button
        //                                 type="submit"
        //                                 className="px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition duration-300"
        //                             >
        //                                 Submit
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>



  /*  return (
         <div>
             <h2>Profile Page</h2>
             <form onSubmit={handleSubmit}>
                 <div>
                     <label>Profile Picture:</label>
                     <input type="file" accept="image/*" onChange={handleImageChange} />
                     {formData.profilePic && <img src={formData.profilePic} alt="Profile Preview" width={100} />}
                 </div>
 
                 <div>
                     <label>Bio:</label>
                     <input
                         type="text"
                         placeholder="Bio"
                         value={formData.bio}
                         onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                     />
                     {clientErrors?.bio && <p className="error">{clientErrors.bio}</p>}
                 </div>
 
                 <div>
                     <label>Gender:</label>
                     <input
                         type="text"
                         placeholder="Gender"
                         value={formData.gender}
                         onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                     />
                     {clientErrors?.gender && <p className="error">{clientErrors.gender}</p>}
                 </div>
 
                 <div>
                     <label>Date of Birth:</label>
                     <input
                         type="date"
                         value={formData.dateOfBirth}
                         onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                     />
                     {clientErrors?.dateOfBirth && <p className="error">{clientErrors.dateOfBirth}</p>}
                 </div>
 
                 <h3>Address</h3>
                 <div>
                     <label>Building No:</label>
                     <input
                         type="text"
                         value={formData.address.buildingNo}
                         onChange={(e) => setFormData({ 
                             ...formData, 
                             address: { ...formData.address, buildingNo: e.target.value }
                         })}
                     />
                     {clientErrors?.buildingNo && <p className="error">{clientErrors.buildingNo}</p>}
                 </div>
 
                 <div>
                     <label>Street:</label>
                     <input
                         type="text"
                         value={formData.address.street}
                         onChange={(e) => setFormData({ 
                             ...formData, 
                             address: { ...formData.address, street: e.target.value }
                         })}
                     />
                     {clientErrors?.street && <p className="error">{clientErrors.street}</p>}
                 </div>
 
                 <div>
                     <label>City:</label>
                     <input
                         type="text"
                         value={formData.address.city}
                         onChange={(e) => setFormData({ 
                             ...formData, 
                             address: { ...formData.address, city: e.target.value }
                         })}
                     />
                     {clientErrors?.city && <p className="error">{clientErrors.city}</p>}
                 </div>
 
                 <div>
                     <label>State:</label>
                     <input
                         type="text"
                         value={formData.address.state}
                         onChange={(e) => setFormData({ 
                             ...formData, 
                             address: { ...formData.address, state: e.target.value }
                         })}
                     />
                     {clientErrors?.city && <p className="error">{clientErrors.city}</p>}
                 </div>
 
                 <div>
                     <label>Country:</label>
                     <input
                         type="text"
                         value={formData.address.country}
                         onChange={(e) => setFormData({ 
                             ...formData, 
                             address: { ...formData.address, country: e.target.value }
                         })}
                     />
                     {clientErrors?.country && <p className="error">{clientErrors.country}</p>}
                 </div>
 
                 <div>
                     <label>Pincode:</label>
                     <input
                         type="number"
                         value={formData.address.pincode}
                         onChange={(e) => setFormData({ 
                             ...formData, 
                             address: { ...formData.address, pincode: e.target.value }
                         })}
                     />
                     {clientErrors?.pincode && <p className="error">{clientErrors.pincode}</p>}
                 </div>
 
                 <button type="submit">Submit</button>
             </form>
         </div>
     );
 } */



/* 

      <div className="flex max-w-screen-lg">
         <div className="w-auto p-0  pr-2">
            <SideNavbar />
        </div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Profile Page</h2>
          {isLoading && <Spinner />}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Profile Picture:</label>
                        {formData.profilePic && <img src={formData.profilePic} alt="Profile Preview" width={100} className="mt-2 rounded-md shadow-md" />}<br/>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="p-1 border border-gray-300 rounded-md" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Bio:</label>
                        <input
                            type="text"
                            placeholder="Bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors?.bio && <p className="text-sm text-red-500 mt-1">{clientErrors.bio}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Gender:</label>
                        <select
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {clientErrors?.gender && <p className="text-sm text-red-500 mt-1">{clientErrors.gender}</p>}
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Date of Birth:</label>
                        <input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors?.dateOfBirth && <p className="text-sm text-red-500 mt-1">{clientErrors.dateOfBirth}</p>}
                    </div>

                    <h3 className="text-xl font-semibold">Address</h3>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Building No:</label>
                        <input
                            type="text"
                            value={formData.address.buildingNo}
                            onChange={(e) => setFormData({
                                ...formData,
                                address: { ...formData.address, buildingNo: e.target.value }
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors?.buildingNo && <p className="text-sm text-red-500 mt-1">{clientErrors.buildingNo}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Street:</label>
                        <input
                            type="text"
                            value={formData.address.street}
                            onChange={(e) => setFormData({
                                ...formData,
                                address: { ...formData.address, street: e.target.value }
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors?.street && <p className="text-sm text-red-500 mt-1">{clientErrors.street}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">City:</label>
                        <input
                            type="text"
                            value={formData.address.city}
                            onChange={(e) => setFormData({
                                ...formData,
                                address: { ...formData.address, city: e.target.value }
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors?.city && <p className="text-sm text-red-500 mt-1">{clientErrors.city}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">State:</label>
                        <input
                            type="text"
                            value={formData.address.state}
                            onChange={(e) => setFormData({
                                ...formData,
                                address: { ...formData.address, state: e.target.value }
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors?.state && <p className="text-sm text-red-500 mt-1">{clientErrors.state}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Country:</label>
                        <input
                            type="text"
                            value={formData.address.country}
                            onChange={(e) => setFormData({
                                ...formData,
                                address: { ...formData.address, country: e.target.value }
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors?.country && <p className="text-sm text-red-500 mt-1">{clientErrors.country}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Pincode:</label>
                        <input
                            type="number"
                            value={formData.address.pincode}
                            onChange={(e) => setFormData({
                                ...formData,
                                address: { ...formData.address, pincode: e.target.value }
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors?.pincode && <p className="text-sm text-red-500 mt-1">{clientErrors.pincode}</p>}
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300">
                        Submit
                    </button>
                </form>
            </div>
        ); */