import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Get all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}));

// Register/Create or Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    if (req.query.action === 'register') {
        // Create/Register user
        const user = await User(req.body).save();
        res.status(201).json({
            code: 201,
            msg: 'Successfully created new user.',
            user
        });
    } else {
        // Authenticate user
        const user = await User.findOne(req.body);
        if (!user) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed' });
        } else {
            res.status(200).json({ code: 200, msg: 'Authentication Successful', token: 'TEMPORARY_TOKEN' });
        }
    }
}));

export default router;
