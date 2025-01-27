document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const html = document.documentElement;
    
    // Function to update theme
    function updateTheme(theme) {
        html.setAttribute('data-layout-mode', theme);
        localStorage.setItem('data-bs-theme', theme);
        
        // Update button icon
        if(!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('bx-moon');
            icon.classList.add('bx-sun');
        } else {
            icon.classList.remove('bx-sun');
            icon.classList.add('bx-moon');
        }
    }

    const currentTheme = localStorage.getItem('data-bs-theme') || 'light';
    updateTheme(currentTheme);

    themeToggleBtn?.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-layout-mode');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        updateTheme(newTheme);
    });
});
(function() {
    var savedTheme = localStorage.getItem('data-bs-theme') || 'light';
    document.documentElement.setAttribute('data-layout-mode', savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
})();