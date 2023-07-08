// const selectors = {
//   name: 'profile__header',
//   status: 'profile__description',
//   avatar: 'profile__avatar'
// }
export default class Userinfo {
  constructor({ name, status, id, avatar }, selectors) {
    this._name = name;
    this._status = status;
    this._avatar = avatar;
    this._id = id;
    this._selectorsObj = selectors;
  }

  setUserInfo() {
    document.querySelector(this._selectorsObj.name).textContent = this._name;
    document.querySelector(this._selectorsObj.status).textContent =
      this._status;
    document.querySelector(this._selectorsObj.avatar).src = this._avatar;
  }

  checkId(id) {
    return this._id === id;
  }
}
