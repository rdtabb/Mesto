export const config = {
  base_url: `https://mesto.nomoreparties.co/v1/plus-cohort-25`,
  headers: {
    authorization: "5ee88334-f64d-4a57-bbca-c763324e5fde",
    "Content-Type": "application/json",
  },
};

export default class Api {
  constructor({ base_url, headers }) {
    this._base_url = base_url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (!res.ok) return Promise.reject(`Ошибка ${res.status}`);
    return res.json();
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  handleGetPosts() {
    return this._request(`${this._base_url}/cards`, {
      headers: this._headers,
    });
  }

  handleGetUserData() {
    return this._request(`${this._base_url}/users/me`, {
      headers: this._headers,
    });
  }

  handleChangeUserData(name, about) {
    return this._request(`${this._base_url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  handleChangeUserAvatar(avatar) {
    return this._request(`${this._base_url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  handleAddCard(card) {
    return this._request(`${this._base_url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }

  handleDeleteCard(id) {
    return this._request(`${this._base_url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  handleLike(id) {
    return this._request(`${this._base_url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  handleUnlike(id) {
    return this._request(`${this._base_url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
