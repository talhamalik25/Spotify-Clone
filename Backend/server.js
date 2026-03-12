const app = require("./src/app")
require ("dotenv").config()
const connectDB = require("./src/db/db")

connectDB()


app.listen(4000, (req, res) => {
    console.log("Server is running on port 4000")
})