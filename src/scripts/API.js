const url = "https://around.nomoreparties.co/v1/group-12/users/me";
const key = "27cb3c49-bc49-41ab-86a1-13f7e0fb21a4"


export function getUserDataFromServer() {
    fetch(url, {
        method: "GET", // state the request method
        headers: {
            authorization: key
        }
    })
        .then(res => res.json())
        .then((result) => {
            return result;
        });
}

export class Api {
    constructor({ baseURL, headers }) {
        this._baseURL = baseURL;
        this._headers = headers;
    }

    getInitialCards = () => {
        return fetch(`${this._baseURL}/cards`, {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }
    getUserInfo = () => {
        return fetch(`${this._baseURL}/users/me`, {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }
    createCard = (data) => {
        return fetch(`${this._baseURL}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }

    deleteCard = (cardId) => {
        return fetch(`${this._baseURL}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }

    setUserInfo = ({ name, about }) => {
        return fetch(`${this._baseURL}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }

    setUserImage = (avatar) => {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }

    likeCard = (cardId) => {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'PUT'
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }

    unlikeCard = (cardId) => {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }
}
