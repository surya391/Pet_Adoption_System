import Interest from "../models/interest-model.js";
import { validationResult } from "express-validator";

const interestCltr = {};

// Create a new interest
interestCltr.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;
  try {
    const interest = new Interest({ ...body, providerId: req.currentUser.userId });
    await interest.save();
    res.status(201).json(interest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Get interest by ID
interestCltr.show = async (req, res) => {
  const { requestId } = req.query;
  try {
    const interests = await Interest.find({ requestId }) 
    if (!interests) {
      return res.status(404).json({ error: "Interest not found." });
    }
    res.json(interests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
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
