export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._openedPopupClass = 'popup-box_opened';
    }

    
    _handleEscClose = (e) => {
        if (e.key === "Escape") { //ESC
            this.close();
        }
    }

    open() {
        document.addEventListener("keydown", this._handleEscClose);
        this._popup.classList.add(this._openedPopupClass);
    }

    close() {
        document.removeEventListener("keydown", this._handleEscClose);
        this._popup.classList.remove(this._openedPopupClass);
    }

    setEventListeners() {
        this._popup.querySelector('.popup-box__action_btn_close').addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (e) => { 
            if (e.target === document.querySelector(".popup-box_opened"))
            {
              this.close();
            }
        })
    }
}