import { createCard } from "./card";
import {
  cardsSection,
  profileHeader,
  profileDescription,
  inputName,
  inputStatus,
} from "../pages";
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popupElement.addEventListener("click", closePopupOnOverlay);
}
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popupElement.removeEventListener("click", closePopupOnOverlay);
}
function closePopupEsc(e) {
  const popup = document.querySelector(".popup_opened");
  if (e.key == "Escape") {
    closePopup(popup);
  }
}
function closePopupOnOverlay(e) {
  const popup = document.querySelector(".popup_opened");
  if (e.target != popup) return;
  closePopup(popup);
}
function addCard(card) {
  const cardEl = createCard(card);
  cardsSection.prepend(cardEl);
}
function editProfile() {
  profileHeader.textContent = inputName.value;
  profileDescription.textContent = inputStatus.value;
}
export { openPopup, closePopup, addCard, editProfile };
