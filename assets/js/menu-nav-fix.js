/**
 * Fix for menu navigation bug where clicking links inside collapsed 
 * dropdown menus requires two clicks (first to open dropdown, second to navigate)
 * 
 * This script ensures that clicks on links inside dropdown menus always navigate
 * immediately, even if the dropdown is currently collapsed.
 * 
 * REFACTOR: Uses event delegation to handle dynamically added elements.
 * REFACTOR 2: Uses capture phase and shows loader.
 */

(function() {
    'use strict';
    
    // Use event delegation on the document body with CAPTURE phase to preempt other handlers
    document.addEventListener('click', function(e) {
        // Find the closest nav-link within a menu-dropdown or nav-item
        const link = e.target.closest('.menu-dropdown .nav-link, .nav-item .nav-link');
        
        if (!link) return;

        // Skip if disabled
        if (link.classList.contains('disabled') || link.getAttribute('disabled')) return;

        // Get the actual href
        const href = link.getAttribute('href');
        
        // If it's a valid navigation link (not a collapse toggle, not empty)
        if (href && href !== '#' && !href.startsWith('#') && !link.hasAttribute('data-bs-toggle')) {
            // Check if it's a real URL (not javascript:)
            if (href.startsWith('javascript:')) return;

            // Show loader for feedback
            const loader = document.getElementById('global-loader');
            if (window.showLoader && typeof window.showLoader === 'function') {
                window.showLoader();
            } else if (loader) {
                // Fallback direct manipulation if function doesn't exist
                loader.style.display = 'flex';
                loader.style.opacity = '1';
                loader.style.visibility = 'visible';
            }

            // Prevent other handlers (like sidebar collapse) from interfering
            e.preventDefault(); 
            e.stopPropagation();

            // Allow the navigation to happen immediately
            window.location.href = href;
        }
    }, true); // TRUE = Capture phase!
})();
