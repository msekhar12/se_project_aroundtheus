// Global variable to support overlay click
const allModals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".modal__close");

/*---------------------------------*/
/* All General Helper Functions    */
/*---------------------------------*/
function handleEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_open");
    closeModal(modalOpened);
  }
}

function openModal(modal) {
  window.addEventListener("keydown", handleEsc);
  modal.classList.add("modal_open");
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
  window.removeEventListener("keydown", handleEsc);
}

// find all close buttons
closeButtons.forEach((button) => {
  // find the closest popup
  const modal = button.closest(".modal");
  // set the listener
  button.addEventListener("click", () => closeModal(modal));
});

// Handle overlay mouse click

/* 
Why mousedown, instead of click in the below code?
If click is used:
    If the user clicks on an input element of the modal,
    then click event is fired at the input element level,
    and also at the modal (popup) level.
    If we define the click handler at the popup level,
    we will have the following situations:
    1. If a user clicks on the popup's input element,
    then due to event bubbling, the click reaches to the
    popup level handler. Since we are checking the 
    presence of "modal_open" in the classes of the event,
    nothing happens. So the code works correctly here.

    2. If a user clicks on the popup (outside the form), then 
    the condition of the event object containing "modal_open" 
    in it's class list is satisfied, and the popup is closed.
    This scenario also works well.

    3. The user mouse down on the form, but releases outside the 
    form. In this scenario, it is counted as click at the popup level
    (same as scenario 2). This will close the popup. This functionality
    is incorrect.

    4. If the user mouse down on outside the form, but releases on
    an input element. This is also counted as click at the popup
    level (scenario 2), and closes the popup. This works correctly.

To handle the problem with scenario-3, we have to use the mousedown

If mousedown is used at the modal(popup) level:
    1. The first scenatrio works. Since the mousedown is 
    happening at the input element level, the event object 
    does not contain the modal_open in its class list

    2. The second scenario is covered. 

    3. The third scenario is covered, since the mouse down is 
    happening at the input element level

    4. The fourth scenario is also covered.
*/
allModals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_open")) {
      closeModal(modal);
    }
  });
});

export { openModal, closeModal };
