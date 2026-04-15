const db = require('../models');
const path = require('path');
const fs = require('fs');

const encrypt = require('../utils/encrypt');

const profileController = {
    // Get current user profile
    getProfile: async (req, res) => {
        try {
            if (!req.session || !req.session.user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const userId = req.session.user.id;
            const user = await db.user.findByPk(userId, {
                attributes: ['id', 'username', 'firstname', 'lastname', 'email', 'phone', 'phone2', 'address', 'profile_image_url', 'role']
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ user });
        } catch (error) {
            console.error('Get profile error:', error);
            res.status(500).json({ error: 'Failed to fetch profile' });
        }
    },

    // Upload profile image
    uploadProfileImage: async (req, res) => {
        try {
            const userId = req.session.user.id;

            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // Delete old profile image if exists
            const user = await db.user.findByPk(userId);
            if (user.profile_image_url) {
                const oldImagePath = path.join(__dirname, '..', user.profile_image_url);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Update user with new image URL
            const imageUrl = `/uploads/profile-images/${req.file.filename}`;
            await db.user.update(
                { profile_image_url: imageUrl },
                { where: { id: userId } }
            );

            // Update session
            req.session.user.profile_image_url = imageUrl;

            res.json({ success: true, imageUrl });
        } catch (error) {
            console.error('Upload profile image error:', error);
            res.status(500).json({ error: 'Failed to upload image' });
        }
    },

    // Update profile
    updateProfile: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const { firstname, lastname, email, phone, phone2, address } = req.body;

            // Validate required fields
            if (!firstname || !lastname) {
                return res.status(400).json({ error: 'First name and last name are required' });
            }

            // Update user
            await db.user.update(
                {
                    firstname,
                    lastname,
                    email: email || null,
                    phone: phone || null,
                    phone2: phone2 || null,
                    address: address || null,
                    updatedby: userId
                },
                { where: { id: userId } }
            );

            // Update session
            req.session.user.firstname = firstname;
            req.session.user.lastname = lastname;

            res.json({ success: true, message: 'Profile updated successfully' });
        } catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({ error: 'Failed to update profile' });
        }
    },

    // Change password
    changePassword: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const { currentPassword, newPassword, confirmPassword } = req.body;

            // Validate input
            if (!currentPassword || !newPassword || !confirmPassword) {
                return res.status(400).json({ error: 'All password fields are required' });
            }

            if (newPassword !== confirmPassword) {
                return res.status(400).json({ error: 'New passwords do not match' });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({ error: 'New password must be at least 6 characters' });
            }

            // Get user
            const user = await db.user.findByPk(userId);

            // Verify current password
            if (!encrypt.compare(user.password, currentPassword)) {
                return res.status(401).json({ error: 'Current password is incorrect' });
            }

            // Update password
            const hashedNewPassword = encrypt.encrypt(newPassword);
            await db.user.update(
                { password: hashedNewPassword, updatedby: userId },
                { where: { id: userId } }
            );

            res.json({ success: true, message: 'Password changed successfully' });
        } catch (error) {
            console.error('Change password error:', error);
            res.status(500).json({ error: 'Failed to change password' });
        }
    },

    // Delete profile image
    deleteProfileImage: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const user = await db.user.findByPk(userId);

            if (user.profile_image_url) {
                // Delete file from filesystem
                const imagePath = path.join(__dirname, '..', user.profile_image_url);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }

                // Update database
                await db.user.update(
                    { profile_image_url: null },
                    { where: { id: userId } }
                );

                // Update session
                req.session.user.profile_image_url = null;
            }

            res.json({ success: true, message: 'Profile image removed successfully' });
        } catch (error) {
            console.error('Delete profile image error:', error);
            res.status(500).json({ error: 'Failed to delete image' });
        }
    }
};

module.exports = profileController;
