import Interest from "../models/interest-model.js";
import { validationResult } from "express-validator";
import _ from 'lodash'

const interestCltr = {};

// Create a new interest
interestCltr.createInterest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const body = req.body;
  try {

    const { requestId, ownerId } = _.pick(req.body, ["requestId", "ownerId"]);
    const { userId } = _.pick(req.currentUser, ["userId"]);
    console.log("AA",ownerId)
    const interestExists = await Interest.findOne({
      requestId: requestId,
      "interestedServiceProviders.pID": userId, // Check if the user has already shown interest
    });
    
    if (interestExists) {
      return res.status(400).json({ message: "Service provider has already expressed interest." });
    }
    
    // If not exists, add the service provider and ensure ownerId is set only on creation
    const updatedInterest = await Interest.findOneAndUpdate(
      { requestId: requestId }, // Find the request
      {
        $push: {
          interestedServiceProviders: { pID: userId, status: "pending" }, // Add the service provider
        },
        $setOnInsert: { ownerId: ownerId }, // Set ownerId only if the document is newly created
      },
      { new: true, upsert: true } // Upsert ensures a document is created if not found
    );
    
    return res.status(200).json(updatedInterest);
    

    // const { requestId, ownerId } = _.pick(req.body, [ "requestId" , "ownerId"]);
    // const { userId } = _.pick(req.currentUser, ["userId"]);

    // const interestExists = await Interest.findOne({
    //   requestId: requestId,
    //   "interestedServiceProviders.pID": userId, // Check for userId in the array
    // });

    // if (interestExists) {
    //   return res.status(400).json({ message: "Service provider has already expressed interest." });
    // }

    // // If not exists, add the service provider
    // const updatedInterest = await Interest.findOneAndUpdate(
    //   { requestId: requestId }, // Find the request
    //   {
    //     $push: {
    //       interestedServiceProviders: { pID: userId, status: "pending" }, // Add the service provider
    //     },
    //   },
    //   { new: true, upsert: true } // Upsert to create a document if it doesn't exist
    // );

    // return res.status(200).json(updatedInterest);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: [{ msg: "Something went wrong." }] })
  }
};

// Remove the added interset
// interestCltr.removeInterest = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ error: errors.array() });
//   }

//   const { requestId } = _.pick(req.body, ["requestId"]);
//   const { userId } = _.pick(req.currentUser, ["userId"]);

//   try {
//     // Check if the interest exists for the given user and request
//     const interestExists = await Interest.findOne({
//       requestId: requestId,
//       "interestedServiceProviders.pID": userId, // Check if the user has shown interest
//     });

//     if (!interestExists) {
//       return res.status(404).json({ message: "Interest not found for the service provider." });
//     }

//     // Remove the service provider from the interestedServiceProviders array
//     const updatedInterest = await Interest.findOneAndUpdate(
//       { requestId: requestId },
//       {
//         $pull: {
//           interestedServiceProviders: { pID: userId }, // Remove the object with matching pID
//         },
//       },
//       { new: true } // Return the updated document
//     );
// console.log('bbb', updatedInterest)
//     // return res.status(200).json({
//     //   message: "Interest removed successfully.",
//     //   data: updatedInterest,
//     // });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: [{ msg: "Something went wrong." }] });
//   }
// };

interestCltr.removeInterest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { requestId } = _.pick(req.body, ["requestId"]);
  const { userId } = req.currentUser; // Directly access userId

  if (!requestId) {
    return res.status(400).json({ message: "Request ID is required." });
  }

  try {
    // Check if interest exists for the given user and request
    const interestExists = await Interest.findOne({
      requestId,
      "interestedServiceProviders.pID": userId,
    });

    if (!interestExists) {
      return res.status(404).json({ message: "Interest not found for the service provider." });
    }

    // Remove the service provider from the interestedServiceProviders array
    const updatedInterest = await Interest.findOneAndUpdate(
      { requestId },
      {
        $pull: { interestedServiceProviders: { pID: userId } }, // Remove the matching pID
      },
      { new: true }
    );

    return res.status(200).json(updatedInterest);

  } catch (error) {
    console.error("Error in removeInterest:", error);
    return res.status(500).json({ error: [{ msg: "Something went wrong." }] });
  }
};



// list all the interest
interestCltr.allInterest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { requestId } = _.pick(req.query, ["requestId"]);

  try {
    // Check if the interest exists for the given user and request
    const allInterest = await Interest.findOne({
      requestId: requestId
    });

    return res.status(200).json(
      allInterest
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: [{ msg: "Something went wrong." }] });
  }
};


// Get interest by ID
interestCltr.show = async (req, res) => {
  const { requestId } = req.query;
  try {
    const interests = await Interest.find({ requestId })
    if (!interests) {
      return res.status(404).json({ error: [{ msg: "Interest not found." }] })
    }
    res.json(interests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};



interestCltr.getServiceProviderInterests = async (req, res) => {
  try {
    const { userId } = req.currentUser; // Get the logged-in service provider's ID

    // Find all requests where this service provider has shown interest
    const interests = await Interest.find({
      interestedServiceProviders: { $elemMatch: { pID: userId } } // Match interests where user is present
    }).populate({
      path: "requestId",
      populate: { path: "petId" } // Populate pet details inside requestId
    }).populate("interestedServiceProviders.pID", "name email");

    if (!interests.length) {
      return res.status(404).json({ message: "No interests found for this service provider." });
    }

    return res.status(200).json(interests);
  } catch (error) {
    console.error("Error fetching interests:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};



// // Update an interest
// interestCltr.update = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { id } = req.params;
//   const updates = req.body;

//   try {
//     const interest = await Interest.findOneAndUpdate(
//       id, 
//       { $set: updates },
//       { new: true, runValidators: true }
//     );
//     console.log(interest); 
//     if (!interest) {
//       return res.status(404).json({ error: "Interest not found." });
//     }
//     res.json(interest);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong." });
//   }
// };


// // Delete an interest
// interestCltr.destroy = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const interest = await Interest.findByIdAndDelete(id);
//     if (!interest) {
//       return res.status(404).json({ error: "Interest not found." });
//     }
//     res.json({ message: "Interest deleted successfully." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong." });
//   }
// };

// Get all interests of a provider or based on filters
// interestCltr.index = async (req, res) => {
//   const { providerId, requestId, status } = req.query;

//   const filter = {};
//   if (providerId) filter.providerId = providerId;
//   if (requestId) filter.requestId = requestId;
//   if (status) filter.status = status;

//   try {
//     const interests = await Interest.find(filter)
//       .populate("providerId", "name email") // Adjust fields as necessary
//       .populate("requestId"); // Adjust fields as necessary
//     res.json(interests);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong." });
//   }
// };

export default interestCltr;
