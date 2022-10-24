import { enableValidation, resetValidation } from "./validation.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  { name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg" },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// Global dict for validation of form elements
const configDict = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorSelector: ".modal__input-error_display",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_inactive",
  errorClass: "modal__input-error_display",
};

// Add forms input validators
enableValidation(configDict);

// Global variable to support overlay click
const allModals = document.querySelectorAll(".modal");

// Global variable to support image modal
const imageModal = document.querySelector("#image-modal");
const imageModalExpanded = imageModal.querySelector(".modal__image-expanded");
const imageModalClose = imageModal.querySelector(".modal__close");
const imageModalLabel = imageModal.querySelector(".modal__image-label");

// Global variables to support Profile editing/saving
const profilePen = document.querySelector(".profile__pen");
const profileName = document.querySelector(".profile__name");
const profileNameTag = document.querySelector(".profile__name-tag");

const profileModal = document.querySelector("#profile-edit");
const profileModalClose = profileModal.querySelector(".modal__close");
const profileFormElement = profileModal.querySelector(".modal__form");
// const profileSubmitButton = profileModal.querySelector(".modal__submit");
const profileModalNameInput = profileModal.querySelector("#profile-modal-name");
const profileModalJobInput = profileModal.querySelector("#profile-modal-job");

// Global variables for card template
const cardTemplate = document.querySelector("#card").content;

// Global variable for all cards container
const contentList = document.querySelector(".content__list");

// Global variables to support new card addition logic
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card");
const addCardModalClose = addCardModal.querySelector(".modal__close");
// const addCardSubmitButton = addCardModal.querySelector(".modal__submit");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitle = addCardModal.querySelector("#add-card-title");
const cardURL = addCardModal.querySelector("#add-card-image-url");

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

/*---------------------------------*/
/* Handle profile pen button click */
/*---------------------------------*/
// Helper function to fill the profile form once visible
function fillProfileForm(profileModal) {
  profileModalNameInput.value = profileName.textContent;
  profileModalJobInput.value = profileNameTag.textContent;
}

function handleEditProfile(event) {
  fillProfileForm(profileModal);
  resetValidation(profileFormElement, configDict);
  openModal(profileModal);
}

profilePen.addEventListener("click", handleEditProfile);

// Handle profile modal close button click
profileModalClose.addEventListener("click", () => {
  closeModal(profileModal);
});

function handleProfileFormSubmit(event) {
  // Without the following line (PreventDefault()), the page will be reloaded on submission.
  // This will prevent us from seeing the changes and persisting the changes
  // onto the page
  event.preventDefault();

  profileName.textContent = profileModalNameInput.value;
  profileNameTag.textContent = profileModalJobInput.value;

  closeModal(profileModal);
}

// Handle profile edit form submit
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

/*---------------------------------*/
/* Handle cards addition logic     */
/*---------------------------------*/

function handleToggleLike(event) {
  event.target.classList.toggle("card__heart_like");
}

function handleDeleteCard(event) {
  event.target.closest(".card").remove();
}

function handleOpenImageModal(event) {
  const imageURL = event.target.src;
  const imageText = event.target.alt;
  imageModalExpanded.src = imageURL;
  imageModalExpanded.alt = imageText;
  // imageModal.querySelector(".image-modal__label").textContent = imageText;
  imageModalLabel.textContent = imageText;
  openModal(imageModal);
}

function handleCloseImageModal(event) {
  closeModal(imageModal);
}

imageModalClose.addEventListener("click", handleCloseImageModal);

// Add cards using template logic
function getCardElement(data) {
  // Add cards using template logic
  // cardTemplate is already defined outside the function
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardLabel = cardElement.querySelector(".card__label-text");
  const cardLikeButton = cardElement.querySelector(".card__heart");
  const deleteCardButton = cardElement.querySelector(".card__delete");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardLabel.textContent = data.name;

  cardLikeButton.addEventListener("click", handleToggleLike);
  deleteCardButton.addEventListener("click", handleDeleteCard);
  cardImage.addEventListener("click", handleOpenImageModal);

  return cardElement;
}

// Fill with default cards initially
initialCards.forEach((data) => contentList.append(getCardElement(data)));

/*---------------------------------*/
/* New cards addition logic        */
/*---------------------------------*/

// Handle add card modal close button click
addCardModalClose.addEventListener("click", () => {
  closeModal(addCardModal);
});

// Handle the ADD button (to add cards)
function handleCardAddButtonClick() {
  openModal(addCardModal);
}

addCardButton.addEventListener("click", handleCardAddButtonClick);

function handleCreateCardSubmit(event) {
  event.preventDefault();

  const card = getCardElement({ name: cardTitle.value, link: cardURL.value });
  contentList.prepend(card);

  closeModal(addCardModal);
  // Reset the form so that the previous values are not loaded
  addCardFormElement.reset();
}

addCardFormElement.addEventListener("submit", handleCreateCardSubmit);

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
