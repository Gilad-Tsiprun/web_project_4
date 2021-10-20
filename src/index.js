import "./styles/index.css";
import Card from './scripts/Card.js';
import { closePopup, openPopup, editValidator, addValidator, avatarValidator, inputEdit } from './scripts/utilities.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithSubmit from './scripts/PopupWithSubmit.js'
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';
import { Api } from "./scripts/API.js";



const api = new Api({
  baseURL: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "27cb3c49-bc49-41ab-86a1-13f7e0fb21a4",
    "Content-Type": "application/json"
  }
});

let userId;


//retrieving profile info and initial cards
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo({ fullName: userData.name, occupation: userData.about });
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id;
    initCards.renderItems(cards);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });

//elements
const popupEdit = document.querySelector(".popup-box_type_edit");
const popupAvatar = document.querySelector(".popup-box_type_edit-avatar")
const popupAdd = document.querySelector(".popup-box_type_add");
const inputName = inputEdit.querySelector('.input__text_type_full-name');
const inputOccupation = inputEdit.querySelector('.input__text_type_occupation');
const inputAvatar = document.querySelector('.input__text_type_image');
const elementTemplateSelector = "#element-template";
const place = document.querySelector(".input__text_type_name");
const src = document.querySelector(".input__text_type_link");




//Enabling Form Validation on the profile edit and add card
editValidator.enableValidation();
addValidator.enableValidation();
avatarValidator.enableValidation();

//Editing and saving profile section

const userInfo = new UserInfo({ nameSelector: '.profile-info__full-name', occupationSelector: '.profile-info__occupation', avatarSelector: '.avatar__image' });

//Opening popup box section
const editProfileBtn = document.querySelector('.profile-info__edit');
const addElementBtn = document.querySelector('.profile__add');
const editAvatarBtn = document.querySelector('.avatar__edit');


function openPopupEdit() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputOccupation.value = userData.occupation;

  editValidator.resetValidation();

  openPopup(popupEdit);
}

function openPopupEditAvatar() {
  const userData = userInfo.getUserInfo();
  inputAvatar.value = userData.avatar;

  avatarValidator.resetValidation();

  openPopup(popupAvatar);
}

function openPopupAdd() {
  place.value = "";
  src.value = "";

  addValidator.resetValidation();

  openPopup(popupAdd);
}

editProfileBtn.addEventListener('click', openPopupEdit);
addElementBtn.addEventListener('click', openPopupAdd);
editAvatarBtn.addEventListener('click', openPopupEditAvatar);




//cards logic
function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector,
    () => imagePopupModal.open(data),
    (id) => {
      removeCardModal.open();

      removeCardModal.setAction(() => {
        api.deleteCard(id)
          .then(() => {
            card.removeCard();
            removeCardModal.close();
          })
          .catch((err) => {
            console.log(err); // log the error to the console
          });
      })
    },
    (id) => {
      if (!card.isLikedByUser()) {
        api.likeCard(id)
          .then((res) => card.toggleLike(res.likes))
          .catch((err) => {
            console.log(err); // log the error to the console
          });
      }
      else {
        api.unlikeCard(id)
          .then((res) => card.toggleLike(res.likes))
          .catch((err) => {
            console.log(err); // log the error to the console
          });
      }
    }, userId);


  return card.generateCard();
}

const initCards = new Section({
  renderer: (item) => {
    const card = createCard(item, elementTemplateSelector);

    initCards.addItem(card);
  }
}, ".elements__list")


//modals/popups
const imagePopupModal = new PopupWithImage(".popup-box_type_image")
const removeCardModal = new PopupWithSubmit(".popup-box_type_remove")
const addCardModal = new PopupWithForm(".popup-box_type_add", (data) => {
  addCardModal.showLoadingProgress();
  api.createCard(data)
    .then(res => {
      const newCard = createCard(res, elementTemplateSelector)

      initCards.addItem(newCard);
      closePopup(popupAdd);
    })
    .then(() => addCardModal.onLoadFinish())
    .catch((err) => {
      console.log(err); // log the error to the console
    });
});
const editProfileModal = new PopupWithForm(".popup-box_type_edit", (data) => {
  editProfileModal.showLoadingProgress();
  api.setUserInfo({ name: data.fullName, about: data.occupation })
    .then(res => {
      userInfo.setUserInfo({ fullName: res.name, occupation: res.about })

      closePopup(popupEdit);
    })
    .then(() => editProfileModal.onLoadFinish())
    .catch((err) => {
      console.log(err); // log the error to the console
    });
});
const editAvatarModal = new PopupWithForm(".popup-box_type_edit-avatar", (data) => {
  editAvatarModal.showLoadingProgress();
  api.setUserImage(data.image)
    .then(res => {
      userInfo.setUserAvatar(res.avatar)

      closePopup(popupAvatar);
    })
    .then(() => editAvatarModal.onLoadFinish())
    .catch((err) => {
      console.log(err); // log the error to the console
    });
});

imagePopupModal.setEventListeners();
removeCardModal.setEventListeners();
addCardModal.setEventListeners();
editProfileModal.setEventListeners();
editAvatarModal.setEventListeners();

