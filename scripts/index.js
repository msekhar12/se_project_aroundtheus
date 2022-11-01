// import { resetValidation, disableSubmit } from "./validation.js";

import { Card } from "./Card.js";

import { openModal, closeModal } from "./utils.js";

import { FormValidator } from "./FormValidator.js";

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
  inputErrorSelector: ".modal__input-error",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_inactive",
  errorClass: "modal__input-error_display",
};

// Global variable to select all forms
// Also convert the pseudo array to normal array using Array.from().
// Without using Array.from(), we cannot parse through the forms to enable
// input field validation
const allForms = Array.from(
  document.querySelectorAll(configDict["formSelector"])
);

// Global variables to support Profile editing/saving
const profilePen = document.querySelector(".profile__pen");
const profileName = document.querySelector(".profile__name");
const profileNameTag = document.querySelector(".profile__name-tag");

const profileModal = document.querySelector("#profile-edit");
const profileFormElement = profileModal.querySelector(".modal__form");
const profileFormName = profileFormElement["name"];
const profileModalNameInput = profileModal.querySelector("#profile-modal-name");
const profileModalJobInput = profileModal.querySelector("#profile-modal-job");

// Global variables for card template
const cardTemplateID = "#card";

// Global variable for all cards container
const contentList = document.querySelector(".content__list");

// Global variables to support new card addition logic
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const addCardFormName = addCardFormElement["name"];
const cardTitle = addCardModal.querySelector("#add-card-title");
const cardURL = addCardModal.querySelector("#add-card-image-url");

// Add forms input validators
// formValidators objects will contain the form name as the key
// and FormValidator object as its value.
const formValidators = {};

allForms.forEach((form) => {
  const formValidator = new FormValidator(configDict, form);
  formValidators[form["name"]] = formValidator;
  formValidator.enableValidation();
});

/*---------------------------------*/
/* Handle profile pen button click */
/*---------------------------------*/
// Helper function to fill the profile form once visible
function fillProfileForm() {
  profileModalNameInput.value = profileName.textContent;
  profileModalJobInput.value = profileNameTag.textContent;
}

function handleEditProfile() {
  formValidators[profileFormName].resetValidation();
  fillProfileForm();
  openModal(profileModal);
}

profilePen.addEventListener("click", handleEditProfile);

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

// Fill with default cards initially

const createCard = (item) => {
  const card = new Card(item, cardTemplateID);
  const cardElement = card.getCardElement();
  return cardElement;
};

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  contentList.append(cardElement);
});

/*---------------------------------*/
/* New cards addition logic        */
/*---------------------------------*/

// Handle the ADD button (to add cards)
function handleCardAddButtonClick() {
  openModal(addCardModal);
}

addCardButton.addEventListener("click", handleCardAddButtonClick);

function handleCreateCardSubmit(event) {
  event.preventDefault();
  const cardElement = createCard({
    name: cardTitle.value,
    link: cardURL.value,
  });
  contentList.prepend(cardElement);

  closeModal(addCardModal);
  // Reset the form so that the previous values are not loaded

  // formValidators[addCardFormName].resetValidation();
  addCardFormElement.reset();
  // The reset() will handle the submit button disable.
  // Since we included a customized reset handler
  // See _setEventListeners() in FormValidator.js
}

addCardFormElement.addEventListener("submit", handleCreateCardSubmit);
