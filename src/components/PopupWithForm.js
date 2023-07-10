import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, submit) {
    super(popup);
    this._form = this._element.querySelector(".popup__form");
    this._form.addEventListener("submit", submit);
  }
}
