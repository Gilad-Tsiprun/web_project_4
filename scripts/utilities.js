import { addValidator, editValidator } from "./index.js";

const popupImage = document.querySelector('.popup-box_type_image');
const popupImageSrc = document.querySelector('.popup-box__background');
const popupEdit = document.querySelector(".popup-box_type_edit");
const popupAdd = document.querySelector(".popup-box_type_add");
const popupCaption = document.querySelector(".popup-box__caption");

function closePopup(popupBox)
{
  popupBox.classList.remove('popup-box_opened');
  document.removeEventListener("keydown", closeOnEscape);
  popupBox.removeEventListener("click", closeOnOverlayClick);
}

function closeOnEscape(e) 
{
  if (e.key === "Escape") { //ESC
    closePopup(document.querySelector(".popup-box_opened"));
  }
}

function closeOnOverlayClick(e) {
  const openedPopup = document.querySelector(".popup-box_opened");
  if (e.target === openedPopup)
  {
    closePopup(openedPopup);
  }
}

function openPopup(popupBox) {
  document.addEventListener("keydown", closeOnEscape);
  popupBox.addEventListener("click", closeOnOverlayClick);
  popupBox.classList.add('popup-box_opened');

  switch(popupBox) {
    case popupAdd:
      addValidator.resetValidation();
      break;
    case popupEdit:  //resetting the validation should only happen in form popups
      editValidator.resetValidation();
      break;
  }
}

export { popupImage, popupImageSrc, popupCaption, popupAdd, popupEdit, closePopup, openPopup };