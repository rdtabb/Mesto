/** Сущность карточки места
 * @param selector - селектор для поиска шаблона в html
 * @param id - идентификатор карточки
 * @param methods - объект с дополнительными методами классов API и PopupWithImage
 * @param id - идентификатор карточки
 */

export default class Card {
  constructor(selector, methods, cardObject, userId) {
    this._selector = selector;
    this._id = cardObject._id;
    this._handleLikeCard = methods.handleLikeCard;
    this._handleUnlikeCard = methods.handleUnlikeCard;
    this._openImagePopup = methods.openImagePopup;
    this._cardObject = cardObject;
    this._userId = userId;

    this._getElement();
    this.likeButton = this._element.querySelector(".card__like");
    this.likesCounter = this._element.querySelector(".card__number");
    this.cardImage = this._element.querySelector(".card__image");
    this._trashCan = this._element.querySelector(".card__delete");
  }

  _getElement() {
    this._element = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._element;
  }

  _isLiked() {
    return this._cardObject.likes.some((like) => like._id === this._userId);
  }

  _handleLike() {
    const isLiked = this._isLiked();
    if (isLiked) {
      this._handleUnlikeCard(this._id).then((response) => {
        this.likesCounter.textContent = response.likes.length;
        this._cardObject.likes = response.likes;
        this.likeButton.classList.remove("card__like_true");
      });
    } else {
      this._handleLikeCard(this._id).then((response) => {
        this.likesCounter.textContent = response.likes.length;
        this._cardObject.likes = response.likes;
        this.likeButton.classList.add("card__like_true");
      });
    }
  }

  _addLikeHandler() {
    this.likeButton.addEventListener("click", () => {
      this._handleLike();
    });
  }

  _addOpenPopupHandler() {
    this.cardImage.addEventListener("click", () => {
      this._openImagePopup(this._cardObject.link, this._cardObject.name);
    });
  }

  _setEventListeners() {
    this._addLikeHandler();
    this._addOpenPopupHandler();
  }

  generate() {
    const cardImage = this._element.querySelector(".card__image");
    const cardLikesAmount = this._element.querySelector(".card__number");
    const cardDescription = this._element.querySelector(".card__description");

    cardImage.src = this._cardObject.link;
    cardImage.alt = this._cardObject.name;
    cardDescription.textContent = this._cardObject.name;
    cardLikesAmount.textContent = this._cardObject.likes.length;

    this._isLiked() && this.likeButton.classList.add("card__like_true");

    this._setEventListeners();

    return this._element;
  }
}
