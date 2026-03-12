const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
    try {
        console.log("Registration request received:", req.body);
        const { username, email, password, role = "user" } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (existingUser) {
            console.log("User already exists:", username, email);
            return res.status(400).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            username,
            email,
            password: hash,
            role
        });

        await newUser.save();
        console.log("User saved successfully:", newUser._id);

        const token = jwt.sign(
            {
                id: newUser._id,
                role: newUser.role
            },
            process.env.JWT_SECRET
        );

        res.cookie("token", token);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

async function loginUser(req, res) {
    try {
        console.log("Login request received:", req.body.username || req.body.email);
        const { username, password, email } = req.body;

        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET
        );
        res.cookie("token", token);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

module.exports = {
    registerUser,
    loginUser
};