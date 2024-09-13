import express from 'express';
import User from '../models/user.js';
import Show from '../models/show.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user profile
router.get('/:id', authenticateToken, async (req, res) => {
    console.log('Profile request received for id:', req.params.id);
    const requestedProfileId = req.params.id;
    const authenticatedUserId = req.user.id;

    console.log(requestedProfileId, authenticatedUserId);

    if (authenticatedUserId !== requestedProfileId) {
        return res.status(403).json({ error: 'Access denied. You can only view your own profile.' });
    }

    try {
        const user = await User.findById(requestedProfileId);

        if (!user) return res.status(404).json({ error: 'Profile not found' });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during profile retrieval. Please try again later.' });
    }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
    const requestedProfileId = req.params.id;
    const authenticatedUserId = req.user.id;

    if (authenticatedUserId !== requestedProfileId) {
        return res.status(403).json({ error: 'Access denied. You can only update your own profile.' });
    }

    try {
        const { name, surname, email, dateOfBirth } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            requestedProfileId,
            { name, surname, email, dateOfBirth },
            { new: true, runValidators: true }
        );

        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the profile. Please try again later.' });
    }
});

// Delete user account
router.delete('/:id', authenticateToken, async (req, res) => {
    const requestedProfileId = req.params.id;
    const authenticatedUserId = req.user.id;

    if (authenticatedUserId !== requestedProfileId) {
        return res.status(403).json({ error: 'Access denied. You can only delete your own account.' });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(requestedProfileId);

        if (!deletedUser) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: 'User account successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the account. Please try again later.' });
    }
});

router.put('/:id/likedShows/:showId', authenticateToken, async (req, res) => {
    const requestedProfileId = req.params.id;
    const authenticatedUserId = req.user.id;
    const showId = req.params.showId;

    // Check if the authenticated user is updating their own profile
    if (authenticatedUserId !== requestedProfileId) {
        return res.status(403).json({ error: 'Access denied. You can only update your own profile.' });
    }

    try {

        const show = await Show.findById(showId);
        if (!show) return res.status(404).json({ error: 'Video not found' });

        const user = await User.findById(authenticatedUserId);
        if(user.favoriteShows.includes(showId)) return res.status(408).json({ error: 'Show already liked' })

        const updatedUser = await User.findByIdAndUpdate(
            authenticatedUserId,
            { $addToSet: { favoriteShows: showId } },
            { new: true }
        ).populate('favoriteShows');  

        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        show.likes += 1;

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the profile. Please try again later.' });
    }
});

router.get('/:id/likedShows', authenticateToken, async (req, res) => {
    const requestedProfileId = req.params.id;
    const authenticatedUserId = req.user.id;

    if (authenticatedUserId !== requestedProfileId) {
        return res.status(403).json({ error: 'Access denied. You can only view your own liked shows.' });
    }

    try {
        const user = await User.findById(requestedProfileId).populate('favoriteShows');

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ likedShows: user.favoriteShows });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving liked shows. Please try again later.' });
    }
});

router.delete('/:id/likedShows/:showId', authenticateToken, async (req, res) => {
    const requestedProfileId = req.params.id;
    const authenticatedUserId = req.user.id;
    const showId = req.params.showId;

    // Check if the authenticated user is updating their own profile
    if (authenticatedUserId !== requestedProfileId) {
        return res.status(403).json({ error: 'Access denied. You can only update your own profile.' });
    }

    try {

        const show = await Show.findById(showId);
        if (!show) return res.status(404).json({ error: 'Show not found' });

        const user = await User.findById(authenticatedUserId);
        if(!user.favoriteShows.includes(showId)) return res.status(408).json({ error: 'Show is not liked' })

        const updatedUser = await User.findByIdAndUpdate(
            authenticatedUserId,
            { $pull: { favoriteShows: showId } },
            { new: true }
        ).populate('favoriteShows');  

        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        console.log(show);
        show.likes -= 1;

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the profile. Please try again later.' });
    }
});




export default router;