import Card from "./ParentCard";

/**
 * @param selector
 * @param id
 * @param methods
 * @param cardObject
 */
export default class UserCard extends Card {
  constructor(selector, id, methods, cardObject) {
    super(selector, id, methods, cardObject);
    this._handleDeleteCard = methods.handleDeleteCard;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => this._handleDeleteCard(this._id));
  }
}
