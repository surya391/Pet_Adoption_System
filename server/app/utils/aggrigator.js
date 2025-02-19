const aggrigatorForCustomer = ({ location, petType }) => {
    const pipeLine = [];
    // Lookup user profile details
    pipeLine.push({
        $lookup: {
            from: "profiles",
            localField: "profileId",
            foreignField: "_id",
            as: "profile"
        }
    });

    // Unwind profile array
    pipeLine.push({
        $unwind: "$profile"
    });



    // Project required fields
    pipeLine.push({
        $project: {
            "profile._id": 0,
            "profile.userId": 0,
            "profile.createdAt": 0,
            "profile.updatedAt": 0,
            "profile.isSubscriber": 0,
            "profile.__v": 0,
            "profile.gender": 0,
            "profile.dateOfBirth": 0,
            "profile.profilePic": 0
        }
    });
    pipeLine.push({
        $lookup: {
            from: "pets",
            localField: "petId",
            foreignField: "_id",
            as: "pet"
        }
    });

    // Unwind pet array
    pipeLine.push({
        $unwind: "$pet"
    });

    pipeLine.push({
        $match: {status:"available"}
    });
    
    // Filter by request type if provided
    if (petType) {
        pipeLine.push({
            $match: {
                "pet.petType": { $regex: new RegExp(petType, "i") } // Case-insensitive search
            }
        });
    }

    // Filter by city if provided
    if (location) {
        const locationRegex = new RegExp(location, "i");
        pipeLine.push({
            $match: {
                "profile.address.city": { $regex: locationRegex }
            }
        });
    }

    return pipeLine;
};


export default aggrigatorForCustomer