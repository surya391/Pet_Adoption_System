import mongoose from 'mongoose';

const configureDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/18-pet');
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export default configureDB;
