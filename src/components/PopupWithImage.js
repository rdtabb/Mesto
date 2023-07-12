import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  openImage(link, name) {
    super.open();
    const image = this._element.querySelector(".popup__cover");
    image.src = link;
    image.alt = name;
    this._element.querySelector(".popup__caption").textContent = name;

    this.setEventListeners();
  }
}
