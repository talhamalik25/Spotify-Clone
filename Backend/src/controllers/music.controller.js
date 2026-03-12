const { JsonWebTokenError } = require("jsonwebtoken");
const musicModel = require("../model/music.model");

async function addMusic(req, res) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
     if (decoded.role !== "artist") {
            return res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

}