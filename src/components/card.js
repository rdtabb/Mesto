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

let id;
handleGetUserData().then((data) => {
  id = data._id;
});


export function createCard(card) {
  const cardElement = templateElement?.content
    .querySelector(".card")
    ?.cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__description").textContent = card.name;
  cardElement.querySelector(".card__number").textContent = card.likes.length;

  card.likes.forEach((like) => {
    if (like._id == id) {
      cardElement.querySelector('.card__like').classList.add('card__like_true')
      cardElement.querySelector('.card__like').addEventListener('click', () => {
        handleUnlike(card._id)
      })
    } else {
      cardElement.querySelector('.card__like').classList.remove('card__like_true')
      cardElement.querySelector('.card__like').addEventListener('click', () => {
        handleLike(card._id)
      })
    }
  })

  if (card.owner._id == id) {
    cardElement.querySelector(".card__delete").addEventListener("click", () => {
      handleDeleteCard(card._id);
    });
  } else {
    cardElement.querySelector(".card__delete").remove();
  }

  cardElement.querySelector(".card__image").addEventListener("click", (e) => {
    const link = e.target.getAttribute("src");
    const alt = e.target.getAttribute("alt");
    popupCaption.textContent = card.name;
    popupCover.src = link;
    popupCover.alt = alt;
    openPopup(imagePopup);
  });
  return cardElement;
}

export default function renderCards() {
  handleGetPosts().then((data) => {
    data.forEach((el) => {
      const card = createCard(el);
      cardsSection.append(card);
    });
  });
}
