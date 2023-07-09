export default class Userinfo {
  constructor({ name, about, _id, avatar }) {
    this._name = name;
    this._status = about;
    this._avatar = avatar;
    this._id = _id;
  }

  setUserInfo() {
    document.querySelector(".profile__header").textContent = this._name;
    document.querySelector(".profile__description").textContent = this._status;
    document.querySelector(".profile__avatar").src = this._avatar;
  }

  checkId(id) {
    return this._id === id;
  }
}
