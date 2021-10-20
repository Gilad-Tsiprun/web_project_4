export default class UserInfo {
    constructor({ nameSelector, occupationSelector, avatarSelector }) {
        this._nameSelector = nameSelector;
        this._occupationSelector = occupationSelector;
        this._avatarSelector = avatarSelector;
        this._name = document.querySelector(this._nameSelector);
        this._occupation = document.querySelector(this._occupationSelector);
        this._avatar = document.querySelector(this._avatarSelector);
    }

    getUserInfo = () => {
        return { name: this._name.textContent, occupation: this._occupation.textContent, avatar: this._avatar.src };
    }

    setUserInfo({ fullName, occupation }) {
        this._name.textContent = fullName;
        this._occupation.textContent = occupation;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
}