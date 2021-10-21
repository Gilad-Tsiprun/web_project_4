function closePopup(popupBox) {
  popupBox.classList.remove('popup-box_opened');
  document.removeEventListener("keydown", closeOnEscape);
  popupBox.removeEventListener("click", closeOnOverlayClick);
}

function closeOnEscape(e) {
  if (e.key === "Escape") { //ESC
    closePopup(document.querySelector(".popup-box_opened"));
  }
}

function closeOnOverlayClick(e) {
  const openedPopup = document.querySelector(".popup-box_opened");
  if (e.target === openedPopup) {
    closePopup(openedPopup);
  }
}

function openPopup(popupBox) {
  document.addEventListener("keydown", closeOnEscape);
  popupBox.addEventListener("click", closeOnOverlayClick);
  popupBox.classList.add('popup-box_opened');
}

export { closePopup, openPopup };