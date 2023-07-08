export default class Card {
  constructor(selector, id) {
    this._selector = selector;
    this._id = id;
  }

  _getElement() {
    this._element = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._element;
  }
}
