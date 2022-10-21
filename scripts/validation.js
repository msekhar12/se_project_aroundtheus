/*Handle forms validation logic*/
const showError = (evt, errorMessage) => {
  const errorElement = document.querySelector(`#${evt.target.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${evt.currentTarget["name"]}-error_display`);
  // console.log("In show error");
  // console.log(`${evt.currentTarget["name"]}_display`);
};

const removeError = (evt) => {
  const errorElement = document.querySelector(`#${evt.target.id}-error`);
  errorElement.classList.remove(`${evt.currentTarget["name"]}-error_display`);
  errorElement.textContent = "";
};

const hasInValidInput = (inputList) => {
  //Iterate over the array using "some" method
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const isValid = (evt) => {
  if (evt.target.validity.valid) {
    removeError(evt);
  } else {
    showError(evt, evt.target.validationMessage);
  }

  const formName = evt.currentTarget["name"];
  const formContainer = formName.split("__")[0];

  // select button using ID
  // If ID is not used, then we will get empty object
  // once the class is removed when the button is disabled or enabled
  const button = document.querySelector("." + formContainer + "__button");

  const formElements = Array.from(evt.currentTarget.elements);

  if (hasInValidInput(formElements)) {
    button.setAttribute("disabled", true);
    button.classList.remove(formContainer + "__button_enable");
  } else {
    button.removeAttribute("disabled");
    button.classList.add(formContainer + "__button_enable");
  }
};

// Add "input" event listener at the form level
// This will avoid the need to add input event listener
// at the field level
const enableValidation = () => {
  Array.from(document.forms).forEach((element) => {
    element.addEventListener("input", isValid);
  });
};

enableValidation();

const resetErrors = (inputList) => {
  inputList.forEach((element) => {
    const errorElement = document.querySelector(`#${element.id}-error`);
    if (errorElement) {
      const form = errorElement.closest("form");
      const formName = form["name"];
      errorElement.classList.remove(`${formName}__form-error_display`);
      errorElement.textContent = "";
    }
  });
};

export { resetErrors };
