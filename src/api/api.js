import renderCards from "../components/card";
import clearCardsSection from "../components/utils";

const config = {
  base_url: `https://mesto.nomoreparties.co/v1/plus-cohort-25`,
  headers: {
    authorization: "5ee88334-f64d-4a57-bbca-c763324e5fde",
    "Content-Type": "application/json",
  },
};

function handleGetPosts() {
  try {
    return fetch(`${config.base_url}/cards`, {
      headers: config.headers,
    })
      .then((res) => {
        if (!res.ok) return Promise.reject("Error");
        return res.json();
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
}
function handleGetUserData() {
  try {
    return fetch(`${config.base_url}/users/me`, {
      headers: config.headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject("Error");
      }
      return res.json();
    });
  } catch (err) {
    console.log(err);
  }
}
function handleChangeUserData(name, about) {
  try {
    return fetch(`${config.base_url}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (!res.ok) return Promise.reject("Ошибка");
      return res.json();
    });
  } catch (err) {
    console.log(err);
  }
}
function handleChangeUserAvatar(avatar) {
  try {
    return fetch(`${config.base_url}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      if (!res.ok) return Promise.reject("Ошибка");
      return res.json();
    });
  } catch (err) {
    console.log(err);
  }
}
function handleAddCard(card) {
  try {
    return fetch(`${config.base_url}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then((res) => {
        if (!res.ok) return Promise.reject("Ошибка");
        return res.json();
      })
      .then(() => {
        renderCards();
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
}
function handleDeleteCard(id) {
  try {
    return fetch(`${config.base_url}/cards/${id}`, {
      method: "DELETE",
      headers: config.headers,
    })
      .then((res) => {
        if (!res.ok) return Promise.reject("Ошибка");
        return res.json();
      })
      .then(() => {
        renderCards();
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
}
function handleLike(id) {
  try {
    return fetch(`${config.base_url}/cards/likes/${id}`, {
      method: "PUT",
      headers: config.headers,
    })
      .then((res) => {
        if (!res.ok) return Promise.reject("Ошибка");
        return res.json();
      })
      .then(() => {
        renderCards();
      });
  } catch (err) {
    console.log(err);
  }
}
function handleUnlike(id) {
  try {
    return fetch(`${config.base_url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: config.headers,
    })
      .then((res) => {
        if (!res.ok) return Promise.reject("Ошибка");
        return res.json();
      })
      .then(() => {
        renderCards();
      });
  } catch (err) {
    console.log(err);
  }
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
