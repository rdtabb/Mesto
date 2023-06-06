import { handleDelete, handleLike} from "./utils";
import { openPopup } from "./modal";
import { templateElement, cardsSection, popupCaption, popupCover, imagePopup } from "../pages";
const lisboaImage = new URL("../images/lisboa.avif", import.meta.url);
const tokyoImage = new URL("../images/tokyo.avif", import.meta.url);
const chicagoImage = new URL("../images/chicago.avif", import.meta.url);
const fortalezaImage = new URL("../images/fortaleza.avif", import.meta.url);
const istanbulImage = new URL("../images/istanbul.avif", import.meta.url);
const baliImage = new URL("../images/bali.avif", import.meta.url);
const initialCards = [
  {
    link: lisboaImage,
    name: "Лиссабон",
  },
  {
    link: tokyoImage,
    name: "Токио",
  },
  {
    link: chicagoImage,
    name: "Чикаго",
  },
  {
    link: fortalezaImage,
    name: "Форталеза",
  },
  {
    link: istanbulImage,
    name: "Стамбул",
  },
  {
    link: baliImage,
    name: "Бали",
  },
];
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
  initialCards.forEach((el) => {
    const card = createCard(el);
    cardsSection.append(card);
  });
}
