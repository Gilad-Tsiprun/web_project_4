import { openPopup, popupImage, popupImageSrc, popupCaption } from './utilities.js';

class Card {
  constructor({ title, image }, templateCardSelector) {
    this._title = title;
    this._image = image;
    this._templateCardSelector = templateCardSelector;

    this._cardTemplate = document
    .querySelector(this._templateCardSelector)
    .content
    .querySelector(".element"); //card template
  }

  _handleLike(e) {
    e.target.classList.toggle("element__like_active"); //toggle like button
  }

  _handleRemove(e) { 
    e.target.parentElement.remove(); //delete element
  }

  _handleOpenImage() {
    popupCaption.textContent = this._title; //popup caption
    popupImageSrc.src = this._image; //popup image
    popupImageSrc.alt = this._title; //popup alternative text
    openPopup(popupImage); //open image popup when pressing image
  }

  _setEventListeners() {
    this._element.querySelector(".element__like").addEventListener("click", this._handleLike); //toggle like
    this._element.querySelector(".element__remove").addEventListener("click", this._handleRemove); //delete element
    this._element.querySelector(".element__link").addEventListener("click", () => this._handleOpenImage()); //open popup image
  }
  
  generateCard() {
    this._element = this._cardTemplate.cloneNode(true);

    this._setEventListeners(); // call the _setEventListeners
  
    this._element.querySelector(".element__image").src = this._image;
    this._element.querySelector(".element__image").alt = this._title; 
    this._element.querySelector(".element__text").textContent = this._title;
  
    return this._element;
  }
}

export default Card;