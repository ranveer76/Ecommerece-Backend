require('dotenv').config()
const mongoose=require("mongoose")

exports.connectToDB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://ranveerwalia76:4OU04HGICOBbCRZH@data.gwaugaq.mongodb.net/")
        console.log('connected to DB');
    } catch (error) {
        console.log(process.env.MONGO_URI);
    }
}