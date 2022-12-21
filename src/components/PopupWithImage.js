import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ src, alt }, modalSelector) {
    super(modalSelector);
    this._src = src;
    this._alt = alt;
    this._modalImage = this._modal.querySelector(".modal__image-expanded");
    this._modalText = this._modal.querySelector(".modal__image-label");
    super.setEventListeners();
    console.log(this._src);
    console.log(this._alt);
  }

  open() {
    this._modalImage.src = this._src;
    this._modalImage.alt = this._alt;
    this._modalText.textContent = this._alt;
    console.log(this._modalImage.src);
    super.open();
  }
}

export { PopupWithImage };
