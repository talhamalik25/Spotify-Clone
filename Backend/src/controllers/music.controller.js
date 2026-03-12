const jwt = require("jsonwebtoken");
const musicModel = require("../model/music.model");
const { uploadFile } = require("../services/storage.service");

async function addMusic(req, res) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { title } = req.body;
    const file = req.file;

    // ✅ Validate title
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    if (!file) {
        return res.status(400).json({ message: "Music file is required" });
    }

    // ✅ Validate buffer exists (memoryStorage check)
    if (!file.buffer) {
        return res.status(500).json({ message: "File buffer not available" });
    }

    try {
        // ✅ Pass buffer directly, not base64 string
        const result = await uploadFile(file.buffer, file.originalname);

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
        });

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        });

    } catch (error) {
        console.error("addMusic error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = { addMusic };