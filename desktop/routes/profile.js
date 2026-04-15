const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const profileController = require('../controllers/profileController');

// Get current user profile
router.get('/api/profile', profileController.getProfile);

// Upload profile image
router.post('/api/profile/upload-image', upload.single('profileImage'), profileController.uploadProfileImage);

// Update profile
router.put('/api/profile', profileController.updateProfile);

// Change password
router.post('/api/profile/change-password', profileController.changePassword);

// Delete profile image
router.delete('/api/profile/image', profileController.deleteProfileImage);

module.exports = router;
