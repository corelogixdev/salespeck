document.addEventListener('DOMContentLoaded', function () {
    // Initialize profile modal
    const profileModal = {
        init: function () {
            this.bindEvents();
            this.loadProfileData();
        },

        bindEvents: function () {
            // Edit profile button logic (if we add one in dropdown)
            const profileLinks = document.querySelectorAll('a[href="#profile-modal"]');
            profileLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modal = new bootstrap.Modal(document.getElementById('profileModal'));
                    modal.show();
                    this.loadProfileData();
                });
            });

            // Image upload handling
            const uploadInput = document.getElementById('profile-image-upload');
            if (uploadInput) {
                uploadInput.addEventListener('change', this.handleImageUpload.bind(this));
            }

            // Profile form submission
            const profileForm = document.getElementById('profile-form');
            if (profileForm) {
                profileForm.addEventListener('submit', this.handleProfileUpdate.bind(this));
            }

            // Password form submission
            const passwordForm = document.getElementById('password-form');
            if (passwordForm) {
                passwordForm.addEventListener('submit', this.handlePasswordChange.bind(this));
            }

            // Password toggle visibility
            document.querySelectorAll('.password-toggle-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const input = this.previousElementSibling;
                    const icon = this.querySelector('i');
                    if (input.type === 'password') {
                        input.type = 'text';
                        icon.classList.remove('ri-eye-off-line');
                        icon.classList.add('ri-eye-line');
                    } else {
                        input.type = 'password';
                        icon.classList.remove('ri-eye-line');
                        icon.classList.add('ri-eye-off-line');
                    }
                });
            });
        },

        loadProfileData: function () {
            // We can fetch fresh data or stick with what's loaded in the page
            // For now, let's fetch to ensure we have latest
            fetch('/api/profile')
                .then(response => response.json())
                .then(data => {
                    if (data.user) {
                        this.populateForm(data.user);
                    }
                })
                .catch(error => console.error('Error loading profile:', error));
        },

        populateForm: function (user) {
            // Basic info
            document.getElementById('profile-firstname').value = user.firstname || '';
            document.getElementById('profile-lastname').value = user.lastname || '';
            document.getElementById('profile-username').value = user.username || '';
            document.getElementById('profile-email').value = user.email || '';
            document.getElementById('profile-phone').value = user.phone || '';
            document.getElementById('profile-address').value = user.address || '';

            // Update avatar in modal
            const avatarContainer = document.querySelector('.profile-image-container');
            if (user.profile_image_url) {
                avatarContainer.innerHTML = `
                    <img src="${user.profile_image_url}" alt="Profile">
                    <label for="profile-image-upload" class="profile-upload-btn">
                        <i class="ri-camera-fill"></i>
                    </label>
                    <input type="file" id="profile-image-upload" accept="image/*" style="display: none;">
                `;
                // Rebind upload event
                document.getElementById('profile-image-upload').addEventListener('change', this.handleImageUpload.bind(this));
            } else {
                const initials = (user.firstname?.[0] || '') + (user.lastname?.[0] || '');
                avatarContainer.innerHTML = `
                    <div class="initials-avatar">${initials.toUpperCase()}</div>
                    <label for="profile-image-upload" class="profile-upload-btn">
                        <i class="ri-camera-fill"></i>
                    </label>
                    <input type="file" id="profile-image-upload" accept="image/*" style="display: none;">
                `;
                document.getElementById('profile-image-upload').addEventListener('change', this.handleImageUpload.bind(this));
            }
        },

        handleImageUpload: function (e) {
            const file = e.target.files[0];
            if (!file) return;

            if (file.size > 5 * 1024 * 1024) {
                toastr.error('Image size must be less than 5MB');
                return;
            }

            const formData = new FormData();
            formData.append('profileImage', file);

            fetch('/api/profile/upload-image', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        toastr.success('Profile image updated successfully');
                        // Reload page to update all avatar instances or update DOM manually
                        // For thoroughness, let's reload
                        setTimeout(() => window.location.reload(), 1000);
                    } else {
                        toastr.error(data.error || 'Failed to upload image');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    toastr.error('An error occurred during upload');
                });
        },

        handleProfileUpdate: function (e) {
            e.preventDefault();
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Saving...';

            const formData = {
                firstname: document.getElementById('profile-firstname').value,
                lastname: document.getElementById('profile-lastname').value,
                email: document.getElementById('profile-email').value,
                phone: document.getElementById('profile-phone').value,
                address: document.getElementById('profile-address').value
            };

            fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        toastr.success('Profile updated successfully');

                        // Update UI without reload
                        const firstName = formData.firstname;
                        const lastName = formData.lastname;

                        // Update header name
                        const headerName = document.querySelector('.user-name');
                        if (headerName) headerName.textContent = firstName;

                        // Update dropdown header name
                        const dropdownName = document.querySelector('.menu-user-name');
                        if (dropdownName) dropdownName.textContent = firstName + ' ' + lastName;

                        // Reset button state
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    } else {
                        toastr.error(data.error || 'Failed to update profile');
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    toastr.error('An error occurred while updating profile');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                });
        },

        handlePasswordChange: function (e) {
            e.preventDefault();
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (newPassword !== confirmPassword) {
                toastr.error('New passwords do not match');
                return;
            }

            if (newPassword.length < 6) {
                toastr.error('Password must be at least 6 characters long');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Changing...';

            fetch('/api/profile/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    confirmPassword
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        toastr.success('Password changed successfully');
                        document.getElementById('password-form').reset();
                        // Close password section accordion if possible, or just reset state
                    } else {
                        toastr.error(data.error || 'Failed to change password');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    toastr.error('An error occurred while changing password');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                });
        }
    };

    profileModal.init();
});
