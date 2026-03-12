const moongse = require("mongoose")

async function connectDB() {
    try {
        await moongse.connect(process.env.MONGO_URl)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }}

module.exports = connectDB