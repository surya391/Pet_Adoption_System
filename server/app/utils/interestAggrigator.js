// const aggrigatorForInterestedProviders = () => {
//     const pipeLine = [];

//     // Lookup user details for each `pID` inside `interestedServiceProviders`
//     pipeLine.push({
//         $lookup: {
//             from: "users", // Assuming "users" collection holds user details
//             localField: "interestedServiceProviders.pID",
//             foreignField: "_id",
//             as: "providerUsers"
//         }
//     });

//     // Lookup profile details for each provider
//     pipeLine.push({
//         $lookup: {
//             from: "profiles",
//             localField: "interestedServiceProviders.pID",
//             foreignField: "userId", // Assuming profile is linked via `userId`
//             as: "providerProfiles"
//         }
//     });

//     // Unwind arrays to get structured data
//     pipeLine.push({ $unwind: { path: "$providerUsers", preserveNullAndEmptyArrays: true } });
//     pipeLine.push({ $unwind: { path: "$providerProfiles", preserveNullAndEmptyArrays: true } });

//     // Project only required fields
//     pipeLine.push({
//         $project: {
//             _id: 1,
//             requestId: 1,
//             ownerId: 1,
//             "interestedServiceProviders.pID": 1,
//             "providerUsers.name": 1,
//             "providerUsers.email": 1,
//             "providerProfiles.address": 1,
//             "providerProfiles.phone": 1
//         }
//     });

//     return pipeLine;
// };

// export default aggrigatorForInterestedProviders;




import mongoose from "mongoose";
export const aggrigatorForInterestedProviders = (userId, requestId) => {
    return [
        {
            $match: {
                ownerId: new mongoose.Types.ObjectId(userId),
                requestId: new mongoose.Types.ObjectId(requestId),
            },
        },
        {
            $unwind: "$interestedServiceProviders",
        },
        {
            $lookup: {
                from: "users",
                localField: "interestedServiceProviders.pID",
                foreignField: "_id",
                as: "provider",
            },
        },
        {
            $lookup: {
                from: "profiles",
                localField: "interestedServiceProviders.pID",
                foreignField: "userId",
                as: "profile",
            },
        },
        // Flatten the user and profile data (get first element from array)
        {
            $addFields: {
                "interestedServiceProviders.provider": { $arrayElemAt: ["$provider", 0] },
                "interestedServiceProviders.profile": { $arrayElemAt: ["$profile", 0] },
            },
        },
        {
            $project: {
                "interestedServiceProviders.provider._id": 0, // Exclude sensitive data
                "interestedServiceProviders.provider.password": 0, 
                "interestedServiceProviders.provider.role": 0,
                "interestedServiceProviders.provider.isVerified": 0,
                "interestedServiceProviders.provider.createdAt": 0,
                "interestedServiceProviders.provider.updatedAt": 0,
                "interestedServiceProviders.provider.__v": 0,
                "interestedServiceProviders.profile._id": 0, 
                "interestedServiceProviders.profile.dateOfBirth": 0, // Exclude __v
                "interestedServiceProviders.profile.userId": 0, // Exclude userId from profile
                "interestedServiceProviders.profile.createdAt": 0, // Exclude createdAt from profile
                "interestedServiceProviders.profile.updatedAt": 0, // Exclude updatedAt from profile
                "interestedServiceProviders.profile.__v": 0, // Exclude __v
            },
        },
        {
            $group: {
                _id: "$_id",
                ownerId: { $first: "$ownerId" },
                requestId: { $first: "$requestId" },
                interestedServiceProviders: { $push: "$interestedServiceProviders" }, // Group providers back into array
            },
        },
        {
            $project: {
                provider: 0, // Remove extra fields
                profile: 0,
            },
        },
    ];
};


// {
//     $lookup: {
//         from: "requests",
//         localField: "requestId",
//         foreignField: "_id",
//         as: "requestDetails"
//     }
// },
// {
//     $lookup: {
//         from: "pets",
//         localField: "requestDetails.petId",
//         foreignField: "_id",
//         as: "petDetails"
//     }
// },
// {
//     $lookup: {
//         from: "users",
//         localField: "interestedServiceProviders.pID",
//         foreignField: "_id",
//         as: "serviceProviders"
//     }
// },
// {
//     $lookup: {
//         from: "profiles",
//         localField: "interestedServiceProviders.pID",
//         foreignField: "userId",
//         as: "providerProfiles"
//     }
// },


// { $unwind: { path: "$requestDetails", preserveNullAndEmptyArrays: true } },
// {
//     $lookup: {
//         from: "pets",
//         localField: "requestDetails.petId",
//         foreignField: "_id",
//         as: "petDetails"
//     }
// },
// { $unwind: { path: "$petDetails", preserveNullAndEmptyArrays: true } },

// // Lookup Interested Service Providers
// {
//     $lookup: {
//         from: "users",
//         localField: "interestedServiceProviders.pID",
//         foreignField: "_id",
//         as: "serviceProviders"
//     }
// },

// // Lookup Profile Details for Each Service Provider
// {
//     $lookup: {
//         from: "profiles",
//         localField: "interestedServiceProviders.pID",
//         foreignField: "userId",
//         as: "providerProfiles"
//     }
// },

// // Project Final Output
// {
//     $project: {
//         _id: 1,
//         ownerId: 1,
//         requestId: "$requestDetails._id",
//         petDetails: 1,
//         interestedServiceProviders: {
//             $map: {
//                 input: "$interestedServiceProviders",
//                 as: "provider",
//                 in: {
//                     pID: "$$provider.pID",
//                     status: "$$provider.status",
//                     userDetails: {
//                         $arrayElemAt: [
//                             {
//                                 $filter: {
//                                     input: "$serviceProviders",
//                                     as: "sp",
//                                     cond: { $eq: ["$$sp._id", "$$provider.pID"] }
//                                 }
//                             },
//                             0
//                         ]
//                     },
//                     profileDetails: {
//                         $arrayElemAt: [
//                             {
//                                 $filter: {
//                                     input: "$providerProfiles",
//                                     as: "profile",
//                                     cond: { $eq: ["$$profile.userId", "$$provider.pID"] }
//                                 }
//                             },
//                             0
//                         ]
//                     }
//                 }
//             }
//         }
//     }
// }