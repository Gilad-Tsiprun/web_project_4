import { initialCards } from './scripts/initCards.js';

const popupBoxes = document.querySelectorAll('.popup-box');
const inputEdit = document.querySelector('.input_edit');
const inputAdd = document.querySelector('.input_add');
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile-info');
const elementsContainer = document.querySelector(".elements__list");
const inputName = inputEdit.querySelector('.input__text_type_name');
const inputOccupation = inputEdit.querySelector('.input__text_type_occupation');
const name = profileInfo.querySelector('.profile-info__full-name');
const occupation = profileInfo.querySelector('.profile-info__occupation');
const popupImage = document.querySelector('.popup-box_type_image');
const popupImageSrc = document.querySelector('.popup-box__background');
const elementTemplate = document.querySelector("#element-template").content;
const title = document.querySelector(".input__text_type_title");
const src = document.querySelector(".input__text_type_image");

//Editing and saving profile section

function editProfile(e) {
  e.preventDefault();

  name.textContent = inputName.value;
  occupation.textContent = inputOccupation.value;

  closePopup();
}

inputEdit.addEventListener('submit', editProfile); 

//Opening and closing popup box section
const editProfileBtn = document.querySelector('.profile-info__edit');
const addElementBtn = document.querySelector('.profile__add');
const closePopupBtn = [...document.querySelectorAll('.popup-box__action_btn_close')];


function closePopup()
{
  popupBoxes.forEach((popupBox) => {
    popupBox.classList.remove('popup-box_opened');
  })
}

function openPopup(popupBox)
{
  popupBox.classList.add('popup-box_opened')
}

function openPopupEdit()
{
  openPopup(document.querySelector(".popup-box_type_edit"));

  inputName.value = name.textContent;
  inputOccupation.value = occupation.textContent;
}

function openPopupAdd()
{
  openPopup(document.querySelector(".popup-box_type_add"));
}

editProfileBtn.addEventListener('click', openPopupEdit);
addElementBtn.addEventListener('click', openPopupAdd);
closePopupBtn.forEach((closeBtn) => {
closeBtn.addEventListener('click', closePopup);
});


function createCard(nameValue, srcValue)
{
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector(".element__text").textContent = nameValue; //element title
  element.querySelector(".element__image").src = srcValue; //element image
  element.querySelector(".element__link").addEventListener("click", function (e) {
    document.querySelector(".popup-box__caption").textContent = nameValue;
    popupImageSrc.src = srcValue; //popup image
    popupImage.classList.add("popup-box_opened"); //open image popup when pressing image
  });
  element.querySelector(".element__like").addEventListener("click", function (e) {
  e.target.classList.toggle("element__like_active"); //toggle like button
  });
  element.querySelector(".element__remove").addEventListener("click", function (e) { 
    e.target.parentElement.remove(); //deconste element
  });

  return element;
}

function prependCard(nameValue, srcValue)
{
  elementsContainer.prepend(createCard(nameValue, srcValue));
}

 function addElement(e) {
  e.preventDefault();

  prependCard(title.value, src.value);

  title.value = "";
  src.value = "";

  closePopup();
};

inputAdd.addEventListener("submit", addElement);



//adding initial cards
function initCards()
{
  initialCards.forEach((element) =>
  {
    prependCard(element.name, element.link);
  });
}

initCards();

