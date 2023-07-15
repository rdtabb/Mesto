import "./index.css";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidate, { selectors } from "../components/FormValidate";
import Userinfo from "../components/Userinfo";
import Section from "../components/Section";
import UserCard from "../components/UserCard";
import DefaultCard from "../components/DefaultCard";
import Api, { config } from "../components/Api";
import {
  profileAvatar,
  cardsSection,
  buttonAddCard,
  buttonEditProfile,
  formEditAvatar,
  formEditProfile,
  formAddCard,
  inputName,
  inputStatus,
} from "../components/utils";

// ------------------------------------------------------------------------------------------------------------

const api = new Api(config);
const popupImage = new PopupWithImage(".popup_image");
const cardMethods = {
  handleLikeCard: api.handleLike.bind(api),
  handleUnlikeCard: api.handleUnlike.bind(api),
  handleDeleteCard: api.handleDeleteCard.bind(api),
  openImagePopup: popupImage.openImage.bind(popupImage),
};

const userInfoHandler = new Userinfo(api.handleGetUserData.bind(api));
await userInfoHandler.getSetUserInfo();
userInfoHandler.renderUserInfo();

const [postsData, userData] = await Promise.all([
  api.handleGetPosts(),
  api.handleGetUserData(),
]);
const feedSection = new Section(
  {
    data: postsData,
    renderer: (item) => {
      const card = userInfoHandler.checkId(userData._id, item.owner._id)
        ? new UserCard("#card-template", cardMethods, item, userData._id)
        : new DefaultCard("#card-template", cardMethods, item, userData._id);
      const generatedCard = card.generate();
      feedSection.setItem(generatedCard);
    },
  },
  ".cards",
);

feedSection.renderItems();

// ------------------------------------------------------------------------------------------------------------

const formEditProfileValidator = new FormValidate(formEditProfile, selectors);
formEditProfileValidator.validate();

const formEditAvatarValidator = new FormValidate(formEditAvatar, selectors);
formEditAvatarValidator.validate();

const formAddCardValidator = new FormValidate(formAddCard, selectors);
formAddCardValidator.validate();

const popupAvatar = new PopupWithForm(".popup_avatar", (e, inputValuesArr) => {
  e.preventDefault();
  popupAvatar.showLoadingText(popupAvatar.submitButton);
  api
    .handleChangeUserAvatar(inputValuesArr)
    .then(async () => {
      await userInfoHandler.getSetUserInfo();
      userInfoHandler.renderUserInfo();

      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatar.hideLoadingText(popupAvatar.submitButton);
    });
});

const popupProfile = new PopupWithForm(
  ".popup_profile",
  (e, inputValuesArr) => {
    e.preventDefault();
    popupProfile.showLoadingText(popupProfile.submitButton);
    api
      .handleChangeUserData(inputValuesArr)
      .then(async () => {
        await userInfoHandler.getSetUserInfo();
        userInfoHandler.renderUserInfo();

        popupProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupProfile.hideLoadingText(popupProfile.submitButton);
      });
  },
);

const popupAddCard = new PopupWithForm(
  ".popup_addcard",
  (e, inputValuesArr) => {
    e.preventDefault();

    popupAddCard.showLoadingText(popupAddCard.submitButton);

    api
      .handleAddCard(inputValuesArr)
      .then((res) => {
        const cardEl = new UserCard(
          "#card-template",
          cardMethods,
          res,
          res._id,
        );
        feedSection.prependNewCard(cardEl.generate());
      })
      .then(() => {
        formAddCard.reset();
        formAddCardValidator.toggleButtonState(
          popupAddCard.inputList,
          popupAddCard.submitButton,
        );
        popupAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddCard.hideLoadingText(popupAddCard.submitButton);
      });
  },
);

// ------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------

profileAvatar.addEventListener("click", () => {
  popupAvatar.open();
  popupAvatar.setEventListeners();
});

buttonEditProfile.addEventListener("click", () => {
  userInfoHandler.setInputValue(inputName, inputStatus);

  popupProfile.open();
  popupProfile.setEventListeners();
});

buttonAddCard.addEventListener("click", () => {
  popupAddCard.open();
  popupAddCard.setEventListeners();
});
