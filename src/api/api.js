const ME_ID = "5ee88334-f64d-4a57-bbca-c763324e5fde";
const GROUP_ID = "plus-cohort-25";
const BASE_URL = `https://mesto.nomoreparties.co/v1/${GROUP_ID}`;

function handleGetPosts() {
  try {
    return fetch(`${BASE_URL}/cards`, {
      headers: {
        authorization: ME_ID,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
}
function handleGetUserData() {
  try {
    return fetch(`${BASE_URL}/users/me`, {
      headers: {
        authorization: ME_ID,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          Promise.reject('buddy you nuts?')
        };
        return res.json()
      })
  } catch (err) {
    console.log(err);
  }
}
async function handleChangeUserData(name, about) {
  try {
    await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: ME_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}
async function handleChangeUserAvatar(avatar) {
  try {
    await fetch(`${BASE_URL}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: ME_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}
function handleAddCard(card) {
  try {
    return fetch(`${BASE_URL}/cards`, {
      method: "POST",
      headers: {
        authorization: ME_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  } catch (err) {
    console.log(err);
  }
}
function handleDeleteCard(id) {
  try {
    return fetch(`${BASE_URL}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: ME_ID,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
  } catch(err) {
    console.log(err)
  }
}

export {
  handleAddCard,
  handleGetPosts,
  handleGetUserData,
  handleChangeUserData,
  handleChangeUserAvatar,
  handleDeleteCard
};
