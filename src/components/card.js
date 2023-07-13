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
    this._likeButton = this._element.querySelector(".card__like");
    this._likesCounter = this._element.querySelector(".card__number");
    this._image = this._element.querySelector(".card__image");
    this._trashCan = this._element.querySelector(".card__delete");
    this._Description = this._element.querySelector(".card__description");

  }

  _getElement() {
    this._element = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _isLiked() {
    return this._cardObject.likes.some((like) => like._id === this._userId);
  }

  _handleLike() {
    const isLiked = this._isLiked();
    if (isLiked) {
      this._handleUnlikeCard(this._id)
        .then((response) => {
          this._likesCounter.textContent = response.likes.length;
          this._cardObject.likes = response.likes;
          this._likeButton.classList.remove("card__like_true");
        })
        .catch((err) => console.log(err));
    } else {
      this._handleLikeCard(this._id)
        .then((response) => {
          this._likesCounter.textContent = response.likes.length;
          this._cardObject.likes = response.likes;
          this._likeButton.classList.add("card__like_true");
        })
        .catch((err) => console.log(err));
    }
  }

  _addLikeHandler() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });
  }

  _addOpenPopupHandler() {
    this._image.addEventListener("click", () => {
      this._openImagePopup(this._cardObject.link, this._cardObject.name);

    });
  }

  _setEventListeners() {
    this._addLikeHandler();
    this._addOpenPopupHandler();
  }

  generate() {
    this._image.src = this._cardObject.link;
    this._image.alt = this._cardObject.name;
    this._Description.textContent = this._cardObject.name;
    this._likesCounter.textContent = this._cardObject.likes.length;

    this._isLiked() && this._likeButton.classList.add("card__like_true");

    this._setEventListeners();

    return this._element;
  }
}
