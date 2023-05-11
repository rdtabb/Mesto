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

// ------------------------------------
// DOM elements
// ------------------------------------
const templateElement = document.querySelector("#card-template");
const cardsSection = document.querySelector(".cards");

const profileHeader = document.querySelector(".profile__header");
const profileDescription = document.querySelector(".profile__description");
const popupCover = document.querySelector(".popup__cover");
const popupCaption = document.querySelector(".popup__caption");

const formEditProfile = document.querySelector(".popup__form_profile");
const formAddCard = document.querySelector(".popup__form_addcard");

const inputUrl = document.querySelector(".popup__input_type_url");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputName = document.querySelector(".popup__input_type_name");
const inputStatus = document.querySelector(".popup__input_type_description");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector(".popup_profile");
const addCardPopup = document.querySelector(".popup_addcard");
const imagePopup = document.querySelector(".popup_image");
// arrays of elements
const popups = Array.from(document.querySelectorAll(".popup"));
const buttonsClose = Array.from(document.querySelectorAll(".popup__close"));

// ------------------------------------
// render
// ------------------------------------
function createCard(card) {
  const cardElement = templateElement?.content
    .querySelector(".card")
    ?.cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__description").textContent = card.name;
  cardElement.querySelector('.card__like').addEventListener('click', handleLike)
  cardElement.querySelector('.card__delete').addEventListener('click', handleDelete)
  cardElement.querySelector('.card__image').addEventListener('click', (e) => {
    const link = e.target.getAttribute("src");
    const alt = e.target.getAttribute("alt");
    popupCaption.textContent = card.name
    popupCover.src = link;
    popupCover.alt = alt;
    openPopup(imagePopup);
  })
  return cardElement;
}
function renderCards() {
  initialCards.forEach((el) => {
    const card = createCard(el);
    cardsSection.append(card);
  });
}
renderCards();
// ------------------------------------
// Functions
// ------------------------------------
function handleLike(e) {
  e.target.classList.toggle("card__like_true");
}
function handleDelete(e) {
  e.target.closest("article").remove();
}
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}
function addCard(card) {
  const cardEl = createCard(card);
  cardsSection.prepend(cardEl);
}
function editProfile() {
  profileHeader.textContent = inputName.value
  profileDescription.textContent = inputStatus.value
}
formAddCard.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCard = {
    link: inputUrl.value,
    name: inputPlace.value,
  };
  inputUrl.value = "";
  inputPlace.value = "";
  addCard(newCard);
  const addPopup = formAddCard.closest('.popup')
  closePopup(addPopup);
});
formEditProfile.addEventListener("submit", (e) => {
  e.preventDefault()
  editProfile()
  const editPopup = formEditProfile.closest('.popup')
  closePopup(editPopup)
})
// ------------------------------------
// Adding event listeners
// ------------------------------------
buttonEditProfile.addEventListener("click", () => {
  inputName.value = profileHeader.textContent
  inputStatus.value = profileDescription.textContent
  openPopup(profilePopup);
});
buttonAddCard.addEventListener("click", () => {
  openPopup(addCardPopup);
});
buttonsClose.forEach((button) => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});
