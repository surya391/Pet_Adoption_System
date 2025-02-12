import RequestType from "../models/request-type-model.js";
import { validationResult } from "express-validator";

const requestTypeController = {};

// Create a new request type
requestTypeController.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const body = req.body;
  try {
    const newRequestType = new RequestType({ ...body, userId: req.currentUser.userId });
    await newRequestType.save();
    res.status(201).json(newRequestType);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while creating the request type." }] })
  }
};

// Get request type by ID
requestTypeController.show = async (req, res) => {
  const { id } = req.params;
  try {
    const requestType = await RequestType.findById(id);
    if (!requestType) {
      return res.status(404).json({ error: [{ msg: "Request type not found." }] })
    }
    res.json(requestType);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while fetching the request type." }] })
  }
};

// Get all request types
requestTypeController.list = async (req, res) => {
  try {
    const requestTypes = await RequestType.find();
    if (!requestTypes.length) {
      return res.status(404).json({ error: [{ msg: "No request types found." }] })
    }
    res.json(requestTypes);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while fetching request types." }] })
  }
};

// Update a request type
requestTypeController.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { id } = req.params;
  const updates = req.body;

  try {
    const requestType = await RequestType.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!requestType) {
      return res.status(404).json({ error: [{ msg: "Request type not found." }] })
    }
    res.json(requestType);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while updating the request type." }] })
  }
};

// Delete a request type
requestTypeController.destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const requestType = await RequestType.findByIdAndDelete(id);
    if (!requestType) {
      return res.status(404).json({ error: [{ msg: "Request type not found." }] })
    }
    res.json({ message: "Request type deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while deleting the request type." }] })
  }
};

export default requestTypeController;
