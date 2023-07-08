// const selectors = {
//   name: 'profile__header',
//   status: 'profile__description',
//   avatar: 'profile__avatar'
// }
export default class Userinfo {
  constructor({ name, status, id, avatar }) {
    this._name = name;
    this._status = status;
    this._avatar = avatar;
    this._id = id;
  }

  setUserInfo() {
    document.querySelector('.profile__header').textContent = this._name;
    document.querySelector('.profile__description').textContent = this._status;
    document.querySelector('.profile__avatar').src = this._avatar;
  }

  checkId(id) {
    return this._id === id;
  }
}
