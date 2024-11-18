export function openModal(popup) {
  popup.classList.add("popup_is-animated");

  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);

  document.addEventListener("keydown", handleEscape);
  
  handleClosePopup(popup)
}

export function closeModal(popup) {
  document.removeEventListener("keydown", handleEscape);
  popup.classList.remove("popup_is-opened");
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function handleClosePopup (popup){
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });

  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      closeModal(popup);
    }
  });
}