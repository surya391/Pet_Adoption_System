import PetType from "../models/pet-type-model.js";
import { validationResult } from "express-validator";

const petTypeController = {};

// Create a new pet type
petTypeController.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const body = req.body;
  try {
    const newPetType = new PetType({ ...body, userId: req.currentUser.userId });
    await newPetType.save();
    res.status(201).json(newPetType);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while creating the pet type." }] })
  }
};

// Get pet type by ID
petTypeController.show = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  try {
    const petType = await PetType.findById(id)
    if (!petType) {
      return res.status(404).json({ error: [{ msg: "Pet type not found." }] })
    }
    res.json(petType);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while fetching the pet type." }] })
  }
};

// Get all pet types
petTypeController.list = async (req, res) => {
  try {
    const petTypes = await PetType.find()
    if (!petTypes.length) {
      return res.status(404).json({ error: [{ msg: "No pet types found." }] })
    }
    res.json(petTypes);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while fetching pet types." }] })
  }
};

// Update a pet type
petTypeController.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { id } = req.query;
  const updates = req.body;
// console.log(updates)
  try {
    const petType = await PetType.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!petType) {
      return res.status(404).json({ error: [{ msg: "Pet type not found." }] })
    }
    res.json(petType);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while updating the pet type." }] })
  }
};

// Delete a pet type
petTypeController.destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const petType = await PetType.findByIdAndDelete(id);
    if (!petType) {
      return res.status(404).json({ error: [{ msg: "Pet type not found." }] })
    }
    res.json({ message: "Pet type deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong while deleting the pet type." }] })
  }
};

export default petTypeController;
