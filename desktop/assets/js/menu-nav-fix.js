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
        // Target any anchor link with an href inside the navbar
        const link = e.target.closest('#navbar-nav a[href], .navbar-header a[href], .user-profile-menu a[href]');

        const hamburger = e.target.closest('#topnav-hamburger-icon');
        if (hamburger) {
            if (window.innerWidth < 1200) {
                document.body.classList.toggle('menu');
                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }

        const overlay = e.target.closest('.vertical-overlay');
        if (overlay) {
            if (window.innerWidth < 1200) {
                document.body.classList.remove('menu');
                document.body.classList.remove('vertical-sidebar-enable');
                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }

        if (!link) return;

        // Custom dropdown toggler for mobile since app.js breaks horizontal dropdowns on mobile
        if (link && link.classList.contains('dropdown-toggle') && link.closest('#navbar-nav')) {
            if (window.innerWidth < 1200) {
                e.preventDefault();
                e.stopPropagation(); // Stop app.js or Popper from breaking it
                
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

        // Skip if it's a dropdown toggle (desktop), or a form element (inputs, buttons, etc.)
        if (link && (link.hasAttribute('data-bs-toggle') || 
            link.classList.contains('dropdown-toggle') ||
            e.target.closest('input, textarea, select, button'))) {
            return;
        }

        const href = link ? link.getAttribute('href') : null;

        // Only handle real navigation URLs (skip hashes and javascript:)
        if (href && href !== '#' && !href.startsWith('#') && !href.startsWith('javascript:')) {

            // Skip if the link is disabled
            if (link.classList.contains('disabled') || link.hasAttribute('disabled')) {
                return;
            }

            // Optional: Show the global loader if it exists
            const loader = document.getElementById('global-loader');
            if (loader) {
                loader.style.display = 'flex';
                loader.style.opacity = '1';
                loader.style.visibility = 'visible';
            }

            // Stop other scripts from interfering and navigate immediately
            e.preventDefault();
            e.stopPropagation();

            // Use window.location.href for immediate redirection
            window.location.href = href;
        }
    }, true); // TRUE: Capture phase is critical here
})();
