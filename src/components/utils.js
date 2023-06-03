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
  profileHeader.textContent = inputName.value;
  profileDescription.textContent = inputStatus.value;
}
function closePopupOnEsc(popupElement) {
  window.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      closePopup(popupElement);
    }
  });
}
