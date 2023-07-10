import Card from "./Card.js";

/**
 * @param selector
 * @param id
 * @param methods
 * @param cardObject
 */

export default class UserCard extends Card {
  constructor(selector, methods, cardObject, userId) {
    super(selector, methods, cardObject, userId);
    this._handleDeleteCard = methods.handleDeleteCard;
  }

  _addDeleteHandler() {
    this._trashCan.addEventListener("click", () => {
      this._handleDeleteCard(this._id)
        .then(() => this._element.remove())
        .catch((err) => console.log(err));
    });
  }

  _setEventListeners() {
    super._setEventListeners();
    this._addDeleteHandler();
  }
}
