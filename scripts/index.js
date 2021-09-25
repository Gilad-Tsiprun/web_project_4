import { initialCards } from './initCards.js';
import Card  from './Card.js';
import FormValidator from './FormValidator.js';
import { closePopup, openPopup } from './utilities.js';

const formSettings = {
  formSelector: ".input",
  inputSelector: ".input__text",
  submitButtonSelector: ".popup-box__action_submit",
  inactiveButtonClass: "popup-box__action_submit_inactive",
  inputErrorClass: "input__text_invalid",
  errorClass: "input-error_active"
};

const popupEdit = document.querySelector(".popup-box_type_edit");
const popupAdd = document.querySelector(".popup-box_type_add");
const inputEdit = document.querySelector('.input_edit');
export const editValidator = new FormValidator(formSettings, inputEdit);
const inputAdd = document.querySelector('.input_add');
export const addValidator = new FormValidator(formSettings, inputAdd);
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile-info');
const elementsContainer = document.querySelector(".elements__list");
const inputName = inputEdit.querySelector('.input__text_type_name');
const inputOccupation = inputEdit.querySelector('.input__text_type_occupation');
const name = profileInfo.querySelector('.profile-info__full-name');
const occupation = profileInfo.querySelector('.profile-info__occupation');
const elementTemplateSelector = "#element-template";
const place = document.querySelector(".input__text_type_title");
const src = document.querySelector(".input__text_type_image");


//Enabling Form Validation on the profile edit and add card
editValidator.enableValidation();
addValidator.enableValidation();

//Editing and saving profile section

function editProfile(e) {
  e.preventDefault();

  name.textContent = inputName.value;
  occupation.textContent = inputOccupation.value;

  closePopup(popupEdit);
}

inputEdit.addEventListener('submit', editProfile); 

//Opening and closing popup box section
const editProfileBtn = document.querySelector('.profile-info__edit');
const addElementBtn = document.querySelector('.profile__add');
const closePopupBtns = [...document.querySelectorAll('.popup-box__action_btn_close')];


function openPopupEdit()
{
  inputName.value = name.textContent;
  inputOccupation.value = occupation.textContent;

  openPopup(popupEdit);
}

function openPopupAdd()
{
  place.value = "";
  src.value = "";
  
  openPopup(popupAdd);
}

editProfileBtn.addEventListener('click', openPopupEdit);
addElementBtn.addEventListener('click', openPopupAdd);
closePopupBtns.forEach((closeBtn) => {
  closeBtn.addEventListener('click', () => {
    const popupToClose = closeBtn.closest('.popup-box');
    closePopup(popupToClose);
  }); 
});

function prependCard(data, elementTemplateSelector)
{
  const newCardElement = new Card(data, elementTemplateSelector);
  elementsContainer.prepend(newCardElement.generateCard());
}

function addElement(e) {
  e.preventDefault();
  
  const data = {title: place.value, image: src.value}

  prependCard(data, elementTemplateSelector);

  closePopup(popupAdd);
};

inputAdd.addEventListener("submit", addElement);



//adding initial cards
function initCards()
{
  initialCards.forEach((element) =>
  {
    prependCard(element, elementTemplateSelector);
  });
}

initCards();

