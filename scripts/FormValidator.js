class FormValidator {
  constructor(configDict, formElement) {
    this._configDict = configDict;
    this._formElement = formElement;
  }

  // In the below functions:
  // formElement represents a form
  // inputElement represents a specific input element in the form
  // errorMessage represents the error message for the corresponding input field

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._configDict["errorClass"]);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.classList.remove(this._configDict["errorClass"]);
    errorElement.textContent = "";
  };

  _hasInValidInput = (inputList) => {
    //inputList is a list of input fields belonging to a form
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInValidInput(inputList)) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(this._configDict["inactiveButtonClass"]);
    } else {
      buttonElement.classList.remove(this._configDict["inactiveButtonClass"]);
      buttonElement.removeAttribute("disabled", true);
    }
  };

  _checkInputValidity = (inputElement) => {
    // inputElement.validationMessage is auto-created by the browser based on the validation error
    // const inputElement = evt.target;
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(
      this._formElement.querySelectorAll(this._configDict["inputSelector"])
    );

    const buttonElement = this._formElement.querySelector(
      this._configDict["submitButtonSelector"]
    );

    // This statement will help to set the button state appropriately, when the
    // page loads initially
    this._toggleButtonState(inputList, buttonElement);

    // You must use arrow function. If not used, we will get this._checkInputValidity() not found error
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    // Whenever a form is reset, the button will be disabled, using the following reset event handler.
    // Alternatively we can disable the button when the modal is opened for display.
    // See the function (see the function: handleCreateCardSubmit(event) in index.js)
    this._formElement.addEventListener("reset", () => {
      // `setTimeout` is needed to wait till the form is fully reset and then to call `this._toggleButtonState()`
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonElement);
      }, 0); // it’s enough to put 0 ms here
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  };
}

export { FormValidator };
