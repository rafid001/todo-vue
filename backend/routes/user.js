const express = require("express");
const router = express.Router();
const zod = require("zod");
const { JWT_SECRET } = require('../config');
const jwt = require("jsonwebtoken");
const { User } = require("../db");

const zodSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string()
});

router.post('/signup', async (req, res) => {
    const { success, data } = zodSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "wrong credentials"
        });
    }
    const existingUser = await User.findOne({
        email: data.email
    });
    if (existingUser) {
        return res.status(411).json({
            message: "user already exists"
        });
    }
    const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: data.password
    });
    const userId = newUser._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "user created successfully",
        token: token
    });
});

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success, data } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "wrong inputs"
        });
    }
    const user = await User.findOne({
        email: data.email,
        password: data.password
    });
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
        res.json({
            token: token
        });
        return;
    }
    res.status(411).json({
        message: "error while logging in"
    });
});

module.exports = router;
