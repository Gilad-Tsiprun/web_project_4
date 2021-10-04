import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector(".input");
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() { 
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }

    _getInputValues() {
        const textInputs = [...this._form.querySelectorAll('.input__text')];
        const inputValues = {};

        textInputs.forEach((input) => {
            inputValues[input.name] = input.value;
        })

        return inputValues;
    }
}