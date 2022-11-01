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

  _hasInValidInput = () => {
    //inputList is a list of input fields belonging to a form
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInValidInput()) {
      // this._buttonElement.setAttribute("disabled", true);
      // this._buttonElement.classList.add(
      // this._configDict["inactiveButtonClass"]
      // );
      this._disableSubmit();
    } else {
      this._buttonElement.classList.remove(
        this._configDict["inactiveButtonClass"]
      );
      this._buttonElement.removeAttribute("disabled", true);
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

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._configDict["inputSelector"])
    );

    this._buttonElement = this._formElement.querySelector(
      this._configDict["submitButtonSelector"]
    );

    // This statement will help to set the button state appropriately, when the
    // page loads initially
    this._toggleButtonState();

    // You must use arrow function. If not used, we will get this._checkInputValidity() not found error
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    // Whenever a form is reset, the button will be disabled, using the following reset event handler.
    // Alternatively we can disable the button when the modal is opened for display.
    // See the function (see the function: handleCreateCardSubmit(event) in index.js)
    this._formElement.addEventListener("reset", () => {
      // `setTimeout` is needed to wait till the form is fully reset and then to call `this._toggleButtonState()`
      //setTimeout(() => {
      //  this._toggleButtonState();
      //}, 0); // it’s enough to put 0 ms here
      this._disableSubmit();
    });
  }

  _disableSubmit = () => {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(this._configDict["inactiveButtonClass"]);
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  resetValidation = () => {
    this._inputList.forEach((element) => {
      this._hideInputError(element);
    });
    this._disableSubmit();
  };
}

export { FormValidator };
