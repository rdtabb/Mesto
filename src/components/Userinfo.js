export default class Userinfo {
  constructor(getUserData) {
    this._getUserData = getUserData;
    this._profileHeader = document.querySelector(".profile__header");
    this._profileDescription = document.querySelector(".profile__description");
    this._profileAvatar = document.querySelector(".profile__avatar");
  }

  async getSetUserInfo() {
    const userData = await this._getUserData();
    this._name = userData.name;
    this._about = userData.about;
    this._avatar = userData.avatar;
  }

  renderUserInfo() {
    this._profileHeader.textContent = this._name;
    this._profileDescription.textContent = this._about;
    this._profileAvatar.src = this._avatar;
  }

  setInputValue(nameInput, aboutInput) {
    nameInput.value = this._name;
    aboutInput.value = this._about;
  }

  checkId(userId, id) {
    return userId === id;
  }
}
