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
  if (e.key == "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}
function closePopupOnOverlay(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget)
  }
}
export { openPopup, closePopup };
