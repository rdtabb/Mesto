import { createCard } from "./card";
import { cardsSection, profileHeader, profileDescription, inputName, inputStatus } from "..";
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}
function closePopupOnEsc(popupElement) {
  window.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      closePopup(popupElement);
    }
  });
}
function addCard(card) {
  const cardEl = createCard(card);
  cardsSection.prepend(cardEl);
}
function editProfile() {
  profileHeader.textContent = inputName.value;
  profileDescription.textContent = inputStatus.value;
}
export { openPopup, closePopup, closePopupOnEsc, addCard, editProfile };
