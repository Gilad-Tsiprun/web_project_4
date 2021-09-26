import { initialCards } from './initCards.js';
import Card  from './Card.js';
import { closePopup, openPopup, editValidator, inputAdd, addValidator, inputEdit } from './utilities.js';


const popupEdit = document.querySelector(".popup-box_type_edit");
const popupAdd = document.querySelector(".popup-box_type_add");
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

  editValidator.resetValidation();

  openPopup(popupEdit);
}

function openPopupAdd()
{
  place.value = "";
  src.value = "";

  addValidator.resetValidation();
  
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

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector);

  return card;
}

function prependCard(card) {
  elementsContainer.prepend(card.generateCard());
}

function addElement(e) {
  e.preventDefault();
  
  const data = {title: place.value, image: src.value}
  const newCardElement = createCard(data, elementTemplateSelector)

  prependCard(newCardElement);

  closePopup(popupAdd);
};

inputAdd.addEventListener("submit", addElement);



//adding initial cards
function initCards()
{
  initialCards.forEach((element) =>
  {
    const initialCard = createCard(element, elementTemplateSelector);
    prependCard(initialCard);
  });
}

initCards();

