/**
 * POS Scanner Focus Helper
 * Ensures that barcode scanners (which act as keyboards) always have a valid target.
 */
(function() {
    'use strict';

    // Configurable selectors for different pages
    const SELECTORS = {
        'sales-page': '#product-search-', // Starts with
        'product-page': '#barcode'
    };

    let lastActivity = Date.now();
    let isEditingText = false;

    // Detect if user is typing in a non-barcode field
    document.addEventListener('focusin', (e) => {
        const tag = e.target.tagName.toLowerCase();
        const type = e.target.type || '';
        const id = e.target.id || '';

        // If it's a search field or barcode field, we consider it "Scanner Focused"
        if (id.startsWith('product-search-') || id === 'barcode') {
            isEditingText = false;
        } else if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) {
            isEditingText = true;
        }
    });

    document.addEventListener('focusout', () => {
        isEditingText = false;
    });

    // Main focus-lock logic
    document.addEventListener('keydown', (e) => {
        lastActivity = Date.now();

        // If we are currently editing a legitimate text field, don't hijack focus
        if (isEditingText) return;

        // Ignore modifier keys
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        // If focus is lost or not on an input, and user starts typing alphanumeric characters
        // we assume it might be a scanner and try to find the best input
        const isAlphaNumeric = /^[a-z0-9]$/i.test(e.key);
        
        if (isAlphaNumeric && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            // Find the search input for the current active sale tab
            const activeTab = document.querySelector('.tab-content-panel.active');
            let targetInput = null;

            if (activeTab) {
                targetInput = activeTab.querySelector('input[id^="product-search-"]');
            } else {
                // Fallback to generic barcode fields
                targetInput = document.getElementById('barcode') || document.querySelector('input[name="barcode"]');
            }

            if (targetInput) {
                targetInput.focus();
                // Optionally we don't clear it, but let the scanner finish
            }
        }
    });

    // Provide a way to manually re-focus if needed
    window.refocusScanner = function() {
        const activeTab = document.querySelector('.tab-content-panel.active');
        const targetInput = activeTab ? activeTab.querySelector('input[id^="product-search-"]') : document.getElementById('barcode');
        if (targetInput) targetInput.focus();
    };

})();
