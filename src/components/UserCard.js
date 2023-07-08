import Card from "./ParentCard";

export default class UserCard extends Card {
  constructor(selector, id, methods, cardObject) {
    super(selector, id);
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = methods.handleLikeCard;
    this._openImagePopup = methods.openImagePopup;
    this._handleDeleteCard = methods.handleDeleteCard;
    this._cardObject = cardObject;
  }

  _setEventListeners() {
    this._element.querySelector(".card__like").addEventListener("click", () => {
      this._handleLikeCard(this._id);
    });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._openImagePopup);
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => this._handleDeleteCard(this._id));
  }

  generate() {
    this._element = super._getElement();

    const cardImage = this._element.querySelector(".card__image");
    const cardLikesNumber = this._element.querySelector(".card__number");
    const cardDescription = this._element.querySelector(".card__description");
    cardImage.src = this._cardObject.link;
    cardImage.alt = this._cardObject.name;
    cardDescription.textContent = this._cardObject.name;
    cardLikesNumber.textContent = this._cardObject.likes.length;

    this._setEventListeners();

    return this._element;
  }
}
