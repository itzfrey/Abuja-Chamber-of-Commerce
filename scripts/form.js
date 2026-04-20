

// form.js
document.addEventListener("DOMContentLoaded", () => {
  // Set timestamp
  const ts = document.getElementById("timestamp");
  if (ts) ts.value = new Date().toLocaleString();

  // ===== Modal logic =====
  const modals = document.querySelectorAll(".modal");
  const modalButtons = document.querySelectorAll("[data-modal]");
  const closeButtons = document.querySelectorAll(".close");

  // Open modal
  modalButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const targetModal = document.getElementById(btn.dataset.modal);
      if (targetModal) targetModal.showModal();
    });
  });

  // Close modal when clicking the close button
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modals.forEach(m => m.close());
    });
  });

  // Close modal when clicking outside
  modals.forEach(m => {
    m.addEventListener("click", e => {
      if (e.target === m) m.close();
    });
  });
});
