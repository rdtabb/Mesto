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
  inputStatus,
  inputName,
  profileDescription,
  profileHeader,
  buttonEditProfile,
  formEditAvatar,
  formEditProfile,
  formAddCard,
} from "../components/utils";

// ------------------------------------------------------------------------------------------------------------

const formEditProfileValidator = new FormValidate(formEditProfile, selectors);
formEditProfileValidator.validate();

const formEditAvatarValidator = new FormValidate(formEditAvatar, selectors);
formEditAvatarValidator.validate();

const formAddCardValidator = new FormValidate(formAddCard, selectors);
formAddCardValidator.validate();

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
const user = await userInfoHandler.getUserInfo();
userInfoHandler.setUserInfo(user);

Promise.all([api.handleGetPosts(), api.handleGetUserData()])
  .then(([postsData, userData]) => {
    const cardsSection = new Section(
      {
        data: postsData,
        renderer: (item) => {
          const card = userInfoHandler.checkId(userData._id, item.owner._id)
            ? new UserCard("#card-template", cardMethods, item, userData._id)
            : new DefaultCard(
                "#card-template",
                cardMethods,
                item,
                userData._id,
              );
          const generatedCard = card.generate();
          cardsSection.setItem(generatedCard);
        },
      },
      ".cards",
    );

    cardsSection.renderItems();
  })
  .catch((err) => console.log(err));

// ------------------------------------------------------------------------------------------------------------

profileAvatar.addEventListener("click", () => {
  const popup = new PopupWithForm(".popup_avatar", (e, inputValuesArr) => {
    e.preventDefault();
    popup.showLoadingText(popup.submitButton);
    api
      .handleChangeUserAvatar(inputValuesArr)
      .then((res) => {
        userInfoHandler.setUserInfo(res);
        popup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popup.hideLoadingText(popup.submitButton);
      });
  });

  popup.open();
  popup.setEventListeners();
});

buttonEditProfile.addEventListener("click", () => {
  inputName.value = profileHeader.textContent;
  inputStatus.value = profileDescription.textContent;

  const popup = new PopupWithForm(".popup_profile", (e, inputValuesArr) => {
    e.preventDefault();
    popup.showLoadingText(popup.submitButton);
    api
      .handleChangeUserData(inputValuesArr)
      .then((res) => {
        userInfoHandler.setUserInfo(res);
        popup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popup.hideLoadingText(popup.submitButton);
      });
  });

  popup.open();
  popup.setEventListeners();
});

buttonAddCard.addEventListener("click", () => {
  const popup = new PopupWithForm(".popup_addcard", (e, inputValuesArr) => {
    e.preventDefault();

    popup.showLoadingText(popup.submitButton);

    api
      .handleAddCard(inputValuesArr)
      .then((res) => {
        const cardEl = new UserCard(
          "#card-template",
          cardMethods,
          res,
          res._id,
        );
        const generatedCard = cardEl.generate();
        cardsSection.prepend(generatedCard);
      })
      .then(() => {
        formAddCard.reset();
        formAddCardValidator.toggleButtonState(
          popup.inputList,
          popup.submitButton,
        );
        popup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popup.hideLoadingText(popup.submitButton);
      });
  });

  popup.open();
  popup.setEventListeners();
});
