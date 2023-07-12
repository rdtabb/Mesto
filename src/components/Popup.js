export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._closeButton = this._element.querySelector(".popup__close");
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

  _handleIconClose() {
    this.close();
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._element.addEventListener("click", this._handleOverlayClose.bind(this));
    this._closeButton.addEventListener("click", this._handleIconClose.bind(this));
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
    this._element.removeEventListener("click", this._handleOverlayClose.bind(this));
    this._closeButton.removeEventListener("click", this._handleIconClose.bind(this));

  }
}
