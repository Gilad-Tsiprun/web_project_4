import { openPopup, popupImage, popupImageSrc, popupCaption } from './utilities.js';

class Card {
  constructor({ title, image }, templateCardSelector, handleCardClick) {
    this._title = title;
    this._image = image;
    this._templateCardSelector = templateCardSelector;
    this._handleCardClick = handleCardClick;

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

  _setEventListeners() {
    this._element.querySelector(".element__like").addEventListener("click", (e) => this._handleLike(e)); //toggle like
    this._element.querySelector(".element__remove").addEventListener("click", (e) => this._handleRemove(e)); //delete element
    this._element.querySelector(".element__link").addEventListener("click", () => this._handleCardClick()); //open popup image
  }
  
  generateCard() {
    this._element = this._cardTemplate.cloneNode(true);
    this._elementImage = this._element.querySelector(".element__image");

    this._setEventListeners(); // call the _setEventListeners
  
    this._elementImage.src = this._image;
    this._elementImage.alt = this._title; 
    this._element.querySelector(".element__text").textContent = this._title;
  
    return this._element;
  }
}

export default Card;