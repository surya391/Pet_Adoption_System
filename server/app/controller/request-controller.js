import Request from "../models/request-model.js";
import { validationResult } from "express-validator";

const requestController = {};

// Create a new request
requestController.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;
  try {
    const newRequest = new Request({ ...body, userId: req.currentUser.userId });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong while creating the request." });
  }
};

// Get a request by ID
requestController.show = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id)
    if (!request) {
      return res.status(404).json({ error: "Request not found." });
    }
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong while fetching the request." });
  }
};

// Get all requests
requestController.list = async (req, res) => {
  try {
    const requests = await Request.find()
    if (!requests.length) {
      return res.status(404).json({ error: "No requests found." });
    }
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong while fetching requests." });
  }
};

// Update a request
requestController.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const updates = req.body;

  try {
    const request = await Request.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!request) {
      return res.status(404).json({ error: "Request not found." });
    }
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong while updating the request." });
  }
};

// Delete a request
requestController.destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findByIdAndDelete(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found." });
    }
    res.json({ message: "Request deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong while deleting the request." });
  }
};

export default requestController;
