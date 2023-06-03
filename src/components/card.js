const initialCards = [
  {
    link: "./images/lisboa.avif",
    name: "Лиссабон",
  },
  {
    link: "./images/tokyo.avif",
    name: "Токио",
  },
  {
    link: "./images/chicago.avif",
    name: "Чикаго",
  },
  {
    link: "./images/fortaleza.avif",
    name: "Форталеза",
  },
  {
    link: "./images/istanbul.avif",
    name: "Стамбул",
  },
  {
    link: "./images/bali.avif",
    name: "Бали",
  },
];

function createCard(card) {
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
    closePopupOnEsc(imagePopup);
  });
  return cardElement;
}
function renderCards() {
  initialCards.forEach((el) => {
    const card = createCard(el);
    cardsSection.append(card);
  });
}
renderCards();
