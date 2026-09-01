if (
  document.querySelectorAll("[toast-list]").length > 0 || 
  document.querySelectorAll("[data-choices]").length > 0 || 
  document.querySelectorAll("[data-provider]").length > 0
) {
  const toastifyScript = document.createElement("script");
  toastifyScript.src = "https://cdn.jsdelivr.net/npm/toastify-js";
  document.head.appendChild(toastifyScript);

  const choicesScript = document.createElement("script");
  choicesScript.src = "/assets/libs/choices.js/public/assets/scripts/choices.min.js";
  document.head.appendChild(choicesScript);
}
