import Pet from "../models/pet-model.js";
import { validationResult } from "express-validator";

const petCltr = {};

// Create a new pet
petCltr.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;
  try {
    const pet = new Pet({ ...body, userId: req.currentUser.userId });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Get pets by user ID
petCltr.listByUser = async (req, res) => {
  const { userId } = req.currentUser;
  try {
    const pets = await Pet.find({ userId });
    if (!pets.length) {
      return res.status(404).json({ error: "No pets found for this user." });
    }
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Get pet by ID
petCltr.show = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found." });
    }
    res.json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Update a pet's details
petCltr.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const updates = req.body;

  try {
    const pet = await Pet.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!pet) {
      return res.status(404).json({ error: "Pet not found." });
    }
    res.json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Delete a pet's details
petCltr.destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found." });
    }
    res.json({ message: "Pet deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};


export default petCltr;
