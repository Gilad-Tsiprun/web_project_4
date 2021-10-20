import Popup from './Popup.js';

export default class PopupWithlink extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open({ name, link }) {
        const linkElement = this._popup.querySelector(".popup-box__background");
        const captionElement = this._popup.querySelector(".popup-box__caption");

        linkElement.src = link;
        linkElement.alt = name;
        captionElement.textContent = name;

        super.open();
    }
}