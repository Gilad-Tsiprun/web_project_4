export default class UserInfo { 
    constructor({ nameSelector, aboutSelector }) {
        this._nameSelector = nameSelector;
        this._aboutSelector = aboutSelector;
        this._name = document.querySelector(this._nameSelector);
        this._about = document.querySelector(this._aboutSelector);
    }

    getUserInfo = () => { 
        return { name: this._name.textContent, about: this._about.textContent };
    }

    setUserInfo({ name, about }) {
        this._name.textContent = name;
        this._about.textContent = about;
    }
}