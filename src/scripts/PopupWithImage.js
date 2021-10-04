import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open({ title, image }) {
        const imageElement = this._popup.querySelector(".popup-box__background");
        const captionElement = this._popup.querySelector(".popup-box__caption");

        imageElement.src = image;
        imageElement.alt = title;
        captionElement.textContent = title;

        super.open();
    }
}