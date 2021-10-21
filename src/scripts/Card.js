class Card {
  constructor(data, templateCardSelector, handleCardClick, handleRemove, handleLike, userId) {
    this._name = data.name;
    this._link = data.link;
    this._templateCardSelector = templateCardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemove = handleRemove;
    this._handleLike = handleLike;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;

    this._cardTemplate = document
      .querySelector(this._templateCardSelector)
      .content
      .querySelector(".element"); //card template
  }

  removeCard() {
    this._element.remove(); //delete element

    this._element = null;
  }

  renderLikes = (updatedLikes) => {
    this._likes = updatedLikes;
    this._updateLikesCount();

    if (this.isLikedByUser()) {
      this._likeBtn.classList.add("element__like_active")
    }
    else {
      this._likeBtn.classList.remove("element__like_active")
    }
  }

  isLikedByUser() {
    return this._likes.some(user => user._id === this._userId)
  }

  _setEventListeners = () => {
    this._deleteBtn = this._element.querySelector(".element__remove");
    this._likeBtn = this._element.querySelector(".element__like");

    this._likeBtn.addEventListener("click", () => this._handleLike(this._id)); //toggle like
    this._deleteBtn.addEventListener("click", () => this._handleRemove(this._id)); //delete element
    this._element.querySelector(".element__link").addEventListener("click", () => this._handleCardClick()); //open popup link
  }

  _updateLikesCount = () => {
    this._element.querySelector(".element__like-count").textContent = this._likes.length;
  }

  generateCard = () => {
    this._element = this._cardTemplate.cloneNode(true);
    this._elementImage = this._element.querySelector(".element__image");

    this._setEventListeners(); // call the _setEventListeners

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;

    if (this._ownerId !== this._userId) {
      this._deleteBtn.style.display = "none";
    }



    this.renderLikes(this._likes);

    return this._element;
  }
}

export default Card;