/**
 * SalesPeck Amount Privacy Manager
 * Toggles masking (asterisks ****) on financial numbers across Dashboard & BI Reports.
 */
(function () {
    'use strict';

    function getPrivacyState() {
        return localStorage.getItem('salespeck_privacy_mode') || 'masked';
    }

    function setPrivacyState(state) {
        localStorage.setItem('salespeck_privacy_mode', state);
        applyPrivacyState(state);
    }

    function applyPrivacyState(state) {
        var isMasked = state === 'masked';
        if (isMasked) {
            document.body.classList.add('privacy-masked');
        } else {
            document.body.classList.remove('privacy-masked');
        }

        // Process all elements marked with .mask-amount
        document.querySelectorAll('.mask-amount').forEach(function (el) {
            if (!el.hasAttribute('data-raw-value')) {
                el.setAttribute('data-raw-value', el.textContent.trim());
            }
            var raw = el.getAttribute('data-raw-value');

            if (isMasked) {
                if (/^Rs\.\s*/i.test(raw)) {
                    el.textContent = 'Rs. ****';
                } else if (/^PKR\s*/i.test(raw)) {
                    el.textContent = 'PKR ****';
                } else if (/^\$\s*/.test(raw)) {
                    el.textContent = '$****';
                } else {
                    el.textContent = '****';
                }
            } else {
                el.textContent = raw;
            }
        });

        // Update all privacy toggle buttons across header and pages
        document.querySelectorAll('.privacy-toggle-btn').forEach(function (btn) {
            var icon = btn.querySelector('i');
            var label = btn.querySelector('.privacy-label');
            if (isMasked) {
                btn.setAttribute('title', 'Show Amounts');
                if (icon) icon.className = 'ri-eye-line fs-18 align-middle';
                if (label) label.textContent = 'Show Amounts';
            } else {
                btn.setAttribute('title', 'Hide Amounts');
                if (icon) icon.className = 'ri-eye-off-line fs-18 align-middle';
                if (label) label.textContent = 'Hide Amounts';
            }
        });

        window.dispatchEvent(new CustomEvent('privacyStateChanged', { detail: { isMasked: isMasked } }));
    }

    document.addEventListener('DOMContentLoaded', function () {
        applyPrivacyState(getPrivacyState());

        document.addEventListener('click', function (e) {
            var btn = e.target.closest && e.target.closest('.privacy-toggle-btn');
            if (btn) {
                e.preventDefault();
                e.stopPropagation();
                var currentState = getPrivacyState();
                var newState = currentState === 'masked' ? 'revealed' : 'masked';
                setPrivacyState(newState);
            }
        }, true);
    });

    window.SalesPeckPrivacy = {
        getPrivacyState: getPrivacyState,
        setPrivacyState: setPrivacyState,
        applyPrivacyState: applyPrivacyState
    };
})();
