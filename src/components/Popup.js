export default class Popup {
  constructor(popup) {
    this._element = popup;
    this._closeButton = popup.querySelector(".popup__close");
    this._closeButton.addEventListener("click", () => this.close());
  }

  open() {
    this._element.classList.add("popup_opened");
    this._setEventListeners();
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

  _closePopupEsc(e) {
    e.key === "Escape" && this.close();
  }

  _closePopupOnOverlay(e) {
    e.target === e.currentTarget && this.close();
  }

  _setEventListeners() {
    document.addEventListener("keydown", this._closePopupEsc.bind(this));
    this._element.addEventListener(
      "click",
      this._closePopupOnOverlay.bind(this)
    );
  }
  
  _removeEventListeners() {
    document.removeEventListener("keydown", this._closePopupEsc.bind(this));
    this._element.removeEventListener(
      "click",
      this._closePopupOnOverlay.bind(this)
    );
  }
}
