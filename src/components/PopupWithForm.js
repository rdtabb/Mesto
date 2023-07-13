import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this.inputList = Array.from(this._element.querySelectorAll('.popup__input'));
    this.submitButton = this._element.querySelector('.popup__submit');
    this._form = this._element.querySelector(".popup__form");

    this._submitHandler = submitHandler;
    this._bindedHandleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    this._formValues = {};

    this.inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _handleSubmit(e) {
    this._submitHandler(e, this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", this._bindedHandleSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();

    this._form.removeEventListener("submit", this._bindedHandleSubmit);
  }

  close() {
    super.close();

    this._form.reset();
  }
}
