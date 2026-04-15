// User Profile Dropdown Toggle
$(document).ready(function() {
    const userProfileDropdown = document.getElementById('userProfileDropdown');
    if (userProfileDropdown) {
        const trigger = userProfileDropdown.querySelector('.user-profile-trigger');
        
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            userProfileDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userProfileDropdown.contains(e.target)) {
                userProfileDropdown.classList.remove('show');
            }
        });
    }
});
