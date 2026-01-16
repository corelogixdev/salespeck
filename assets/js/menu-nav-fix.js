/**
 * Fix for menu navigation bug where clicking links inside collapsed 
 * dropdown menus requires two clicks (first to open dropdown, second to navigate)
 * 
 * This script ensures that clicks on links inside dropdown menus always navigate
 * immediately, even if the dropdown is currently collapsed.
 */

(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Find all links inside dropdown menus that have  actual href values (not just '#')
        const dropdownLinks = document.querySelectorAll('.menu-dropdown .nav-link[href]:not([href="#"]):not([href^="#"])');
        
        dropdownLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                // Get the actual href
                const href = this.getAttribute('href');
                
                // If it's a valid navigation link (not a collapse toggle)
                if (href && href !== '#' && !href.startsWith('#') && !this.hasAttribute('data-bs-toggle')) {
                    // Allow the navigation to happen immediately
                    // Don't stop propagation - let the link work normally
                    window.location.href = href;
                    e.preventDefault(); // Prevent any default Bootstrap handling
                }
            });
        });
    });
})();
