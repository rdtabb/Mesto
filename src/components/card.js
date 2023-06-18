import { openPopup } from "./modal";
import {
  templateElement,
  cardsSection,
  popupCaption,
  popupCover,
  imagePopup,
} from "../pages";
import {
  handleGetPosts,
  handleGetUserData,
  handleDeleteCard,
  handleLike,
  handleUnlike,
} from "../api/api";

function addLikeListeners(liked, likeButton, id) {
  if (liked) {
    likeButton.classList.add("card__like_true");
    likeButton.addEventListener("click", () => {
      handleUnlike(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    });
  } else {
    likeButton.classList.remove("card__like_true");
    likeButton.addEventListener("click", () => {
      handleLike(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    });
  }
}

export function createCard(card, id) {
  const cardElement = templateElement?.content
    .querySelector(".card")
    ?.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image")
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__description").textContent = card.name;
  cardElement.querySelector(".card__number").textContent = card.likes.length;

  const liked = card.likes.some((like) => like._id == id);
  const likeButton = cardElement.querySelector(".card__like")
  addLikeListeners(liked, likeButton, card._id)

  const deleteButton = cardElement.querySelector('.card__delete')
  if (card.owner._id == id) {
    deleteButton.addEventListener("click", () => {
      handleDeleteCard(card._id);
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
    addCard(post, id)
  })
}


