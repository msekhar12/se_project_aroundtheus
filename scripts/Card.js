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
    event.target.closest(".card").remove();
  }

  _handleOpenImageModal() {
    imageModalExpanded.src = this._src;
    imageModalExpanded.alt = this._alt;
    imageModalLabel.textContent = this._alt;
    openModal(imageModal);
  }

  _setEventListeners() {
    // The this._element is created inside getcardElement() method

    // You must use arrow functions. You CANNOT use this._handleOpenImageModal
    // directly in the addEventListener(). We will learn about the reason later!!
    this._cardImage.addEventListener("click", () => {
      this._handleOpenImageModal();
    });

    this._cardLikeButton.addEventListener("click", (event) => {
      this._handleToggleLike(event);
    });

    this._deleteCardButton.addEventListener("click", (event) => {
      this._handleDeleteCard(event);
    });
  }

  _fillImageCard() {
    this._cardImage.src = this._src;
    this._cardImage.alt = this._alt;
    this._cardLabel.textContent = this._textContent;
  }

  getCardElement() {
    this._element = this._getTemplate();
    // Set class variables, which will be referenced in other functions
    this._cardImage = this._element.querySelector(".card__image");
    this._cardLikeButton = this._element.querySelector(".card__heart");
    this._deleteCardButton = this._element.querySelector(".card__delete");
    this._cardLabel = this._element.querySelector(".card__label-text");

    // Set event listeners on the form fields
    this._setEventListeners();
    this._fillImageCard();
    return this._element;
  }
}

export { Card };
