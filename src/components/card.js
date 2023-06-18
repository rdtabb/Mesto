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
      likeButton.addEventListener("click", () => {
        handleUpdateUIonUnlike(id, likeButton, number);
      });
    })
    .catch((err) => console.log(err));
}

function handleUpdateUIonUnlike(id, likeButton, number) {
  handleUnlike(id)
    .then((res) => {
      number.textContent = res.likes.length;
      likeButton.classList.remove("card__like_true");
      likeButton.addEventListener("click", () => {
        handleUpdateUIonLike(id, likeButton, number);
      });
    })
    .catch((err) => console.log(err));
}

function addLikeHandler(liked, likeButton, id, number) {
  if (liked) {
    likeButton.classList.add("card__like_true");
    likeButton.addEventListener("click", () => {
      handleUpdateUIonUnlike(id, likeButton, number);
    });
  } else {
    likeButton.classList.remove("card__like_true");
    likeButton.addEventListener("click", () => {
      handleUpdateUIonLike(id, likeButton, number);
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
        .catch((err) => console.log(err))
        .finally(() => {
          const card = deleteButton.closest(".card");
          card.remove();
        });
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
