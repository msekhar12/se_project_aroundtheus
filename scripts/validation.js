const resetValidation = (formElement, configDict) => {
  // console.log(formElement);
  const modalInputErrorElements = formElement.querySelectorAll(
    configDict["inputErrorSelector"]
  );

  modalInputErrorElements.forEach((element) => {
    element.classList.remove(configDict["errorClass"]);
  });
};

const disableSubmit = (formElement, configDict) => {
  const submitButton = formElement.querySelector(
    configDict["submitButtonSelector"]
  );
  submitButton.setAttribute("disabled", true);
  submitButton.classList.add(configDict["inactiveButtonClass"]);
};

//enableValidation(configDict);
export { resetValidation, disableSubmit };
