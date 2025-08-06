
const mongoose = require("mongoose");

async function connectMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
    }
}

module.exports = {
    connectMongoDB,
};