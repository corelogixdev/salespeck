/**
 * Renderer Logic — Print Preview UI Controller
 * --------------------------------------------
 * Handles user interactions, IPC calls, loading states, and error display.
 * Assumes `window.electron` has been injected by the preload script.
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // DOM References
  // ---------------------------------------------------------------------------
  const btnGenerate   = document.getElementById('btnGenerate');
  const btnPrint      = document.getElementById('btnPrint');
  const btnDismissErr = document.getElementById('btnDismissError');
  const pdfFrame      = document.getElementById('pdfFrame');
  const emptyState    = document.getElementById('emptyState');
  const statusBar     = document.getElementById('statusBar');
  const statusText    = document.getElementById('statusText');
  const errorBanner   = document.getElementById('errorBanner');
  const errorText     = document.getElementById('errorText');

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  let isGenerating = false;

  // ---------------------------------------------------------------------------
  // UI Helpers
  // ---------------------------------------------------------------------------

  /**
   * Toggle the loading status bar.
   */
  function setLoading(loading, message) {
    isGenerating = loading;
    if (loading) {
      statusBar.classList.add('active');
      statusText.textContent = message || 'Generating PDF preview…';
      btnGenerate.disabled = true;
    } else {
      statusBar.classList.remove('active');
      btnGenerate.disabled = false;
    }
  }

  /**
   * Display an error banner with auto-hide fallback.
   */
  function showError(message) {
    errorText.textContent = message;
    errorBanner.classList.add('active');
    // Auto-hide after 8 seconds so the UI doesn't stay stuck
    setTimeout(() => errorBanner.classList.remove('active'), 8000);
  }

  function clearError() {
    errorBanner.classList.remove('active');
  }

  /**
   * Show or hide the PDF iframe vs. the empty-state placeholder.
   */
  function setPreviewVisible(visible) {
    if (visible) {
      pdfFrame.hidden = false;
      emptyState.hidden = true;
      btnPrint.disabled = false;
    } else {
      pdfFrame.hidden = true;
      emptyState.hidden = false;
      btnPrint.disabled = true;
    }
  }

  // ---------------------------------------------------------------------------
  // Event Handlers
  // ---------------------------------------------------------------------------

  /**
   * "Show Print Preview" click handler.
   * Invokes the main process, receives a secure app-print:// URL,
   * and loads it into the iframe.
   */
  async function handleGeneratePreview() {
    if (isGenerating) return;
    clearError();
    setLoading(true, 'Generating PDF preview…');

    try {
      // Secure IPC: main process generates PDF and returns a custom-protocol URL
      const result = await window.electron.generatePrintPreview();

      if (result && result.success && result.previewUrl) {
        // Load the PDF via our custom protocol into the iframe.
        // This avoids file:// CORS issues and keeps the buffer in the main process.
        pdfFrame.src = result.previewUrl;
        setPreviewVisible(true);
      } else {
        throw new Error(result.error || 'Preview generation returned an empty response.');
      }
    } catch (err) {
      console.error('[Renderer] Print preview generation failed:', err);
      showError(err.message || 'Could not generate print preview. Please try again.');
      setPreviewVisible(false);
    } finally {
      setLoading(false);
    }
  }

  /**
   * "Print Now" click handler.
   * Triggers the native OS print dialog for the CURRENT window.
   * Because the main process uses printBackground:true, CSS colors
   * and background graphics are preserved in the printed output.
   */
  async function handlePrint() {
    try {
      btnPrint.disabled = true;
      setLoading(true, 'Opening print dialog…');

      const result = await window.electron.triggerPrint();

      if (result && result.success) {
        statusText.textContent = 'Print dialog opened.';
        setTimeout(() => setLoading(false), 1200);
      }
    } catch (err) {
      console.error('[Renderer] Print failed:', err);
      showError(err.message || 'Print was cancelled or failed.');
      setLoading(false);
    } finally {
      btnPrint.disabled = false;
    }
  }

  // ---------------------------------------------------------------------------
  // Bindings
  // ---------------------------------------------------------------------------

  btnGenerate.addEventListener('click', handleGeneratePreview);
  btnPrint.addEventListener('click', handlePrint);
  btnDismissErr.addEventListener('click', clearError);

  // If the iframe fails to load the PDF for any reason, surface it to the user
  pdfFrame.addEventListener('error', () => {
    showError('Failed to load the preview document in the iframe.');
    setLoading(false);
  });

  // Keyboard shortcut: Ctrl/Cmd + P triggers print directly
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      handlePrint();
    }
  });

  // Graceful fallback: if the IPC bridge is missing, disable buttons and warn
  if (!window.electron || !window.electron.generatePrintPreview) {
    btnGenerate.disabled = true;
    btnPrint.disabled = true;
    showError('Print preview API is not available. Check preload configuration.');
  }
})();
