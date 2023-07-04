import { profileDescription, profileHeader, profileAvatar } from "../pages";

export function showLoadingText(element) {
  element.textContent = "Сохраняется...";
}

export function setUserData(about, name, avatar) {
  profileDescription.textContent = about;
  profileHeader.textContent = name;
  profileAvatar.src = avatar;
}

export function hideLoadingText(element) {
  element.textContent = "Cохранить";
}

function checkResponse(res) {
  if (!res.ok) return Promise.reject(`Ошибка ${res.status}`);
  return res.json();
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

class UserInfo {
  constructor(selector, selector2) {
    this.username = username;
    this.status = status;
    this.avatar = avatar;
  }

  getUserInfo() {
    profileDescription.textContent = this.status;
    profileHeader.textContent = this.username;
    profileAvatar.src = this.avatar;
  }
}

