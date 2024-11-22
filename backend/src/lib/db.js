import mongooose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongooose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB:${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
