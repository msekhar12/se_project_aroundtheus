class Card {
  constructor({
    data,
    selector,
    clickEventHandler,
    deleteEventHandler,
    likeEventHandler,
  }) {
    this._src = data.link;
    this._alt = data.name;
    this._textContent = data.name;
    this._likes = data.likes;
    this._ownerInd = data.ownerInd;
    this._cardLiked = data.cardLiked;
    this._selector = selector;
    this._clickEventHandler = clickEventHandler;
    this._deleteEventHandler = deleteEventHandler;
    this._likeEventHandler = likeEventHandler;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _fillImageCard() {
    this._cardImage.src = this._src;
    this._cardImage.alt = this._alt;
    this._cardLabel.textContent = this._textContent;
    this._cardLikes.textContent = this._likes;
    if (this._cardLiked) {
      this.likeCard();
    } else {
      this.unlikeCard();
    }
    // Remove the delete button, if the user is not the owner of the
    // photo
    if (!this._ownerInd) {
      this._deleteCardButton.classList.add("card__delete_disable");
    }
  }

  _handleDeleteCard(event) {
    this._deleteEventHandler();
  }

  setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._clickEventHandler();
    });

    if (this._ownerInd) {
      this._deleteCardButton.addEventListener("click", (evt) => {
        this._deleteEventHandler();
      });
    }

    this._cardLikeButton.addEventListener("click", (evt) => {
      this._likeEventHandler();
    });
  }

  likeCard() {
    this._cardLikeButton.classList.add("card__heart_like");
    this._cardLiked = true;
  }

  unlikeCard() {
    this._cardLikeButton.classList.remove("card__heart_like");
    this._cardLiked = false;
  }

  isCardLiked() {
    return this._cardLiked;
  }

  removeCardElement() {
    this._element.remove();
  }

  updateLikes(likes) {
    this._cardLikes.textContent = likes;
  }

  getCardElement() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardLikeButton = this._element.querySelector(".card__heart");
    this._deleteCardButton = this._element.querySelector(".card__delete");

    this._cardLabel = this._element.querySelector(".card__label-text");
    this._cardLikes = this._element.querySelector(".card__likes");
    this._fillImageCard();
    this.setEventListeners();

    return this._element;
  }
}

export { Card };
