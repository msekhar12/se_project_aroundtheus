class Card {
  constructor({
    data,
    selector,
    clickEventHandler,
    deleteEventHandler,
    likeEventHandler,
  }) {
    console.log(data);
    this._src = data.link;
    this._alt = data.name;
    this._textContent = data.name;
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
  }

  setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._clickEventHandler();
    });

    this._deleteCardButton.addEventListener("click", (evt) => {
      this._deleteEventHandler(evt);
    });

    this._cardLikeButton.addEventListener("click", (evt) => {
      this._likeEventHandler(evt);
    });
  }
  getCardElement() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardLikeButton = this._element.querySelector(".card__heart");
    this._deleteCardButton = this._element.querySelector(".card__delete");
    this._cardLabel = this._element.querySelector(".card__label-text");
    this._fillImageCard();
    this.setEventListeners();
    return this._element;
  }
}

export { Card };
