import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._element.querySelector(".popup__cover");
    this._caption = this._element.querySelector(".popup__caption");
  }

  openImage(link, name) {
    super.open();

    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;

    this.setEventListeners();
  }
}
