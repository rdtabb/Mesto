import "./index.css";
import { PopupWithForm } from "../components/PopupWithForm.js";
import FormValidate from "../components/validate";
import { selectors, toggleButtonState } from "../components/validate";
import renderCards from "../components/card";
import { createCard } from "../components/card";
import {
  showLoadingText,
  hideLoadingText,
  setUserData,
  profileAvatar,
  avatarPopup,
  formEditAvatarLoadingButton,
  inputAvatar,
  formAddLoadingButton,
  formAddCard,
  cardsSection,
  inputPlace,
  inputUrl,
  addCardPopup,
  buttonAddCard,
  formEditProfileLoadingButton,
  inputStatus,
  inputName,
  profilePopup,
  profileDescription,
  profileHeader,
  buttonEditProfile,
  formEditAvatar,
  api,
  additionalCardMethods,
} from "../components/utils";
import Userinfo from "../components/Userinfo";
import Section from "../components/Section";
import UserCard from "../components/UserCard";
import {DefaultCard} from "../components/DefaultCard";
// ------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------
Promise.all([api.handleGetPosts(), api.handleGetUserData()])
  .then(([postsData, userData]) => {
    setUserData(userData.about, userData.name, userData.avatar);
    renderCards(postsData, userData._id);

    const user = new Userinfo(userData);
    user.setUserInfo();
    const cardsSection = new Section(
      {
        data: postsData,
        renderer: (item) => {
          const card = user.checkId(item.owner._id)
              ? new UserCard('#card-template', item._id, additionalCardMethods, item)
              : new DefaultCard('#card-template', item._id, additionalCardMethods, item)

          const generatedCard = card.generate()

          cardsSection.setItem(generatedCard);
        },
      },
      ".cards"
    );

    cardsSection.renderItems();
  })
  .catch((err) => console.log(err));

// ------------------------------------------------------------------------------------------------------------
//todo disable submit button onload
//todo бахнуть тень на мусорку
// rename Card class file
profileAvatar.addEventListener("click", () => {
  const popup = new PopupWithForm(avatarPopup, (e) => {
    e.preventDefault();
    showLoadingText(formEditAvatarLoadingButton);

    api
      .handleChangeUserAvatar(inputAvatar.value)
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

    api
      .handleChangeUserData(inputName.value, inputStatus.value)
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

    api
      .handleAddCard(card)
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
