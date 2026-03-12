const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {

    const { username, email, password, role = "user" } = req.body;

    const existingUser = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (existingUser) {
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
}

module.exports = {
    registerUser
};