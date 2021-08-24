/*const container = document.querySelector(".container");
const songsContainer = container.querySelector(".songs-container");
const addButton = container.querySelector(".input__btn_action_add");
const resetButton = container.querySelector(".input__btn_action_reset");
const noSongsElement = container.querySelector(".no-songs");

function renderHasSongs() {
  resetButton.removeAttribute("disabled");
  resetButton.classList.remove("input__btn_disabled");
  noSongsElement.classList.add("no-songs_hidden");
}

function renderNoSongs() {
  resetButton.setAttribute("disabled", true);
  resetButton.classList.add("input__btn_disabled");
  noSongsElement.classList.remove("no-songs_hidden");
}

function addSong(artistValue, titleValue) {
  const songTemplate = document.querySelector("#song-template").content;
  const element = songTemplate.querySelector('.song').cloneNode(true);

  element.querySelector(".song__artist").textContent = artistValue;
  element.querySelector(".song__title").textContent = titleValue;
  element.querySelector(".song__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("song__like_active");
});
  // add element Name of the song
  songsContainer.append(element);
}

addButton.addEventListener("click", function () {
  const artist = document.querySelector(".input__text_type_artist");
  const title = document.querySelector(".input__text_type_title");

  addSong(artist.value, title.value);
  renderHasSongs();

  artist.value = "";
  title.value = "";
});

resetButton.addEventListener("click", function () {
  const songs = document.querySelectorAll(".song")

  songs.forEach((item) => {
    item.remove();
  });*/

import { initialCards } from './scripts/initCards.js';

const popupBox = document.querySelector('.popup-box');
const popupEdit = document.querySelector('.popup-box__container_type_edit');
const popupAdd = document.querySelector('.popup-box__container_type_add');
const input = popupBox.querySelector('.input');
const inputEdit = popupBox.querySelector('.input_edit');
const inputAdd = popupBox.querySelector('.input_add');
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile-info');
const elementsContainer = document.querySelector(".elements__list");


function addCard(nameValue, srcValue)
{
    const elementTemplate = document.querySelector("#element-template").content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);
  
    element.querySelector(".element__text").textContent = nameValue;
    element.querySelector(".element__image").src = srcValue;  
    element.querySelector(".element__like").addEventListener("click", function (e) {
    e.target.classList.toggle("element__like_active");
    });

    elementsContainer.prepend(element);
}

 function addElement(e) {
   e.preventDefault();

  const name = document.querySelector(".input__text_type_title");
  const src = document.querySelector(".input__text_type_image");

  addCard(name.value, src.value);

  name.value = "";
  src.value = "";

  closePopup();
};

inputAdd.addEventListener("submit", addElement);

//Editing and saving profile section

function editProfile(e) {
    e.preventDefault();

    let inputName = input.querySelector('.input__text_type_name').value;
    let inputOccupation = input.querySelector('.input__text_type_occupation').value;
    let name = profileInfo.querySelector('.profile-info__full-name');
    let occupation = profileInfo.querySelector('.profile-info__occupation');

    name.textContent = inputName;
    occupation.textContent = inputOccupation;

    closePopup();
}

inputEdit.addEventListener('submit', editProfile); 

//Opening and closing popup box section
let editProfileBtn = document.querySelector('.profile-info__edit');
let addElementBtn = document.querySelector('.profile__add');
let closePopupBtn = [...document.querySelectorAll('.popup-box__action_btn_close')];


function closePopup()
{
    popupBox.classList.remove('popup-box_opened');
    popupEdit.classList.remove('popup-box__container_opened');
    popupAdd.classList.remove('popup-box__container_opened');
}

function openPopup()
{
  popupBox.classList.add('popup-box_opened');
}

function openPopupEdit()
{
    openPopup()
    popupEdit.classList.add('popup-box__container_opened');
    
    let inputName = input.querySelector('.input__text_type_name');
    let inputOccupation = input.querySelector('.input__text_type_occupation');
    let name = profileInfo.querySelector('.profile-info__full-name').textContent;
    let occupation = profileInfo.querySelector('.profile-info__occupation').textContent;

    inputName.value = name;
    inputOccupation.value = occupation;
}

function openPopupAdd()
{
  openPopup()
  popupAdd.classList.add('popup-box__container_opened');
}

editProfileBtn.addEventListener('click', openPopupEdit);
addElementBtn.addEventListener('click', openPopupAdd);
closePopupBtn.forEach((closeBtn) => {
  closeBtn.addEventListener('click', closePopup);
});

//adding initial cards
function initCards()
{
  initialCards.forEach((element) =>
  {
    addCard(element.name, element.link);
  });
}

initCards();

