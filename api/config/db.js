import mongoose from "mongoose";

const connectDb = async () => {
  const URI = process.env.MONGODB_URI;
  try {
    const conn = await mongoose.connect(URI);
    console.log(`DB conected successfully: ${conn.connection.host} `);
  } catch (error) {
    console.log("Db connection error", error);
    process.exit(1);
  }
};
export default connectDb;
