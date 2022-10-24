const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  configDict
) => {
  // formElement represents a form
  // inputElement represents a specific input element in the form
  // errorMessage represents the error message for the corresponding input field
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configDict["errorClass"]);
};

const hideInputError = (formElement, inputElement, configDict) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(configDict["errorClass"]);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, configDict) => {
  // inputElement.validationMessage is auto-created by the browser based on the validation error
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      configDict
    );
  } else {
    hideInputError(formElement, inputElement, configDict);
  }
};

const hasInValidInput = (inputList) => {
  //inputList is a list of input fields belonging to a form
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, configDict) => {
  if (hasInValidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(configDict["inactiveButtonClass"]);
  } else {
    buttonElement.classList.remove(configDict["inactiveButtonClass"]);
    buttonElement.removeAttribute("disabled", true);
  }
};

const setEventListeners = (formElement, configDict) => {
  // Array.from() will convert the pseudo array to a normal Array,
  // so that we can apply Array methods like forEach()
  const inputList = Array.from(
    formElement.querySelectorAll(configDict["inputSelector"])
  );
  const buttonElement = formElement.querySelector(
    configDict["submitButtonSelector"]
  );

  // This statement will help to set the button state appropriately, when the
  // page loads initially
  toggleButtonState(inputList, buttonElement, configDict);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, configDict);
      toggleButtonState(inputList, buttonElement, configDict);
    });
  });
};

const enableValidation = (configDict) => {
  const formList = Array.from(
    document.querySelectorAll(configDict["formSelector"])
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, configDict);
  });
};

const resetValidation = (formElement, configDict) => {
  // console.log(formElement);
  const modalInputErrorElements = formElement.querySelectorAll(
    configDict["inputErrorSelector"]
  );

  modalInputErrorElements.forEach((element) => {
    element.classList.remove(configDict["errorClass"]);
  });

  const submitButton = formElement.querySelector(
    configDict["submitButtonSelector"]
  );
  submitButton.classList.add(configDict["inactiveButtonClass"]);
};

//enableValidation(configDict);
export { enableValidation, resetValidation };
