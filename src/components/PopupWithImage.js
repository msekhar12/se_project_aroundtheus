import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._modalImage = this._modal.querySelector(".modal__image-expanded");
    this._modalText = this._modal.querySelector(".modal__image-label");
    super.setEventListeners();
  }

  open({ src, alt }) {
    this._modalImage.src = src;
    this._modalImage.alt = alt;
    this._modalText.textContent = alt;
    super.open();
  }
}

export { PopupWithImage };
