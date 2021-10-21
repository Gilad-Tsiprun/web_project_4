
import FormValidator from '../scripts/FormValidator.js';

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
const inputAvatar = document.querySelector('.input_edit-avatar');
const avatarValidator = new FormValidator(formSettings, inputAvatar);


export { popupImage, popupImageSrc, popupCaption, popupAdd, popupEdit, addValidator, editValidator, avatarValidator, inputAdd, inputEdit, formSettings }