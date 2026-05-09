/**
 * Fix for menu navigation bug where clicking links in the navbar sometimes
 * requires two clicks or behaves inconsistently due to conflicting event listeners.
 * 
 * This script ensures that clicks on valid navigation links (links with real URLs)
 * always navigate immediately on the first click.
 */

(function () {
    'use strict';

    // Use capture phase to intercept the click before any other menu scripts
    document.addEventListener('click', function (e) {
        // Target any anchor link with an href inside the navbar or common navigation areas
        const link = e.target.closest('#navbar-nav a[href], .navbar-header a[href], .user-profile-menu a[href], .topnav-hamburger, .vertical-overlay');

        if (!link) return;

        // Hamburger menu toggle
        if (link.id === 'topnav-hamburger-icon' || link.classList.contains('topnav-hamburger')) {
            if (window.innerWidth < 1200) {
                document.body.classList.toggle('menu');
                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }

        // Overlay click (to close mobile menu)
        if (link.classList.contains('vertical-overlay')) {
            if (window.innerWidth < 1200) {
                document.body.classList.remove('menu');
                document.body.classList.remove('vertical-sidebar-enable');
                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }

        // Custom dropdown toggler for mobile
        if (link.classList.contains('dropdown-toggle') && link.closest('#navbar-nav')) {
            if (window.innerWidth < 1200) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdownMenu = link.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    const isShown = dropdownMenu.classList.contains('show');
                    
                    // Close others
                    document.querySelectorAll('#navbar-nav .dropdown-menu.show').forEach(menu => {
                        if (menu !== dropdownMenu) {
                            menu.classList.remove('show');
                            if(menu.previousElementSibling) menu.previousElementSibling.classList.remove('show');
                        }
                    });

                    if (isShown) {
                        dropdownMenu.classList.remove('show');
                        link.classList.remove('show');
                    } else {
                        dropdownMenu.classList.add('show');
                        link.classList.add('show');
                    }
                }
                return;
            }
        }

        // Skip if it's a dropdown toggle (desktop) or interactive element
        if (link.hasAttribute('data-bs-toggle') || 
            link.classList.contains('dropdown-toggle') ||
            e.target.closest('input, textarea, select, button')) {
            return;
        }

        const href = link.getAttribute('href');

        // Only handle real navigation URLs
        if (href && href !== '#' && !href.startsWith('#') && !href.startsWith('javascript:')) {
            if (link.classList.contains('disabled') || link.hasAttribute('disabled')) {
                return;
            }

            // Show the global loader using the 'active' class from pos-theme.css
            const loader = document.getElementById('global-loader');
            if (loader) {
                loader.classList.add('active');
            }

            // Stop other scripts from interfering
            e.preventDefault();
            e.stopPropagation();

            // Navigate immediately
            window.location.href = href;
        }
    }, true); // TRUE: Capture phase is critical here
})();
