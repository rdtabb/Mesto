import "./index.css";
import { selectors, toggleButtonState } from "../components/validate";
import {PopupWithForm} from "../components/Popup.js";
import {
  selectors,
  enableValidation,
  toggleButtonState,
} from "../components/validate";
import renderCards from "../components/card";
import { createCard } from "../components/card";
import {
  showLoadingText,
  hideLoadingText,
  setUserData,
} from "../components/utils";
import {
  handleChangeUserData,
  handleGetUserData,
  handleChangeUserAvatar,
  handleAddCard,
  handleGetPosts,
} from "../api/api";
import FormValidate from "../components/validate";
// ------------------------------------------------------------------------------------------------------------
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
const formEditProfileLoadingButton =
  formEditProfile.querySelector(".popup__submit");
export const formAddCard = document.querySelector(".popup__form_addcard");
const formAddLoadingButton = formAddCard.querySelector(".popup__submit");
export const formEditAvatar = document.querySelector(".popup__form_avatar");
const formEditAvatarLoadingButton =
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
const avatarPopup = document.querySelector(".popup_avatar");
export const closeButtons = Array.from(
  document.querySelectorAll(".popup__close")
);
// ------------------------------------------------------------------------------------------------------------
Promise.all([handleGetPosts(), handleGetUserData()])
  .then(([postsData, userData]) => {
    setUserData(userData.about, userData.name, userData.avatar);
    renderCards(postsData, userData._id);
  })
  .catch((err) => console.log(err));

// ------------------------------------------------------------------------------------------------------------
//todo disable submit button onload


profileAvatar.addEventListener("click", () => {
    const popup = new PopupWithForm(avatarPopup, (e) => {
        e.preventDefault();
        showLoadingText(formEditAvatarLoadingButton);

        handleChangeUserAvatar(inputAvatar.value)
            .then((res) => {
                setUserData(res.about, res.name, res.avatar);
            })
            .then(() => {
                popup.close();
                formEditAvatar.reset();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                hideLoadingText(formEditAvatarLoadingButton);
            });
    });
    popup.open();
});

buttonEditProfile.addEventListener("click", () => {
    inputName.value = profileHeader.textContent;
    inputStatus.value = profileDescription.textContent;

    const popup = new PopupWithForm(profilePopup, (e) => {
        e.preventDefault();
        showLoadingText(formEditProfileLoadingButton);
        handleChangeUserData(inputName.value, inputStatus.value)
            .then((res) => {
                setUserData(res.about, res.name, res.avatar);
            })
            .then(() => {
                popup.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                hideLoadingText(formEditProfileLoadingButton);
            });
    });
    popup.open();
});

buttonAddCard.addEventListener("click", () => {
    const popup = new PopupWithForm(addCardPopup, (e) => {
        e.preventDefault();

        const inputList = Array.from(
            formAddCard.querySelectorAll(`${selectors.inputSelector}`)
        );
        const buttonElement = formAddCard.querySelector(
            `${selectors.submitButtonSelector}`
        );
        const card = {
            link: inputUrl.value,
            name: inputPlace.value,
        };
        showLoadingText(formAddLoadingButton);
        handleAddCard(card)
            .then((res) => {
                const card = createCard(res, res.owner._id);
                cardsSection.prepend(card);
            })
            .then(() => {
                formAddCard.reset();
                toggleButtonState(selectors, inputList, buttonElement);
                popup.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                hideLoadingText(formAddLoadingButton);
            });
    });
    popup.open();
});

// ------------------------------------------------------------------------------------------------------------
const validator = new FormValidate(selectors);
validator.enableValidation();
