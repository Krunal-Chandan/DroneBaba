import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://dronebaba:${process.env.DB_PASSWORD}@cluster0.ng5pxs9.mongodb.net/droneBABA?retryWrites=true&w=majority&appName=Cluster0`
      )
      .then(() => {
        console.log("Connected to the DB successfully");
      });
  } catch (error) {
    console.log("Failed to connect to DB " + error);
  }
};
