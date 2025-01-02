import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';


const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Register/Create or Authenticate User
router.post(
    '/',
    asyncHandler(async (req, res) => {
      if (req.query.action === 'register') {
        // Register a new user
        await User(req.body).save();
        res.status(201).json({
          code: 201,
          msg: 'Successfully created new user.',
        });
      } else {
        // Authenticate the user
        const user = await User.findOne(req.body);
        if (!user) {
          return res.status(401).json({ code: 401, msg: 'Authentication failed' });
        } else {
          return res.status(200).json({ code: 200, msg: 'Authentication Successful', token: 'TEMPORARY_TOKEN' });
        }
      }
    })
);

// Update a user
router.put(
    '/:id',
    asyncHandler(async (req, res) => {
      if (req.body._id) delete req.body._id;
      const result = await User.updateOne({ _id: req.params.id }, req.body);
      if (result.matchedCount) {
        res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
      } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
      }
    })
);

export default router;
