const config = {
  base_url: `https://mesto.nomoreparties.co/v1/plus-cohort-25`,
  headers: {
    authorization: "5ee88334-f64d-4a57-bbca-c763324e5fde",
    "Content-Type": "application/json",
  },
};
function checkResponse(res) {
  if (!res.ok) return Promise.reject("Ошибка");
  return res.json();
}
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

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
  })
}

function handleAddCard(card) {
  return request(`${config.base_url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  })
}

function handleDeleteCard(id) {
  return request(`${config.base_url}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
}

function handleLike(id) {
  return request(`${config.base_url}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
}

function handleUnlike(id) {
  return request(`${config.base_url}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
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
