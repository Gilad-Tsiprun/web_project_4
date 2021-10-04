import "./styles/index.css";
import { initialCards } from './scripts/initCards.js';
import Card  from './scripts/Card.js';
import { closePopup, openPopup, editValidator, inputAdd, addValidator, inputEdit } from './scripts/utilities.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';


const popupEdit = document.querySelector(".popup-box_type_edit");
const popupAdd = document.querySelector(".popup-box_type_add");
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile-info');
//const elementsContainer = document.querySelector(".elements__list");
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

const userInfo = new UserInfo({ nameSelector: '.profile-info__full-name', aboutSelector: '.profile-info__occupation'});

function editProfile() {
 /* name.textContent = inputName.value;
  occupation.textContent = inputOccupation.value;*/
  userInfo.setUserInfo({ name: inputName.value, about: inputOccupation.value});

  closePopup(popupEdit);
}

//inputEdit.addEventListener('submit', editProfile); 

//Opening and closing popup box section
const editProfileBtn = document.querySelector('.profile-info__edit');
const addElementBtn = document.querySelector('.profile__add');
//const closePopupBtns = [...document.querySelectorAll('.popup-box__action_btn_close')];


function openPopupEdit()
{
/*  inputName.value = name.textContent;
  inputOccupation.value = occupation.textContent;*/
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputOccupation.value = userData.about;

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
/*closePopupBtns.forEach((closeBtn) => {
  closeBtn.addEventListener('click', () => {
    const popupToClose = closeBtn.closest('.popup-box');
    closePopup(popupToClose);
  }); 
});*/

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector, () => imagePopupModal.open(data));

  return card;
}

/*function prependCard(card) {
  elementsContainer.prepend(card.generateCard());
}*/

const initCards = new Section({
  items: initialCards, 
  renderer: (item) => {
    const card = createCard(item, elementTemplateSelector);
    const cardElement = card.generateCard();

    initCards.addItem(cardElement);
  }
}, ".elements__list")

initCards.renderItems();

/*function addElement() {
  const data = {title: place.value, image: src.value}
  const newCardElement = createCard(data, elementTemplateSelector)

  prependCard(newCardElement);

  closePopup(popupAdd);
};*/

const imagePopupModal = new PopupWithImage(".popup-box_type_image")
const addCardModal = new PopupWithForm(".popup-box_type_add", () => {  
  const data = {title: place.value, image: src.value}
  const newCard = createCard(data, elementTemplateSelector)
  const cardToInsert = newCard.generateCard();

  initCards.addItem(cardToInsert);
  closePopup(popupAdd);
});
const editProfiledModal = new PopupWithForm(".popup-box_type_edit", () => {
  const userData = { name: inputName.value, about: inputOccupation.value }
  userInfo.setUserInfo(userData);

  closePopup(popupEdit);
});
imagePopupModal.setEventListeners();
addCardModal.setEventListeners();
editProfiledModal.setEventListeners();

//inputAdd.addEventListener("submit", addElement);



//adding initial cards
/*function initCards()
{
  initialCards.forEach((element) =>
  {
    const initialCard = createCard(element, elementTemplateSelector);
    prependCard(initialCard);
  });
}*/

//initCards();

