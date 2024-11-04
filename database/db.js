const mongoose = require("mongoose");

exports.connectToDB = async () => {
    for (let i = 0; i < 5; i++) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 20000,
                socketTimeoutMS: 45000,
                maxPoolSize: 10,
            });
            console.log("Connected to ",process.env.MONGO_URI);
            return;
        } catch (error) {
            console.log("Error connecting to ",process.env.MONGO_URI,", retrying...", error.message);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    console.log("Failed to connect to DB after multiple attempts");
};
