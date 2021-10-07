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

const userInfo = new UserInfo({ nameSelector: '.profile-info__full-name', occupationSelector: '.profile-info__occupation'});

//Opening and closing popup box section
const editProfileBtn = document.querySelector('.profile-info__edit');
const addElementBtn = document.querySelector('.profile__add');


function openPopupEdit()
{
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputOccupation.value = userData.occupation;

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

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector, () => imagePopupModal.open(data));

  return card.generateCard();
}

const initCards = new Section({
  items: initialCards, 
  renderer: (item) => {
    const card = createCard(item, elementTemplateSelector);

    initCards.addItem(card);
  }
}, ".elements__list")

initCards.renderItems();

const imagePopupModal = new PopupWithImage(".popup-box_type_image")
const addCardModal = new PopupWithForm(".popup-box_type_add", (data) => {  
const newCard = createCard(data, elementTemplateSelector)

  initCards.addItem(newCard);
  closePopup(popupAdd);
});
const editProfiledModal = new PopupWithForm(".popup-box_type_edit", (data) => {
  userInfo.setUserInfo(data);

  closePopup(popupEdit);
});
imagePopupModal.setEventListeners();
addCardModal.setEventListeners();
editProfiledModal.setEventListeners();

