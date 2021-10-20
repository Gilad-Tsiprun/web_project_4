import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup {
    setAction = (func) => {
        this._submitHandler = func;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector(".input").addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler();
        });
    }
}