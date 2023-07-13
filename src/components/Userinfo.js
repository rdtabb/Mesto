export default class Userinfo {
  constructor(getUserData) {
    this._getUserData = getUserData;
    this._profileHeader = document.querySelector(".profile__header");
    this._profileDescription = document.querySelector(".profile__description");
    this._profileAvatar = document.querySelector(".profile__avatar");
  }

  async getUserInfo() {
    return await this._getUserData();
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
