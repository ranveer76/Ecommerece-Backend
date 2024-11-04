require("dotenv").config();
const mongoose = require("mongoose");

exports.connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });
    console.log("connected to DB");
  } catch (error) {
    console.log("error connecting to DB", error.message);
  }
};
