/**
 * Responsive Sidebar Menu JavaScript
 * Handles toggle functionality, window resize detection, and state persistence
 */

(function () {
    'use strict';

    // Configuration
    const BREAKPOINT_TABLET = 1200;
    const BREAKPOINT_MOBILE = 768;
    const STORAGE_KEY = 'sidebar-state';

    // DOM Elements
    let hamburgerBtn;
    let sidebarMenu;
    let currentWindowWidth = window.innerWidth;

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });

    /**
     * Initialize sidebar functionality
     */
    function init() {
        hamburgerBtn = document.getElementById('topnav-hamburger-icon');
        sidebarMenu = document.getElementById('scrollbar');

        if (!hamburgerBtn || !sidebarMenu) {
            console.warn('Sidebar elements not found');
            return;
        }

        // Set up event listeners
        hamburgerBtn.addEventListener('click', toggleSidebar);
        window.addEventListener('resize', handleResize);

        // Close sidebar when clicking on backdrop (mobile)
        if (window.innerWidth <= BREAKPOINT_MOBILE) {
            sidebarMenu.addEventListener('click', function (e) {
                if (e.target === sidebarMenu) {
                    closeSidebar();
                }
            });
        }

        // Close sidebar when clicking a link (mobile only)
        const navLinks = sidebarMenu.querySelectorAll('.nav-link:not([data-bs-toggle])');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= BREAKPOINT_MOBILE) {
                    closeSidebar();
                }
            });
        });

        // Initialize sidebar state based on window width
        initializeSidebarState();

        // Handle dropdown toggles in collapsed mode
        handleCollapsedDropdowns();
    }

    /**
     * Toggle sidebar open/closed
     */
    function toggleSidebar() {
        const isResponsive = window.innerWidth <= BREAKPOINT_TABLET;

        if (!isResponsive) return; // Don't toggle on desktop

        if (window.innerWidth <= BREAKPOINT_MOBILE) {
            // Mobile: Toggle show/hide
            sidebarMenu.classList.toggle('show');
            updateHamburgerIcon();
        } else {
            // Tablet: Toggle collapsed/expanded
            sidebarMenu.classList.toggle('collapsed');
            saveState();
            updateHamburgerIcon();
        }
    }

    /**
     * Close sidebar (mobile)
     */
    function closeSidebar() {
        if (window.innerWidth <= BREAKPOINT_MOBILE) {
            sidebarMenu.classList.remove('show');
            updateHamburgerIcon();
        }
    }

    /**
     * Update hamburger icon appearance
     */
    function updateHamburgerIcon() {
        if (!hamburgerBtn) return;

        const icon = hamburgerBtn.querySelector('i');
        if (!icon) return;

        const isOpen = sidebarMenu.classList.contains('show') ||
            !sidebarMenu.classList.contains('collapsed');

        if (window.innerWidth <= BREAKPOINT_MOBILE) {
            // Mobile: Menu vs Close icon
            icon.className = isOpen ? 'ri-close-line' : 'ri-menu-2-line';
        } else {
            // Tablet: Menu vs Indent icon
            icon.className = sidebarMenu.classList.contains('collapsed') ?
                'ri-menu-unfold-line' : 'ri-menu-fold-line';
        }
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        const newWidth = window.innerWidth;

        // Only react to significant changes (crossing breakpoints)
        if ((currentWindowWidth > BREAKPOINT_TABLET && newWidth <= BREAKPOINT_TABLET) ||
            (currentWindowWidth <= BREAKPOINT_TABLET && newWidth > BREAKPOINT_TABLET)) {

            initializeSidebarState();
        }

        currentWindowWidth = newWidth;
    }

    /**
     * Initialize sidebar state based on window width and saved preference
     */
    function initializeSidebarState() {
        const width = window.innerWidth;

        console.log('Initializing sidebar state for width:', width);

        if (width > BREAKPOINT_TABLET) {
            // Desktop: Remove all sidebar classes
            sidebarMenu.classList.remove('show', 'collapsed');
            console.log('Desktop mode - sidebar hidden');
            updateHamburgerIcon();
        } else if (width > BREAKPOINT_MOBILE) {
            // Tablet: Icon-only mode by default or use saved state
            const savedState = getSavedState();

            sidebarMenu.classList.remove('show');

            // Always add collapsed class initially to make it visible
            if (savedState === 'expanded') {
                sidebarMenu.classList.remove('collapsed');
                console.log('Tablet mode - sidebar expanded');
            } else {
                sidebarMenu.classList.add('collapsed');
                console.log('Tablet mode - sidebar collapsed (icon-only)');
            }

            updateHamburgerIcon();
        } else {
            // Mobile: Hidden by default
            sidebarMenu.classList.remove('show', 'collapsed');
            console.log('Mobile mode - sidebar hidden');
            updateHamburgerIcon();
        }
    }

    /**
     * Handle dropdown menus in collapsed mode
     */
    function handleCollapsedDropdowns() {
        const dropdownToggles = document.querySelectorAll('.nav-link[data-bs-toggle="collapse"]');

        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('mouseenter', function () {
                if (sidebarMenu.classList.contains('collapsed') &&
                    window.innerWidth > BREAKPOINT_MOBILE &&
                    window.innerWidth <= BREAKPOINT_TABLET) {

                    const targetId = this.getAttribute('href');
                    const dropdown = document.querySelector(targetId);

                    if (dropdown) {
                        // Position dropdown next to icon
                        const rect = this.getBoundingClientRect();
                        dropdown.style.position = 'fixed';
                        dropdown.style.left = rect.right + 'px';
                        dropdown.style.top = rect.top + 'px';
                    }
                }
            });
        });
    }

    /**
     * Save sidebar state to localStorage
     */
    function saveState() {
        const state = sidebarMenu.classList.contains('collapsed') ? 'collapsed' : 'expanded';
        try {
            localStorage.setItem(STORAGE_KEY, state);
        } catch (e) {
            console.warn('Could not save sidebar state:', e);
        }
    }

    /**
     * Get saved sidebar state from localStorage
     */
    function getSavedState() {
        try {
            return localStorage.getItem(STORAGE_KEY) || 'collapsed'; // Default to collapsed
        } catch (e) {
            console.warn('Could not retrieve sidebar state:', e);
            return 'collapsed';
        }
    }

    /**
     * Handle ESC key to close sidebar on mobile
     */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && window.innerWidth <= BREAKPOINT_MOBILE) {
            closeSidebar();
        }
    });

})();
