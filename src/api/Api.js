import { request } from "../components/utils";

export const config = {
  base_url: `https://mesto.nomoreparties.co/v1/plus-cohort-25`,
  headers: {
    authorization: "5ee88334-f64d-4a57-bbca-c763324e5fde",
    "Content-Type": "application/json",
  },
};

// ----------------------------------------------------------------------------------------------------

function handleGetPosts() {
  return request(`${config.base_url}/cards`, {
    headers: config.headers,
  });
}

function handleGetUserData() {
  return request(`${config.base_url}/users/me`, {
    headers: config.headers,
  });
}

function handleChangeUserData(name, about) {
  return request(`${config.base_url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
}

function handleChangeUserAvatar(avatar) {
  return request(`${config.base_url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  });
}

function handleAddCard(card) {
  return request(`${config.base_url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  });
}

function handleDeleteCard(id) {
  return request(`${config.base_url}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

function handleLike(id) {
  return request(`${config.base_url}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  });
}

function handleUnlike(id) {
  return request(`${config.base_url}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export {
  handleAddCard,
  handleGetPosts,
  handleGetUserData,
  handleChangeUserData,
  handleChangeUserAvatar,
  handleDeleteCard,
  handleLike,
  handleUnlike,
};

export class Api {
  constructor({ base_url, headers }) {
    this._base_url = base_url;
    this._headers = headers;
  }
//todo rename to parseResponse
  _checkResponse(res) {
    if (!res.ok) return Promise.reject(`Ошибка ${res.status}`);
    return res.json();
  }
//todo rename to _fetch
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

// ApiHandler.handleGetPosts().then((res) => render(res))

// 1. Api
// 2. Popup, PopupWithForm, PopupWithImage
// 3. класс FormValidate
// 4. UserInfo выяснить что тут надо
// 5. Card
// 6. Section
