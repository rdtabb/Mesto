export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._closeButton = this._element.querySelector(".popup__close");

    this._bindedHandleEscClose = this._handleEscClose.bind(this);
    this._bindedHandleOverlayClose = this._handleOverlayClose.bind(this);
    this._bindedHandleIconClose = this.close.bind(this);
  }

  open() {
    this._element.classList.add("popup_opened");
  }

  close() {
    this._element.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  showLoadingText(element) {
    element.textContent = "Сохраняется...";
  }

  hideLoadingText(element) {
    element.textContent = "Сохранить";
  }

  _handleEscClose(e) {
    e.key === "Escape" && this.close();
  }

  _handleOverlayClose(e) {
    e.target === e.currentTarget && this.close();
  }

  setEventListeners() {
    document.addEventListener("keydown", this._bindedHandleEscClose);
    this._element.addEventListener("click",  this._bindedHandleOverlayClose);
    this._closeButton.addEventListener("click", this._bindedHandleIconClose);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._bindedHandleEscClose);
    this._element.removeEventListener("click", this._bindedHandleOverlayClose);
    this._closeButton.removeEventListener("click", this._bindedHandleIconClose);

  }
}
