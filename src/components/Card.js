class Card {
  constructor({ data, selector, clickEventHandler }) {
    this._src = data.link;
    this._alt = data.name;
    this._textContent = data.name;
    this._selector = selector;
    this._clickEventHandler = clickEventHandler;
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
    this._cardLikes.textContent = 5;
  }

  _handleToggleLike(event) {
    event.target.classList.toggle("card__heart_like");
  }

  _handleDeleteCard(event) {
    event.target.closest(".card").remove();
  }

  setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._clickEventHandler();
    });

    this._deleteCardButton.addEventListener("click", (evt) => {
      this._handleDeleteCard(evt);
    });

    this._cardLikeButton.addEventListener("click", (evt) => {
      this._handleToggleLike(evt);
    });
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
