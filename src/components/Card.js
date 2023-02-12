class Card {
  constructor({ data, selector, clickEventHandler, deleteEventHandler }) {
    this._src = data.link;
    this._alt = data.name;
    this._textContent = data.name;
    this._likes = data.likes;
    this._ownerInd = data.ownerInd;
    this._selector = selector;
    this._clickEventHandler = clickEventHandler;
    this._deleteEventHandler = deleteEventHandler;
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
  }

  _handleToggleLike(event) {
    event.target.classList.toggle("card__heart_like");
  }

  _handleDeleteCard(event) {
    this._deleteEventHandler();
    //event.target.closest(".card").remove();
  }

  setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._clickEventHandler();
    });

    this._deleteCardButton.addEventListener("click", (evt) => {
      //this._handleDeleteCard(evt);
      this._deleteEventHandler();
    });

    this._cardLikeButton.addEventListener("click", (evt) => {
      this._handleToggleLike(evt);
    });
  }

  removeCardElement() {
    this._element.remove();
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

    // Remove the delete button, if the user is not the owner of the
    // photo
    if (!this._ownerInd) {
      this._deleteCardButton.classList.add("card__delete_disable");
    }

    return this._element;
  }
}

export { Card };
