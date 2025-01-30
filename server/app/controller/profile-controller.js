import Profile from "../models/profile-model.js";
import { validationResult } from "express-validator";
import _ from "lodash";
import uploadMedia from "../utils/uploadMedia.js";


const profileCltr = {};

// Create a new profile
profileCltr.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;
  try {
    const file = req.file
    // if (!file) {
    //   return res.status(400).json({ errors: [{ msg: " profilePic is required " }] })
    // }
    const fileResult = await uploadMedia(file)
    const profile = new Profile({ ...body, userId: req.currentUser.userId });
    profile.profilePic = fileResult?.secure_url
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Get profile by ID
profileCltr.show = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found." });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Update a profile
profileCltr.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const updates = req.body;

  try {
    const profile = await Profile.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({ error: "Profile not found." });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Delete a profile
profileCltr.destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found." });
    }
    res.json({ message: "Profile deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Get the profile of the logged-in user
profileCltr.me = async (req, res) => {
    try {
        const userId = req.currentUser.userId; // Extract userId from the authenticated user
        const profile = await Profile.findOne({ userId }); // Query by userId
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found.' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};


export default profileCltr;
