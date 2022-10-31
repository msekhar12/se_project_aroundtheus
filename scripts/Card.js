import { openModal } from "./utils.js";

// Global variable to support image modal
const imageModal = document.querySelector("#image-modal");
const imageModalExpanded = imageModal.querySelector(".modal__image-expanded");
// const imageModalClose = imageModal.querySelector(".modal__close");
const imageModalLabel = imageModal.querySelector(".modal__image-label");

class Card {
  constructor(data, selector) {
    this._src = data.link;
    this._alt = data.name;
    this._textContent = data.name;
    this._selector = selector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _handleToggleLike(event) {
    event.target.classList.toggle("card__heart_like");
  }

  _handleDeleteCard(event) {
    // console.log(event);
    event.target.closest(".card").remove();
  }

  _handleOpenImageModal(event) {
    const imageURL = event.target.src;
    const imageText = event.target.alt;
    imageModalExpanded.src = imageURL;
    imageModalExpanded.alt = imageText;
    imageModalLabel.textContent = imageText;
    openModal(imageModal);
  }

  _setEventListeners() {
    // The this._element is created inside getcardElement() method
    const cardImage = this._element.querySelector(".card__image");
    const cardLikeButton = this._element.querySelector(".card__heart");
    const deleteCardButton = this._element.querySelector(".card__delete");

    // You must use arrow functions. You CANNOT use this._handleOpenImageModal
    // directly in the addEventListener(). We will learn about the reason later!!
    cardImage.addEventListener("click", (event) => {
      this._handleOpenImageModal(event);
    });

    cardLikeButton.addEventListener("click", (event) => {
      this._handleToggleLike(event);
    });

    deleteCardButton.addEventListener("click", (event) => {
      this._handleDeleteCard(event);
    });
  }

  _fillImageCard() {
    const cardImage = this._element.querySelector(".card__image");
    const cardLabel = this._element.querySelector(".card__label-text");
    cardImage.src = this._src;
    cardImage.alt = this._alt;
    cardLabel.textContent = this._textContent;
  }

  getCardElement() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._fillImageCard();
    return this._element;
  }
}

export { Card };
