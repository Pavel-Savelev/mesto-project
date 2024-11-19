export function openModal(popup) {
  popup.classList.add("popup_is-animated");

  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);

  document.addEventListener("keydown", handleEscape);
  
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

