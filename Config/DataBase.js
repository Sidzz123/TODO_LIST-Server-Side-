const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sidzzatwork22:OUh1su3aW3RKG7Zq@cluster0.hhpube.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;