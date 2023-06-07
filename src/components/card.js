import { handleDelete, handleLike} from "./utils";
import { openPopup } from "./modal";
import { templateElement, cardsSection, popupCaption, popupCover, imagePopup } from "../pages";
import { handleGetPosts } from "../api/api";

export function createCard(card) {
  const cardElement = templateElement?.content
    .querySelector(".card")
    ?.cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__description").textContent = card.name;
  cardElement
    .querySelector(".card__like")
    .addEventListener("click", handleLike);
  cardElement
    .querySelector(".card__delete")
    .addEventListener("click", handleDelete);
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
  })
}
