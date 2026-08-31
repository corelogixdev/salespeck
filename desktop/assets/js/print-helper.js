/**
 * SalesPeck Printer Helper
 * Unified printing functionality for thermal POS receipts and standard documents.
 */
(function(window) {
    'use strict';

    function getPrinterConfig() {
        if (window.printerConfig && typeof window.printerConfig === 'object') {
            return window.printerConfig;
        }
        return {
            printer: 'Default',
            printerType: 'thermal',
            paper: '80mm',
            width: 80,
            height: 0,
            fontSize: 11,
            silentPrinting: false,
            numberOfPrints: 1
        };
    }

    function injectDynamicPrintStyles(config) {
        let styleEl = document.getElementById('salespeck-dynamic-print-css');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'salespeck-dynamic-print-css';
            document.head.appendChild(styleEl);
        }

        const cfg = config || getPrinterConfig();
        const printerType = cfg.printerType || 'thermal';
        const paper = cfg.paper || '80mm';
        const fontSize = parseInt(cfg.fontSize) || 11;
        const widthMm = parseInt(cfg.width) || (paper === '58mm' ? 58 : 80);

        let css = '';
        if (printerType === 'thermal' || paper === '58mm' || paper === '80mm') {
            css = `
                @media print {
                    @page {
                        margin: 0;
                    }
                    /* Hide outer app navigation, topbars, footers, buttons & breadcrumbs */
                    #page-topbar, #scrollbar, .navbar-header, .vertical-overlay,
                    .breadcrumb, .page-title-box, .no-print, .no-print *,
                    .btn, button, nav, header, footer {
                        display: none !important;
                    }
                    /* Reset Bootstrap grid containers & margins for thermal roll paper */
                    html, body, #layout-wrapper, .main-content, .page-content, .cstm-row, .container-fluid, .row, .col-lg-12, .col-12 {
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                        max-width: ${widthMm}mm !important;
                        float: none !important;
                        position: static !important;
                        top: 0 !important;
                        left: 0 !important;
                    }
                    body {
                        width: ${widthMm}mm !important;
                        margin: 0 auto !important;
                        padding: 1mm 2mm !important;
                        font-size: ${fontSize}px !important;
                        line-height: 1.25 !important;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
                        background: #fff !important;
                        color: #000 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .card {
                        border: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        width: 100% !important;
                        background: transparent !important;
                    }
                    .card-header, .card-body, .card-footer {
                        padding: 2px 0 !important;
                        border: none !important;
                    }
                    /* Stack Company Details & Customer Details vertically for thermal roll */
                    .card-header .d-flex {
                        flex-direction: column !important;
                        align-items: center !important;
                        text-align: center !important;
                    }
                    .card-header .flex-grow-1, .card-header .flex-shrink-0 {
                        width: 100% !important;
                        text-align: center !important;
                        margin-bottom: 4px !important;
                    }
                    /* Clean metadata section (Invoice No, Date, Total Amount) */
                    .card-body .row.g-3 {
                        display: flex !important;
                        flex-wrap: wrap !important;
                        justify-content: space-between !important;
                        margin: 4px 0 !important;
                        border-top: 1px dashed #000 !important;
                        border-bottom: 1px dashed #000 !important;
                        padding: 4px 0 !important;
                    }
                    .card-body .row.g-3 > div {
                        width: 32% !important;
                        text-align: center !important;
                        padding: 0 !important;
                    }
                    .card-body .row.g-3 p {
                        margin-bottom: 2px !important;
                        font-size: ${Math.max(9, fontSize - 2)}px !important;
                    }
                    .card-body .row.g-3 h5 {
                        font-size: ${Math.max(10, fontSize - 1)}px !important;
                    }
                    /* Compact table styles */
                    .table {
                        font-size: ${Math.max(10, fontSize - 1)}px !important;
                        width: 100% !important;
                        margin-bottom: 4px !important;
                        border-collapse: collapse !important;
                        color: #000 !important;
                    }
                    .table th, .table td {
                        padding: 2px 1px !important;
                        border-bottom: 1px dotted #888 !important;
                        max-width: none !important;
                    }
                    .table-active {
                        background-color: transparent !important;
                        border-bottom: 1px solid #000 !important;
                    }
                    .footer-table {
                        width: 100% !important;
                        min-width: 0 !important;
                        margin-left: 0 !important;
                    }
                    .footer-table td, .footer-table th {
                        padding: 2px 0 !important;
                    }
                    img.card-logo {
                        max-height: 40px !important;
                        margin: 0 auto 4px auto !important;
                    }
                    .duplicate-watermark {
                        position: relative !important;
                        top: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        transform: none !important;
                        font-size: 1.1rem !important;
                        border: 2px dashed #000 !important;
                        color: #000 !important;
                        padding: 4px !important;
                        margin: 4px 0 !important;
                        text-align: center !important;
                    }
                }
            `;
        } else {
            // Standard document printer (A4, A5, Letter, Legal)
            const pagePaper = paper === 'A5' ? 'A5' : (paper === 'Letter' ? 'letter' : (paper === 'Legal' ? 'legal' : 'A4'));
            css = `
                @media print {
                    @page {
                        size: ${pagePaper} portrait;
                        margin: 10mm;
                    }
                    html, body {
                        font-size: ${fontSize}px !important;
                        background: #fff !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    #page-topbar, #scrollbar, .navbar-header, .vertical-overlay,
                    .breadcrumb, .page-title-box, .no-print, .no-print * {
                        display: none !important;
                    }
                    .card {
                        border: none !important;
                        box-shadow: none !important;
                    }
                }
            `;
        }

        styleEl.textContent = css;
    }

    async function executePrint(overrideOptions = {}) {
        const config = { ...getPrinterConfig(), ...overrideOptions };
        injectDynamicPrintStyles(config);

        const silent = config.silentPrinting === true || config.silentPrinting === 'true';
        const copies = parseInt(config.numberOfPrints) || 1;
        const deviceName = config.printer || 'Default';

        // Execute printing in Electron if available
        if (window.electron && typeof window.electron.triggerPrint === 'function') {
            try {
                for (let i = 0; i < copies; i++) {
                    await window.electron.triggerPrint({
                        deviceName: deviceName !== 'Default' ? deviceName : undefined,
                        silent: silent,
                        copies: 1
                    });
                }
                return true;
            } catch (err) {
                console.error('[PrinterHelper] Electron print failed:', err);
            }
        }

        // Fallback for web browser window.print
        for (let i = 0; i < copies; i++) {
            window.print();
        }
        return true;
    }

    // Auto-inject styles on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            injectDynamicPrintStyles();
        });
    } else {
        injectDynamicPrintStyles();
    }

    window.SalesPeckPrinter = {
        getConfig: getPrinterConfig,
        applyStyles: injectDynamicPrintStyles,
        print: executePrint
    };
})(window);
