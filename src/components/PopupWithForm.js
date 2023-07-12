import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._form = this._element.querySelector(".popup__form");
    this._submit = submit;
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.form__input');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submit);
  }

  _removeEventListeners() {
    super._removeEventListeners();

    this._form.removeEventListener("submit", this._submit);
  }

  close() {
    super.close();

    this._form.reset();
  }
}
