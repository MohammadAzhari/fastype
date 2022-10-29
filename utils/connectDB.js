import mongoose from "mongoose";

export default async function connectDB() {
  const { MONGO_URI } = process.env;
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    process.exit(1);
  }
}
