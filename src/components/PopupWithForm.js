import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ modalSelector, handleFormSubmit }) {
    super(modalSelector);
    this._form = this._modal.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".modal__input");
    this.setEventListeners();
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  //reset() {
  //  this._form.reset();
  //}

  /**To the Reviewer:
   * I made changes as per your suggestion. Removed reset() function,
   * and added line to reset the form in close() itself.
   * However, how can I handle the functionality of not to
   * reset the form (to save the earlier typed data?).
   * For example, in the new images add functionality, after typing the data,
   * if the user closes the form, and then again clicks the add image button,
   * the opened form should restore the earlier typed data.
   * With the suggested changes I am not able to load the previously typed
   * values for the new image upload form.
   */
  close() {
    super.close();
    this._form.reset();
  }
}

export { PopupWithForm };
