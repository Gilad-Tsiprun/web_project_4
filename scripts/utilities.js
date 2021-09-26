
import FormValidator from './FormValidator.js';

const formSettings = {
  formSelector: ".input",
  inputSelector: ".input__text",
  submitButtonSelector: ".popup-box__action_submit",
  inactiveButtonClass: "popup-box__action_submit_inactive",
  inputErrorClass: "input__text_invalid",
  errorClass: "input-error_active"
};
const popupImage = document.querySelector('.popup-box_type_image');
const popupImageSrc = document.querySelector('.popup-box__background');
const popupEdit = document.querySelector(".popup-box_type_edit");
const popupAdd = document.querySelector(".popup-box_type_add");
const popupCaption = document.querySelector(".popup-box__caption");
const inputEdit = document.querySelector('.input_edit');
const editValidator = new FormValidator(formSettings, inputEdit);
const inputAdd = document.querySelector('.input_add');
const addValidator = new FormValidator(formSettings, inputAdd);

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
}

export { popupImage, popupImageSrc, popupCaption, popupAdd, popupEdit, addValidator, editValidator, inputAdd, inputEdit, formSettings, closePopup, openPopup };