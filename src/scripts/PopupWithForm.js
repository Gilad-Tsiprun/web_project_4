import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector(".input");
        this._submitBtn = this._form.querySelector(".popup-box__action_submit");
        this._submitBtnContent = this._submitBtn.textContent;
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }

    showLoadingProgress = () => {
        this._submitBtn.textContent = "Saving...";
    }

    onLoadFinish = () => {
        this._submitBtn.textContent = this._submitBtnContent;
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