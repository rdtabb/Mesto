import "./index.css";
import { selectors, enableValidation, toggleButtonState } from "../components/validate";
import renderCards from "../components/card";
import { closePopup, openPopup } from "../components/modal";
import {
  handleChangeUserData,
  handleGetUserData,
  handleChangeUserAvatar,
  handleAddCard,
} from "../api/api";
// ------------------------------------------------------------------------------------------------------------
export const templateElement = document.querySelector("#card-template");
export const cardsSection = document.querySelector(".cards");
export const profileHeader = document.querySelector(".profile__header");
export const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");
export const popupCover = document.querySelector(".popup__cover");
export const popupCaption = document.querySelector(".popup__caption");
export const formEditProfile = document.querySelector(".popup__form_profile");
export const formAddCard = document.querySelector(".popup__form_addcard");
const formEditAvatar = document.querySelector(".popup__form_avatar");
export const inputUrl = document.querySelector(".popup__input_type_url");
export const inputPlace = document.querySelector(".popup__input_type_place");
export const inputName = document.querySelector(".popup__input_type_name");
export const inputStatus = document.querySelector(".popup__input_type_description");
export const inputAvatar = document.querySelector(".popup__input_type_avatar");
export const buttonEditProfile = document.querySelector(".profile__edit-button");
export const buttonAddCard = document.querySelector(".profile__add-button");
export const profilePopup = document.querySelector(".popup_profile");
export const addCardPopup = document.querySelector(".popup_addcard");
export const imagePopup = document.querySelector(".popup_image");
const avatarPopup = document.querySelector(".popup_avatar");
export const buttonsClose = Array.from(document.querySelectorAll(".popup__close"));
// ------------------------------------------------------------------------------------------------------------
renderCards();
handleGetUserData().then((data) => {
  profileDescription.textContent = data.about;
  profileHeader.textContent = data.name;
  profileAvatar.src = data.avatar;
});

// ------------------------------------------------------------------------------------------------------------
formAddCard.addEventListener("submit", (e) => {
  e.preventDefault();
  const addPopup = formAddCard.closest(".popup");
  const card = {
    link: inputUrl.value,
    name: inputPlace.value,
  };
  handleAddCard(card);
  closePopup(addPopup);
  formAddCard.reset();

  const inputList = Array.from(formAddCard.querySelectorAll(`${selectors.inputSelector}`));
  const buttonElement = formAddCard.querySelector(`${selectors.submitButtonSelector}`);
  toggleButtonState(selectors, inputList, buttonElement);
});


formEditProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  handleChangeUserData(inputName.value, inputStatus.value).then(() => {
    handleGetUserData().then((data) => {
      profileDescription.textContent = data.about;
      profileHeader.textContent = data.name;
      profileAvatar.src = data.avatar;
    });
  });
  const editPopup = formEditProfile.closest(".popup");
  closePopup(editPopup);
});


formEditAvatar.addEventListener("submit", (e) => {
  e.preventDefault();
  handleChangeUserAvatar(inputAvatar.value).then(() => {
    handleGetUserData().then((data) => {
      profileDescription.textContent = data.about;
      profileHeader.textContent = data.name;
      profileAvatar.src = data.avatar;
    });
  });
  inputAvatar.value = "";
  closePopup(avatarPopup);
});


profileAvatar.addEventListener("click", () => {
  openPopup(avatarPopup);
});


buttonEditProfile.addEventListener("click", () => {
  inputName.value = profileHeader.textContent;
  inputStatus.value = profileDescription.textContent;
  openPopup(profilePopup);
});


buttonAddCard.addEventListener("click", () => {
  openPopup(addCardPopup);
});


buttonsClose.forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(buttonsPopup));
});
// ------------------------------------------------------------------------------------------------------------
enableValidation(selectors);
