export default class Userinfo {
  constructor(getUserData) {
    this._getUserData = getUserData;
    this._profileHeader = document.querySelector(".profile__header");
    this._profileDescription = document.querySelector(".profile__description");
    this._profileAvatar = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    this._getUserData().then((res) => {
      console.log(res);
      return {
        name: res.name,
        about: res.about,
        avatar: res.avatar,
        id: res._id,
      };
    });
  }

  setUserInfo({ name, about, avatar }) {
    this._profileHeader.textContent = name;
    this._profileDescription.textContent = about;
    this._profileAvatar.src = avatar;
  }

  checkId(userId, id) {
    return userId === id;
  }
}
