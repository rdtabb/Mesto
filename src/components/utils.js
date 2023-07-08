import { Api, config } from "../api/Api.js";
import {PopupWithImage} from "./PopupWithImage";

export const templateElement = document.querySelector("#card-template");
export const cardsSection = document.querySelector(".cards");
export const profileHeader = document.querySelector(".profile__header");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileAvatar = document.querySelector(".profile__avatar");
export const popupCover = document.querySelector(".popup__cover");
export const popupCaption = document.querySelector(".popup__caption");
export const formEditProfile = document.querySelector(".popup__form_profile");
export const formEditProfileLoadingButton =
  formEditProfile.querySelector(".popup__submit");
export const formAddCard = document.querySelector(".popup__form_addcard");
export const formAddLoadingButton = formAddCard.querySelector(".popup__submit");
export const formEditAvatar = document.querySelector(".popup__form_avatar");
export const formEditAvatarLoadingButton =
  formEditAvatar.querySelector(".popup__submit");
export const inputUrl = document.querySelector(".popup__input_type_url");
export const inputPlace = document.querySelector(".popup__input_type_place");
export const inputName = document.querySelector(".popup__input_type_name");
export const inputStatus = document.querySelector(
  ".popup__input_type_description"
);
export const inputAvatar = document.querySelector(".popup__input_type_avatar");
export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonAddCard = document.querySelector(".profile__add-button");
export const profilePopup = document.querySelector(".popup_profile");
export const addCardPopup = document.querySelector(".popup_addcard");
export const imagePopup = document.querySelector(".popup_image");
export const avatarPopup = document.querySelector(".popup_avatar");

export const api = new Api(config);

export const additionalCardMethods = {
  handleLikeCard: api.handleLike,
  handleDeleteCard: api.handleDeleteCard,
  _openImagePopup: PopupWithImage.prototype.open,
}
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
