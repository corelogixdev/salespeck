/**
 * POS layout bootstrap + navigation.
 * Velzon app.js is intentionally NOT used — it repeatedly breaks the top menu.
 *
 * Menu destinations navigate on capture-phase mousedown so the first press
 * always wins (hover menus cannot disappear under the cursor before click).
 */
(function () {
    'use strict';

    var DRAWER_MAX = 991.98;

    function forceHorizontal() {
        try {
            sessionStorage.setItem('data-layout', 'horizontal');
            sessionStorage.setItem('data-layout-style', 'default');
            sessionStorage.setItem('data-layout-width', 'fluid');
            sessionStorage.setItem('data-topbar', 'light');
        } catch (e) { /* ignore */ }
        document.documentElement.setAttribute('data-layout', 'horizontal');
        document.documentElement.setAttribute('data-topbar', 'light');
        document.documentElement.setAttribute('data-preloader', 'disable');
        if (document.body) {
            document.body.classList.remove('vertical-sidebar-enable');
        }
    }

    function applyTheme() {
        try {
            var savedTheme = localStorage.getItem('data-bs-theme');
            if (!savedTheme) {
                savedTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
            }
            document.documentElement.setAttribute('data-layout-mode', savedTheme);
            document.documentElement.setAttribute('data-bs-theme', savedTheme);
        } catch (e) { /* ignore */ }
    }

    try {
        sessionStorage.removeItem('defaultAttribute');
    } catch (e) { /* ignore */ }

    applyTheme();
    forceHorizontal();

    function isDrawer() {
        return window.innerWidth <= DRAWER_MAX;
    }

    function showTopMenu() {
        var menu = document.querySelector('.navbar-menu');
        var nav = document.getElementById('navbar-nav');
        if (!menu) return;

        if (isDrawer()) {
            if (!document.body.classList.contains('menu')) {
                menu.style.removeProperty('display');
            }
        } else {
            document.body.classList.remove('menu');
            menu.style.setProperty('display', 'flex', 'important');
            menu.style.setProperty('visibility', 'visible', 'important');
            menu.style.setProperty('opacity', '1', 'important');
            menu.style.setProperty('position', 'relative', 'important');
            menu.style.setProperty('left', 'auto', 'important');
            menu.style.setProperty('height', '100%', 'important');
            menu.style.setProperty('width', 'auto', 'important');
            menu.style.setProperty('flex', '1 1 auto', 'important');
        }

        if (nav) {
            nav.classList.remove('twocolumn-nav-hide');
            nav.style.setProperty('display', 'flex', 'important');
            nav.style.setProperty('visibility', 'visible', 'important');
        }
    }

    function closeDrawer() {
        document.body.classList.remove('menu');
        document.body.classList.remove('vertical-sidebar-enable');
    }

    function isRealHref(href) {
        return !!(href && href !== '#' && href.charAt(0) !== '#' && href.indexOf('javascript:') !== 0);
    }

    function initNav() {
        forceHorizontal();
        showTopMenu();

        var nav = document.getElementById('navbar-nav');
        var menu = document.querySelector('.navbar-menu');
        if (!nav || !menu) return;

        var originalNavHtml = nav.innerHTML;
        var restoring = false;
        var navigating = false;

        var observer = new MutationObserver(function () {
            if (restoring) return;
            if (document.documentElement.getAttribute('data-layout') !== 'horizontal') {
                forceHorizontal();
                showTopMenu();
            }
            if (nav.children.length < 4 && originalNavHtml) {
                restoring = true;
                observer.disconnect();
                nav.innerHTML = originalNavHtml;
                showTopMenu();
                setTimeout(function () {
                    restoring = false;
                    observer.observe(nav, { childList: true, subtree: false });
                    observer.observe(document.documentElement, {
                        attributes: true,
                        attributeFilter: ['data-layout']
                    });
                }, 50);
            }
        });

        observer.observe(nav, { childList: true, subtree: false });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-layout']
        });

        // Single capture handler — one event type only (mousedown), so the first
        // press navigates before hover menus can close under the cursor.
        document.addEventListener(
            'mousedown',
            function (e) {
                if (typeof e.button === 'number' && e.button !== 0) return;
                if (navigating) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }

                var burger = e.target.closest && e.target.closest('#topnav-hamburger-icon, .topnav-hamburger');
                if (burger) {
                    if (isDrawer()) {
                        e.preventDefault();
                        e.stopPropagation();
                        document.body.classList.toggle('menu');
                    }
                    return;
                }

                if (e.target.closest && e.target.closest('.vertical-overlay')) {
                    if (isDrawer()) {
                        e.preventDefault();
                        closeDrawer();
                    }
                    return;
                }

                var link = e.target.closest && e.target.closest('#navbar-nav a[href], .navbar-header a[href]');
                if (!link) return;

                // Disabled menu entries (e.g. Returns)
                if (link.classList.contains('disabled') || link.getAttribute('aria-disabled') === 'true') {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }

                // Parent labels only expand in drawer mode
                if (link.classList.contains('dropdown-toggle') && link.closest('#navbar-nav')) {
                    e.preventDefault();
                    if (!isDrawer()) return;

                    var dropdownMenu = link.nextElementSibling;
                    if (!dropdownMenu || !dropdownMenu.classList.contains('dropdown-menu')) return;

                    var open = dropdownMenu.classList.contains('show');
                    nav.querySelectorAll('.dropdown-menu.show').forEach(function (m) {
                        m.classList.remove('show');
                        if (m.previousElementSibling) {
                            m.previousElementSibling.classList.remove('show');
                            m.previousElementSibling.setAttribute('aria-expanded', 'false');
                        }
                    });
                    if (!open) {
                        dropdownMenu.classList.add('show');
                        link.classList.add('show');
                        link.setAttribute('aria-expanded', 'true');
                    }
                    return;
                }

                if (link.hasAttribute('data-bs-toggle')) return;

                var href = link.getAttribute('href');
                if (!isRealHref(href)) return;

                if (link.id === 'new-sale-menu-link' && window.location.pathname === '/sales/form') {
                    return;
                }

                try {
                    var target = new URL(href, window.location.origin);
                    if (target.pathname === window.location.pathname && target.search === window.location.search) {
                        e.preventDefault();
                        return;
                    }
                } catch (err) { /* ignore */ }

                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                navigating = true;
                if (isDrawer()) closeDrawer();

                var loader = document.getElementById('global-loader');
                if (loader) loader.classList.add('active');

                window.location.assign(href);
            },
            true
        );

        // Swallow the trailing click after mousedown navigation so nothing else handles it
        document.addEventListener(
            'click',
            function (e) {
                if (!navigating) return;
                var link = e.target.closest && e.target.closest('#navbar-nav a[href], .navbar-header a[href]');
                if (!link) return;
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            },
            true
        );

        // Desktop hover open with delayed close
        nav.querySelectorAll(':scope > li.nav-item.dropdown').forEach(function (item) {
            var dropdownMenu = item.querySelector(':scope > .dropdown-menu');
            var toggle = item.querySelector(':scope > .dropdown-toggle');
            var leaveTimer = null;
            if (!dropdownMenu) return;

            function openMenu() {
                if (leaveTimer) {
                    clearTimeout(leaveTimer);
                    leaveTimer = null;
                }
                if (isDrawer()) return;
                dropdownMenu.classList.add('show');
                if (toggle) {
                    toggle.classList.add('show');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            }

            function scheduleClose() {
                if (isDrawer() || navigating) return;
                if (leaveTimer) clearTimeout(leaveTimer);
                leaveTimer = setTimeout(function () {
                    dropdownMenu.classList.remove('show');
                    if (toggle) {
                        toggle.classList.remove('show');
                        toggle.setAttribute('aria-expanded', 'false');
                    }
                    leaveTimer = null;
                }, 300);
            }

            item.addEventListener('mouseenter', openMenu);
            item.addEventListener('mouseleave', scheduleClose);
            dropdownMenu.addEventListener('mouseenter', openMenu);
            dropdownMenu.addEventListener('mouseleave', scheduleClose);
        });

        window.addEventListener('resize', function () {
            forceHorizontal();
            showTopMenu();
            if (!isDrawer()) closeDrawer();
        });

        var pins = 0;
        var pinTimer = setInterval(function () {
            forceHorizontal();
            showTopMenu();
            pins += 1;
            if (pins > 20) clearInterval(pinTimer);
        }, 250);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();
