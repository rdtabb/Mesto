// ------------------------------------
// DOM elements
// ------------------------------------
const templateElement = document.querySelector("#card-template");
const cardsSection = document.querySelector(".cards");
const editNameInput = document.querySelector(".popup__input_type_name");
const editStatusInput = document.querySelector(".popup__input_type_description");
const submitEditProfile = document.querySelector(".popup__submit_edit");
const profileHeader = document.querySelector(".profile__header");
const profileDescription = document.querySelector(".profile__description");
const imagePopup = document.querySelector(".popup_image");
const popupCover = document.querySelector(".popup__cover");
const popupCaption = document.querySelector(".popup__caption");
const submitAddCard = document.querySelector(".popup__submit_addcart");
const inputUrl = document.querySelector(".popup__input_type_url");
const inputPlace = document.querySelector(".popup__input_type_place");
// arrays of elements
const popups = Array.from(document.querySelectorAll(".popup"));
const profileButtons = Array.from(document.querySelectorAll(".profile__button"));
const closeButtons = Array.from(document.querySelectorAll(".popup__close"));
let cardImages = Array.from(document.querySelectorAll(".card__image"));
let likeButtons = Array.from(document.querySelectorAll(".card__like"));
let deleteButtons = Array.from(document.querySelectorAll(".card__delete"));

// ------------------------------------
// Functions
// ------------------------------------
function openPopup(e) {
  const controlledPopupSelector = e.target.getAttribute("aria-controls");
  const popup = document.getElementById(`${controlledPopupSelector}`);
  popup.classList.add("popup_opened");
  popup.setAttribute("data-visible", "true")
};

function openImagePopup(imgsrc, title) {
  popupCover.src = imgsrc;
  popupCaption.textContent = title;
  imagePopup.classList.add("popup_opened");
  imagePopup.setAttribute("data-visible", "true")
};

function closePopup(e) {
  e.preventDefault();
  popups.forEach((popup) => {
    popup.setAttribute("data-visible", "false")
    setTimeout(() => {
      popup.classList.remove("popup_opened");
    }, 200)
  });
};

function submitEditProfilePopup(e) {
  e.preventDefault();
  const nameValue = editNameInput.value;
  const statusValue = editStatusInput.value;
  profileHeader.textContent = nameValue;
  profileDescription.textContent = statusValue;
};

function submitAddCardPopup(e) {
  e.preventDefault();
  const newImgsrc = inputUrl.value;
  const newTitle = inputPlace.value;
  console.log(initialCards);
  const newId = initialCards.length ? initialCards[0].id + 1 : 1;
  addCard(newImgsrc, newTitle, newId);
};

//----
function addCard(imgsrc, title, id) {
  const newCard = { imgsrc, title, id, liked: false };
  initialCards.unshift(newCard);
  renderCards(initialCards);
};

function likeButton(e) {
  const targetParent = e.target.parentNode;
  const mainParent = targetParent.parentNode;
  const id = Number(mainParent.getAttribute("id"));
  const likedCards = initialCards.map((card) =>
    card.id === id ? { ...card, liked: !card.liked } : card
  );
  initialCards = likedCards;
  renderCards(initialCards);
};

function deleteCard(e) {
  const targetParent = e.target.parentNode;
  const mainParent = targetParent.parentNode;
  const id = Number(mainParent.getAttribute("id"));
  const filteredArray = initialCards.filter((card) => 
    card.id !== id
  );
  initialCards = filteredArray;
  renderCards(initialCards);
};

// ------------------------------------
// Initial cards
// ------------------------------------
let initialCards = [
  {
    imgsrc: "./images/lisboa.avif",
    title: "Лиссабон",
    liked: false,
    id: 6,
  },
  {
    imgsrc: "./images/tokyo.avif",
    title: "Токио",
    liked: false,
    id: 5,
  },
  {
    imgsrc: "./images/chicago.avif",
    title: "Чикаго",
    liked: false,
    id: 4,
  },
  {
    imgsrc: "./images/fortaleza.avif",
    title: "Форталеза",
    liked: false,
    id: 3,
  },
  {
    imgsrc: "./images/istanbul.avif",
    title: "Стамбул",
    liked: false,
    id: 2,
  },
  {
    imgsrc: "./images/bali.avif",
    title: "Бали",
    liked: false,
    id: 1,
  },
];

// ------------------------------------
// Initial render
// ------------------------------------
function clearCardsSection() {
  const childrenCards = Array.from(cardsSection.children);
  childrenCards.forEach((card) => {
    cardsSection.removeChild(card);
  });
};
function createCard(imgsrc, title, liked, id) {
  const templateContent = templateElement?.content
    .querySelector(".card")
    ?.cloneNode(true);
  templateContent.setAttribute("id", id);
  const likeButton = templateContent.querySelector(".card__like");
  if (liked) {
    likeButton.classList.add("card__like_true");
  }
  templateContent.querySelector(".card__image").src = imgsrc;
  templateContent.querySelector(".card__image").alt = title;
  templateContent.querySelector(".card__description").textContent = title;
  cardsSection.appendChild(templateContent);
};
function renderCards(cardsArr) { 
  clearCardsSection();
  cardsArr.forEach((card) => {
    createCard(card.imgsrc, card.title, card.liked, card.id);
  });
  cardImages = Array.from(document.querySelectorAll(".card__image"));
  likeButtons = Array.from(document.querySelectorAll(".card__like"));
  deleteButtons = Array.from(document.querySelectorAll(".card__delete"));
  likeButtons.forEach((button) => {
    button.addEventListener("click", likeButton);
  });
  cardImages.forEach((image) => {
    image.addEventListener("click", () => {
      const imgsrc = image.getAttribute("src");
      const parent = image.parentNode;
      const nexImageSibling = parent.nextElementSibling;
      const nextElement = nexImageSibling.querySelector(".card__description");
      const title = nextElement.textContent;
      openImagePopup(imgsrc, title);
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteCard)
  })
};
renderCards(initialCards);

// ------------------------------------
// Implementation
// ------------------------------------
profileButtons.forEach((button) => {
  button.addEventListener("click", openPopup);
});
closeButtons.forEach((button) => {
  button.addEventListener("click", closePopup);
});
submitEditProfile.addEventListener("click", (e) => {
  submitEditProfilePopup(e);
  closePopup(e);
});
submitAddCard.addEventListener("click", (e) => {
  closePopup(e);
  submitAddCardPopup(e);
});
likeButtons.forEach((button) => {
  button.addEventListener("click", likeButton);
});
cardImages.forEach((image) => {
  image.addEventListener("click", () => {
    const imgsrc = image.getAttribute("src");
    const parent = image.parentNode;
    const nexImageSibling = parent.nextSibling;
    const title = nexImageSibling.querySelector(".card__description").value;
    openImagePopup(imgsrc, title);
  });
});
deleteButtons.forEach((button) => {
  button.addEventListener('click', deleteCard)
})
