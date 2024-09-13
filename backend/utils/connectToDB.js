import mongoose  from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectToDB = async (url) => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(url);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

export default connectToDB;