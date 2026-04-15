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

        if (!link) return;

        // Skip if it's a dropdown toggle (Bootstrap needs to handle these)
        if (link.hasAttribute('data-bs-toggle') || link.classList.contains('dropdown-toggle')) {
            return;
        }

        const href = link.getAttribute('href');

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
