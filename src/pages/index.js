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
  avatarPopup,
  formEditAvatarLoadingButton,
  imagePopup,
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
} from "../components/utils";

// ------------------------------------------------------------------------------------------------------------

const validator = new FormValidate(selectors);
const api = new Api(config);
const popupImage = new PopupWithImage(imagePopup);
const cardMethods = {
  handleLikeCard: api.handleLike.bind(api),
  handleUnlikeCard: api.handleUnlike.bind(api),
  handleDeleteCard: api.handleDeleteCard.bind(api),
  openImagePopup: popupImage.openImagePopup.bind(popupImage),
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
                userData._id
              );
          const generatedCard = card.generate();
          cardsSection.setItem(generatedCard);
        },
      },
      ".cards"
    );

    cardsSection.renderItems();
  })
  .catch((err) => console.log(err));

// ------------------------------------------------------------------------------------------------------------

profileAvatar.addEventListener("click", () => {
  const popup = new PopupWithForm(avatarPopup, (e) => {
    e.preventDefault();
    popup.showLoadingText(formEditAvatarLoadingButton);
    api
      .handleChangeUserAvatar(inputAvatar.value)
      .then((res) => {
        userInfoHandler.setUserInfo(res);
        popup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popup.hideLoadingText(formEditAvatarLoadingButton);
      });
  });
  popup.open();
});

buttonEditProfile.addEventListener("click", () => {
  inputName.value = profileHeader.textContent;
  inputStatus.value = profileDescription.textContent;
  const popup = new PopupWithForm(profilePopup, (e) => {
    e.preventDefault();
    popup.showLoadingText(formEditProfileLoadingButton);
    api
      .handleChangeUserData(inputName.value, inputStatus.value)
      .then((res) => {
        userInfoHandler.setUserInfo(res);
        popup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popup.hideLoadingText(formEditProfileLoadingButton);
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

    popup.showLoadingText(formAddLoadingButton);

    api
      .handleAddCard(card)
      .then((res) => {
        const cardEl = new UserCard(
          "#card-template",
          cardMethods,
          res,
          res._id
        );
        const generatedCard = cardEl.generate();
        cardsSection.prepend(generatedCard);
      })
      .then(() => {
        formAddCard.reset();
        validator.toggleButtonState(inputList, buttonElement);
        popup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popup.hideLoadingText(formAddLoadingButton);
      });
  });
  popup.open();
});

// ------------------------------------------------------------------------------------------------------------

validator.enableValidation();
