import mongoose from "mongoose";

const configureDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: '18-pet',
      serverSelectionTimeoutMS: 10000, // Optional: set timeout
    });
    console.log('✅ Connected to MongoDB Atlas:', db.connection.host);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

export default configureDB;

// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// const configureDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('Connected to the database');
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   }
// };

// export default configureDB;
