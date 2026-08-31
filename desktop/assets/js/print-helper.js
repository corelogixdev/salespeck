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
            paper: '58mm',
            width: 58,
            height: 200,
            fontSize: 12,
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
        const paper = cfg.paper || '58mm';
        const fontSize = parseInt(cfg.fontSize) || 12;
        const widthMm = parseInt(cfg.width) || (paper === '80mm' ? 80 : 58);

        let css = '';
        if (printerType === 'thermal' || paper === '58mm' || paper === '80mm') {
            css = `
                @media print {
                    @page {
                        size: ${widthMm}mm auto;
                        margin: 0;
                    }
                    html, body {
                        width: ${widthMm}mm !important;
                        margin: 0 !important;
                        padding: 2mm !important;
                        font-size: ${fontSize}px !important;
                        background: #fff !important;
                        color: #000 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .no-print, .no-print * {
                        display: none !important;
                    }
                    .card {
                        border: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        width: 100% !important;
                    }
                    .table {
                        font-size: ${Math.max(10, fontSize - 1)}px !important;
                        width: 100% !important;
                        margin-bottom: 4px !important;
                    }
                    .table th, .table td {
                        padding: 2px 4px !important;
                    }
                    .card-header, .card-body, .card-footer {
                        padding: 4px !important;
                    }
                    img.card-logo {
                        max-height: 40px !important;
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
                    .no-print, .no-print * {
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
