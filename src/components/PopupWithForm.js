import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ modalSelector, handleFormSubmit }) {
    super(modalSelector);
    this._form = this._modal.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this.setEventListeners();
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".modal__input");

    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  reset() {
    this._form.reset();
  }

  // close() {
  //   super.close();
  //  this._modal.reset();
  // }
}

export { PopupWithForm };
