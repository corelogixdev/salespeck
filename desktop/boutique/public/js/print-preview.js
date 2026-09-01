/**
 * Print Preview Renderer - Ultra-simple version
 */
(function () {
  'use strict';

  var btnPrint = document.getElementById('btnPrint');
  var btnClose = document.getElementById('btnClose');
  var pdfEmbed = document.getElementById('pdfEmbed');

  // Primary load method: query params injected by main process via loadFile
  var params = new URLSearchParams(window.location.search);
  var fileUrl = params.get('url');
  var filePath = params.get('path');

  if (fileUrl && pdfEmbed) {
    pdfEmbed.src = fileUrl;
    pdfEmbed.hidden = false;
    if (btnPrint) btnPrint.disabled = false;
  }

  // Fallback: IPC message
  if (window.electron && window.electron.receive) {
    window.electron.receive('load-preview', function (data) {
      var url = (typeof data === 'object' && data !== null) ? data.previewUrl : data;
      var path = (typeof data === 'object' && data !== null) ? data.filePath : null;
      if (url && pdfEmbed) {
        pdfEmbed.src = url;
        pdfEmbed.hidden = false;
        if (btnPrint) btnPrint.disabled = false;
      }
      if (path) filePath = path;
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', function () {
      if (filePath && window.electron && window.electron.openPdfInViewer) {
        window.electron.openPdfInViewer(filePath).catch(function (err) {
          alert('Could not open PDF viewer: ' + err.message);
        });
      } else {
        alert('PDF path not available');
      }
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', function () {
      if (window.electron && window.electron.send) {
        window.electron.send('close-preview-window');
      } else {
        window.close();
      }
    });
  }
})();
