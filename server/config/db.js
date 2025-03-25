// MongoDB Connection

import mongoose from "mongoose";

const dbConnect = async () => {

  return  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected 😩😩😩😩😩😩😩😩😩😩😩"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
};

export default dbConnect;
