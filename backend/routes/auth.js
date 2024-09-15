import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, surname, username, email, password, dateOfBirth } = req.body;

    if (!name || !surname || !username || !email || !password || !dateOfBirth) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (existingUser) {
            return res.status(409).json({ error: 'Email or username already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ name, surname, username, email, passwordHash, dateOfBirth });
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving the user.' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try{
    const user = await User.findOne({ email});

    if(!user) return res.status(404).json({ error: 'Invalid credentials' });

    if(!await bcrypt.compare(password, user.passwordHash)) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token, user: { id: user._id, name: user.name, surname: user.surname, username: user.username, email: user.email, dateOfBirth: user.dateOfBirth }});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during login. Please try again later.' });
    }
});


export default router;
