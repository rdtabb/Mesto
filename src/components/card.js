import { openPopup } from "./modal";
import {
  templateElement,
  cardsSection,
  popupCaption,
  popupCover,
  imagePopup,
} from "../pages";
import { handleDeleteCard, handleLike, handleUnlike } from "../api/api";

function checkIfLiked(card, id) {
  return card.likes.some((like) => like._id == id);
}

function handleUpdateUIonLike(id, likeButton, number) {
  handleLike(id)
    .then((res) => {
      number.textContent = res.likes.length;
      likeButton.classList.add("card__like_true");
      likeButton.addEventListener("click", function unlikeEventHandler() {
        handleUpdateUIonUnlike(id, likeButton, number);
        this.removeEventListener("click", unlikeEventHandler);
      });
    })
    .catch((err) => console.log(err));
}

function handleUpdateUIonUnlike(id, likeButton, number) {
  handleUnlike(id)
    .then((res) => {
      number.textContent = res.likes.length;
      likeButton.classList.remove("card__like_true");
      likeButton.addEventListener("click", function likeEventHandler() {
        handleUpdateUIonLike(id, likeButton, number);
        this.removeEventListener("click", likeEventHandler);
      });
    })
    .catch((err) => console.log(err));
}

function addLikeHandler(liked, likeButton, id, number) {
  if (liked) {
    likeButton.classList.add("card__like_true");
    likeButton.addEventListener("click", function unlikeEventHandler() {
      handleUpdateUIonUnlike(id, likeButton, number);
      this.removeEventListener("click", unlikeEventHandler);
    });
  } else {
    likeButton.classList.remove("card__like_true");
    likeButton.addEventListener("click", function likeEventHandler() {
      handleUpdateUIonLike(id, likeButton, number);
      this.removeEventListener("click", likeEventHandler);
    });
  }
}

export function createCard(card, id) {
  const cardElement = templateElement?.content
    .querySelector(".card")
    ?.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikesNumber = cardElement.querySelector(".card__number");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__description").textContent = card.name;
  cardLikesNumber.textContent = card.likes.length;

  const liked = checkIfLiked(card, id);
  const likeButton = cardElement.querySelector(".card__like");
  addLikeHandler(liked, likeButton, card._id, cardLikesNumber);

  const deleteButton = cardElement.querySelector(".card__delete");
  if (card.owner._id == id) {
    deleteButton.addEventListener("click", () => {
      handleDeleteCard(card._id)
        .then(() => {
          const card = deleteButton.closest(".card");
          card.remove();
        })
        .catch((err) => console.log(err));
    });
  } else {
    deleteButton.remove();
  }

  cardImage.addEventListener("click", (e) => {
    const link = e.target.getAttribute("src");
    const alt = e.target.getAttribute("alt");
    popupCaption.textContent = card.name;
    popupCover.src = link;
    popupCover.alt = alt;
    openPopup(imagePopup);
  });
  return cardElement;
}

export function addCard(card, id) {
  const cardEl = createCard(card, id);
  cardsSection.append(cardEl);
}

export default function renderCards(posts, id) {
  posts.forEach((post) => {
    addCard(post, id);
  });
}
class Card {
  constructor(selector, card, openImagePopup, likeCard, deleteCard) {
    this._selector = selector;
    this._name = card.name;
    this._link = card.link;
    this._cardlikes = card.likes;
    this._owner = card.owner;
    this.openImagePopup = openImagePopup;
    this.likeCard = likeCard;
    this.deleteCard = deleteCard;
  }

  _getElement() {
    this._element = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._element;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector(".card__image");
    const cardDeleteButton = this._element.querySelector(".card__delete");
    const cardLikeButton = this._element.querySelector(".card__like");
    const cardLikesNumber = this._element.querySelector(".card__number");
    cardLikesNumber.textContent = this._cardlikes.length;
    cardLikeButton.addEventListener("click", this.likeCard);
    cardDeleteButton.addEventListener("click", this.deleteCard);
    cardImage.addEventListener("click", this.openImagePopup);
  }

  generate() {
    this._getElement();

    const cardImage = this._element.querySelector(".card__image");
    const cardLikesNumber = this._element.querySelector(".card__number");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardElement.querySelector(".card__description").textContent = this._name;
    cardLikesNumber.textContent = this._cardlikes.length;

    this._setEventListeners();

    return cardElement;
  }
}
