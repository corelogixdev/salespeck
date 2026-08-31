document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const html = document.documentElement;

    // Function to update theme UI
    function updateThemeUI(theme) {
        // Update button icon
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.remove('bx-moon');
                    icon.classList.add('bx-sun');
                } else {
                    icon.classList.remove('bx-sun');
                    icon.classList.add('bx-moon');
                }
            }
        }
    }

    // Function to set theme
    function setTheme(theme) {
        html.setAttribute('data-layout-mode', theme);
        html.setAttribute('data-bs-theme', theme);
        localStorage.setItem('data-bs-theme', theme);
        updateThemeUI(theme);
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: theme } }));
    }

    // Get preferred theme
    function getPreferredTheme() {
        const savedTheme = localStorage.getItem('data-bs-theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Initialize
    const currentTheme = getPreferredTheme();
    updateThemeUI(currentTheme); // Sync UI
    // Note: Attributes are already set by the IIFE below, but we ensure consistency
    if (html.getAttribute('data-layout-mode') !== currentTheme) {
        setTheme(currentTheme);
    }

    themeToggleBtn?.addEventListener('click', function () {
        const currentVal = html.getAttribute('data-layout-mode');
        const newTheme = currentVal === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
});

// Immediate execution to prevent flash
(function () {
    try {
        var savedTheme = localStorage.getItem('data-bs-theme');
        if (!savedTheme) {
            var systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            savedTheme = systemPrefersDark ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-layout-mode', savedTheme);
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
    } catch (e) {
        console.error("Theme initialization error:", e);
    }
})();