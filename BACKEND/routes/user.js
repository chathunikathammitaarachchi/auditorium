import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    try {
        await user.save();
        res.status(201).json({ status: true, message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error registering user" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ username: user.name }, process.env.KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    return res.json({ status: true, message: "Login successfully" });
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User is not registered" });
        }
        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' });

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'auditoriumsystem@gmail.com',
                pass: 'wotfrgxhzcspnsmd'
            }
        });
        const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
        var mailOptions = {
            from: 'auditoriumsystem@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${encodedToken}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: "Error sending email" });
            } else {
                return res.json({ status: true, message: "Email sent" });
            }
        });

    } catch (err) {
        console.log(err);
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
        return res.json({ status: true, message: "Password updated" });
    } catch (err) {
        return res.json({ message: "Invalid token" });
    }
});

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ status: false, message: "No token" });
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        next();
    } catch (err) {
        return res.json(err);
    }
};

router.get("/verify", verifyUser, (req, res) => {
    return res.json({ status: true, message: "Authorized" });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true });
});

export { router as UserRouter };