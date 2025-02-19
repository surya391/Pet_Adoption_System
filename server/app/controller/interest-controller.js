import Interest from "../models/interest-model.js";
import { validationResult } from "express-validator";
import _ from 'lodash'
import { aggrigatorForInterestedProviders } from "../utils/interestAggrigator.js";
import { sendAcceptanceEmail } from '../utils/mailTemplate.js'
import mailSender from "../utils/mailSender.js";
import User from '../models/user-model.js'
import Request from '../models/request-model.js'
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
    console.log("AA", ownerId)
    const interestExists = await Interest.findOne({
      requestId: requestId,
      "interestedServiceProviders.pID": userId, // Check if the user has already shown interest
    });

    if (interestExists) {
      return res.status(400).json({ error: [{ msg: "Service provider has already expressed interest." }] })
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
interestCltr.removeInterest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { requestId } = _.pick(req.body, ["requestId"]);
  const { userId } = req.currentUser; // Directly access userId

  if (!requestId) {
    return res.status(400).json({ error: [{ msg: "Request ID is required." }] })
  }

  try {
    // Check if interest exists for the given user and request
    const interestExists = await Interest.findOne({
      requestId,
      "interestedServiceProviders.pID": userId,
    });

    if (!interestExists) {
      return res.status(404).json({ error: [{ msg: "Interest not found for the service provider." }] })
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
    // console.error("Error in removeInterest:", error);
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
  } catch (error) {
    console.error(err);
    return res.status(500).json({ error: [{ msg: "Something went wrong." }] })
  }
};

// userid is linked to the request in the serviceProvider
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
      return res.status(404).json({ error: [{ msg: "No interests found for this service provider." }] })
    }

    return res.status(200).json(interests);
  } catch (error) {
    console.error("Error fetching interests:", error);
    return res.status(500).json({ error: [{ msg: "Internal server error." }] })
  }
};

// Display the getOwnerInterests 
interestCltr.getOwnerInterests = async (req, res) => {
  try {

    const { userId } = req.currentUser; // Get the logged-in owner's ID
    const { requestId } = _.pick(req.query, ["requestId"]); // Get requestId from request parameters
    // console.log(requestId)
    console.log(requestId)
    if (!requestId) {
      return res.status(400).json({ error: [{ msg: "Request ID is required." }] })
    }

    const interests = await Interest.aggregate(aggrigatorForInterestedProviders(userId, requestId));
    console.log(interests)
    if (!interests.length) {
      return res.status(404).json({ error: [{ msg: "No interests found for this owner and request." }] })
    }

    return res.status(200).json(interests);

  } catch (error) {
    console.error("Error fetching owner interests:", error);
    return res.status(500).json({ error: [{ msg: "Internal server error." }] })
  }
};



// interestCltr.updateInterestStatus = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ error: errors.array() });
//   }
//   const { requestId, providerId, status } = req.body; // Get request ID, provider ID, and new status
//   const { userId, name } = req.currentUser; // Logged-in owner's ID

//   try {
//     //   // Update the status of the specific provider
//     const updatedInterest = await Interest.findOneAndUpdate(
//       { ownerId: userId, requestId, "interestedServiceProviders.pID": providerId },
//       { $set: { "interestedServiceProviders.$.status": status } },
//       { new: true, runValidators: true }
//     ).populate({
//       path: "requestId",
//       populate: {
//         path: "petId",
//       },
//     });
//     if (!updatedInterest) {
//       return res.status(404).json({ message: "Service provider interest not found." });
//     }
//     //status == accetpted 
//     if (status === "accepted") {
//       await Request.findByIdAndUpdate(requestId, { $set: { status : "closed" } })
//       const user = await User.findById(providerId)
//       const templete =  sendAcceptanceEmail.replace('{providerName}',user.name).replace('{ownerName}',name).replace('{petName}',updatedInterest?.requestId?.petId?.petName)
//       await mailSender(user.email, "User Accepted your Interest", templete)
//     }
//     res.json(updatedInterest)
//   }
//   catch (error) {
//     console.error("Error in updateInterestStatus:", error);
//     return res.status(500).json({ error: [{ msg: "Something went wrong." }] });
//   }
// };


interestCltr.updateInterestStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { requestId, providerId, status } = req.body; // Get request ID, provider ID, and new status
  const { userId, name } = req.currentUser; // Logged-in owner's ID

  try {
    // Find and update the selected provider's status
    const updatedInterest = await Interest.findOneAndUpdate(
      { ownerId: userId, requestId, "interestedServiceProviders.pID": providerId },
      { $set: { "interestedServiceProviders.$.status": status } },
      { new: true, runValidators: true }
    ).populate({
      path: "requestId",
      populate: {
        path: "petId",
      },
    });

    if (!updatedInterest) {
    return res.status(404).json({ error: [{ msg: "Service provider interest not found." }] })
    }

    // If a provider is accepted, reject all other providers and close the request
    if (status === "accepted") {
      await Interest.updateOne(
        { ownerId: userId, requestId },
        { $set: { "interestedServiceProviders.$[other].status": "rejected" } },
        { arrayFilters: [{ "other.pID": { $ne: providerId } }], new: true }
      );

      // Mark the request as closed
      await Request.findByIdAndUpdate(requestId, { $set: { status: "closed" } });

      // Send email to the accepted provider
      const user = await User.findById(providerId);
      const template = sendAcceptanceEmail
        .replace('{providerName}', user.name)
        .replace('{ownerName}', name)
        .replace('{petName}', updatedInterest?.requestId?.petId?.petName);

      await mailSender(user.email, "User Accepted your Interest", template);
    }

    res.json(updatedInterest);
  } catch (error) {
    console.error("Error in updateInterestStatus:", error);
    return res.status(500).json({ error: [{ msg: "Something went wrong." }] });
  }
};


export default interestCltr;




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