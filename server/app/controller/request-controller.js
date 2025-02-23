import Request from "../models/request-model.js";
import Profile from "../models/profile-model.js";
import { validationResult } from "express-validator";
import aggrigatorForCustomer from "../utils/aggrigator.js";
import _ from 'lodash'

const requestController = {};

// Create a new request
requestController.create = async (req, res) => {
  const errors = validationResult(req);
  // console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  // console.log(req.body)
  const body = req.body;
  try {
    const userId = req.currentUser.userId
    const profileId = await Profile.findOne({ userId })
    const newRequest = new Request({ ...body, userId, profileId: profileId._id });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while creating the request." }] })
  }
};

// Get a request by ID
requestController.show = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id).populate({ path: "petId", select: "petName petType petAge gender petImage" })
    if (!request) {
      return res.status(404).json({ error: [{ msg: "Request not found." }] })
    }
    res.json(request);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while fetching the request." }] })
  }
};

// Get all requests
requestController.list = async (req, res) => {
  const { userId } = req.currentUser;
  // console.log(userId)
  try {
    const requests = await Request.find({ userId })
    .populate({ path: "petId", select: "petName petType petAge gender petImage" })
    // .populate({path:"requestType", select: 'type'})
    if (!requests) {
      return res.status(404).json({ error: [{ msg: "No requests found." }] })
    }
    // console.log(requests)
    res.json(requests);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while fetching requests." }] })
  }
};

requestController.listPendingRequests = async (req, res) => {
  // const { serviceProviderId } = req.currentUser; 
  try {
    const pendingRequests = await Request.find({
      status: "pending"
    }).populate({
      path: "petId",
      select: "petName petType petAge gender petImage"
    });

    if (!pendingRequests || pendingRequests.length === 0) {
      return res.status(404).json({ error: [{ msg: "No pending requests found." }] })
    }

    res.json(pendingRequests);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while fetching pending requests." }] })
  }
};

// Update a request
requestController.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const userId = req.currentUser.userId;
  const { petId } = req.query;
  const updates = req.body;
  try {
    const request = await Request.findOneAndUpdate(
      { userId, _id: petId },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!request) {
      return res.status(404).json({ error: [{ msg: "Request not found." }] })
    }
    res.json(request);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while updating the request." }] })
  }
};

// Delete a request
requestController.destroy = async (req, res) => {
  const { petId } = req.query;
  try {
    const request = await Request.findByIdAndDelete(petId);
    if (!request) {
      return res.status(404).json({ error: [{ msg: "Request not found." }] })
    }
    res.json(request);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while deleting the request." }] })
  }
};


requestController.search = async (req, res) => {
  try {
    const { petType, location } = _.pick(req.query, ["petType", "location"]);
    const pipeLine = aggrigatorForCustomer({ location, petType });
    const response = await Request.aggregate(pipeLine);
    res.json({
      data: response,
      total: response.length
    });
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while searching." }] })
  }
}

export default requestController;
