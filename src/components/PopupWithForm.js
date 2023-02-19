import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ modalSelector, handleFormSubmit }) {
    super(modalSelector);
    this._form = this._modal.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._submitButton = this._form.querySelectorAll(".modal__submit");
    this._submitButtonText = this._submitButton.textContent;
    this.setEventListeners();
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setSubmitAction(newSubmitHandle) {
    this._handleFormSubmit = newSubmitHandle;
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

  // add 2 params: isLoading and loadingText with a default text
  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    super.close();
  }
}

export { PopupWithForm };
