/** Сущность карточки места
 * @param selector - селектор для поиска шаблона в html
 * @param id - идентификатор карточки
 * @param methods - объект с дополнительными методами классов API и PopupWithImage
 * @param id - идентификатор карточки
 */
export default class Card {
  constructor(selector, id,  methods, cardObject) {
    this._selector = selector;
    this._id = id;
    this._handleLikeCard = methods.handleLikeCard;
    this._openImagePopup = methods.openImagePopup;
    this._cardObject = cardObject;
  }

  _getElement() {
    this._element = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector(".card__like").addEventListener("click", () => {
      this._handleLikeCard(this._id);
    });
    this._element
        .querySelector(".card__image")
        .addEventListener("click", this._openImagePopup);
  }

  generate() {
    this._element = this._getElement();

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
