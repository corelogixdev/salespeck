!function(){"use strict";var t,a,e;sessionStorage.getItem("defaultAttribute")&&(t=document.documentElement.attributes,a={},Object.entries(t).forEach(function(t){var e;t[1]&&t[1].nodeName&&"undefined"!=t[1].nodeName&&(e=t[1].nodeName,a[e]=t[1].nodeValue)}),sessionStorage.getItem("defaultAttribute")!==JSON.stringify(a)?(sessionStorage.clear(),window.location.reload()):((e={})["data-layout"]=sessionStorage.getItem("data-layout"),e["data-sidebar-size"]=sessionStorage.getItem("data-sidebar-size"),e["data-bs-theme"]=sessionStorage.getItem("data-bs-theme"),e["data-layout-width"]=sessionStorage.getItem("data-layout-width"),e["data-sidebar"]=sessionStorage.getItem("data-sidebar"),e["data-sidebar-image"]=sessionStorage.getItem("data-sidebar-image"),e["data-layout-direction"]=sessionStorage.getItem("data-layout-direction"),e["data-layout-position"]=sessionStorage.getItem("data-layout-position"),e["data-layout-style"]=sessionStorage.getItem("data-layout-style"),e["data-topbar"]=sessionStorage.getItem("data-topbar"),e["data-preloader"]=sessionStorage.getItem("data-preloader"),e["data-body-image"]=sessionStorage.getItem("data-body-image"),Object.keys(e).forEach(function(t){e[t]&&document.documentElement.setAttribute(t,e[t])})))}();

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
    const handleNavigation = function (e) {
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

        // Let the 'New Sale' menu link execute its own event listener (so it can open a new tab)
        if (link.id === 'new-sale-menu-link') {
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

            // Stop other scripts from interfering and navigate immediately
            // This bypasses the double-click bug in Velzon theme
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            // Use a tiny timeout to ensure the current event loop finishes
            // and any conflicting scripts are fully bypassed.
            setTimeout(function() {
                window.location.href = href;
            }, 10);
        }
    };

    // Use capture phase to intercept the click before any other menu scripts
    document.addEventListener('click', handleNavigation, true);

    // Fix Velzon horizontal menu bug where it incorrectly hides menu items on wide pages
    // (e.g. Inventory Report with wide tables)
    document.addEventListener('DOMContentLoaded', () => {
        const navbarNav = document.getElementById('navbar-nav');
        
        if (navbarNav) {
            // Backup the original menu HTML
            const originalNavHtml = navbarNav.innerHTML;
            
            // Create a mutation observer to detect when Velzon tries to move items to "More"
            const observer = new MutationObserver((mutations) => {
                if (window.innerWidth >= 992) {
                    // On desktop, we want all items visible. 
                    // If Velzon removed items (we expect at least 5-6 menu items)
                    if (navbarNav.children.length < 4) { 
                        // Restore original HTML
                        observer.disconnect(); 
                        navbarNav.innerHTML = originalNavHtml;
                        
                        // Resume observing after a tiny delay
                        setTimeout(() => observer.observe(navbarNav, { childList: true }), 100);
                    }
                }
            });
            
            // Start observing child node changes
            observer.observe(navbarNav, { childList: true });
            
            // Also enforce display block on resize as a fallback
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 992 && navbarNav.children.length < 4) {
                    observer.disconnect();
                    navbarNav.innerHTML = originalNavHtml;
                    setTimeout(() => observer.observe(navbarNav, { childList: true }), 100);
                }
            });
        }
    });
})();