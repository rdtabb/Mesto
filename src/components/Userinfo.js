export default class Userinfo {
  constructor(getUserData) {
    this._getUserData = getUserData;
    this._profileHeader = document.querySelector(".profile__header");
    this._profileDescription = document.querySelector(".profile__description");
    this._profileAvatar = document.querySelector(".profile__avatar");
  }

  _setUserInfo({ name, avatar, about }) {
    this._name = name;
    this._avatar = avatar;
    this._about = about;
  }

  async getUserInfo() {
    const userData = await this._getUserData();
    this._setUserInfo(userData);
    return userData;
  }

  renderUserInfo({ name, about, avatar }) {
    this._profileHeader.textContent = name;
    this._profileDescription.textContent = about;
    this._profileAvatar.src = avatar;
  }

  setInputValue(nameInput, aboutInput) {
    nameInput.value = this._name;
    aboutInput.value = this._about;
  }

  checkId(userId, id) {
    return userId === id;
  }
}
