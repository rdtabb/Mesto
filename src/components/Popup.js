class Popup {
  constructor(popup) {
    this._element = popup;
    this._closeButton = popup.querySelector('.popup__close')
    this._closeButton.addEventListener('click', () => this.close())
  }
  open() {
    this._element.classList.add("popup_opened");
    this._setEventListeners();
  }
  close() {
    this._element.classList.remove("popup_opened");
    this._removeEventListeners();
  }
  _closePopupEsc(e) {
    (e.key === "Escape") && this.close()
  }
  _closePopupOnOverlay(e) {
    (e.target === e.currentTarget) && this.close()
  }
   _setEventListeners() {
     document.addEventListener("keydown", this._closePopupEsc.bind(this));
     this._element.addEventListener("click", this._closePopupOnOverlay.bind(this));
  }
  _removeEventListeners() {
    document.removeEventListener("keydown", this._closePopupEsc.bind(this));
    this._element.removeEventListener("click", this._closePopupOnOverlay.bind(this));
  }
}
class PopupWithForm extends Popup {
  constructor(popup, submit) {
    super(popup);
    this._form = this._element.querySelector('.popup__form');
    this._form.addEventListener('submit', submit);
  }

}
class PopupWithImage extends Popup{
  constructor(popup, {name , link , alt}) {
    super(popup);
    const image = this._element.querySelector('.popup__cover');
    const caption = this._element.querySelector('.popup__caption');
    image.src = link;
    image.alt = alt;
    caption.textContent = name;
  }

}

export {PopupWithForm, PopupWithImage}
