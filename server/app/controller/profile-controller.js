import Profile from "../models/profile-model.js";
import { body, validationResult } from "express-validator";
import _ from "lodash";
import uploadMedia from "../utils/uploadMedia.js";


import geoCoordinates from "../utils/geoCoordinates.js";


const profileCltr = {};

// Create a new profile
profileCltr.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const body = req.body;
  // console.log('aaa',body)
  try {
    const file = req.file
    if (!file) {
      return res.status(400).json({ error: [{ msg: " profilePic is required " }] })
    }
    let fileResult
    if (file) {
      fileResult = await uploadMedia(file)
    }
    const profile = new Profile({ ...body, userId: req.currentUser.userId });
    profile.profilePic = fileResult?.secure_url || " ";
    const { latitude, longitude } = await geoCoordinates(body.address);
    profile.address.latitude = latitude;
    profile.address.longitude = longitude;
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong." }] })
  }
};



// Update a profile
profileCltr.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const userId = req.currentUser.userId;
  const update = req.body;
  const file = req.file;
  let fileResult;
  if (file) {
    fileResult = await uploadMedia(file)
  }
  update.profilePic = fileResult ? fileResult.secure_url : update.profilePic;
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({ error: [{ msg: "Profile not found." }] })
    }
    res.json(profile);
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Something went wrong." }] })
  }
};


// Get the profile of the logged-in user
profileCltr.show = async (req, res) => {
  try {
    const userId = req.currentUser.userId; // Extract userId from the authenticated user
    const profile = await Profile.findOne({ userId }); // Query by userId
    if (!profile) {
      return res.status(404).json({ error: [{ msg: 'Profile not found.' }] })
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: [{ msg: "Something went wrong." }] })
  }
};



export default profileCltr;


