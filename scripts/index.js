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

// Global variable to support image modal
const imageModalContainer = document.querySelector(".image-modal-container");

// Global variables to support Profile editing/saving
const profilePen = document.querySelector(".profile__pen");
const profileName = document.querySelector(".profile__name");
const profileNameTag = document.querySelector(".profile__name-tag");
const profileModal = document.querySelector(".profile-modal");
const profileModalClose = document.querySelector(".profile-modal__close");
const profileFormElement = document.querySelector(".profile-modal__form");

// Global variables for card template
const cardTemplate = document.querySelector("#card").content;

// Global variable for all cards container
const contentList = document.querySelector(".content__list");

// Global variables to support new card addition logic
const addCardModal = document.querySelector(".add-card-modal");
const addCardModalClose = document.querySelector(".add-card-modal__close");
const addCardButton = document.querySelector(".profile__add-button");
const addCardFormElement = document.querySelector(".add-card-modal__form");

/*---------------------------------*/
/* All General Helper Functions    */
/*---------------------------------*/
function openModal(modal) {
  modal.classList.add("modal_open");
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
}

/*---------------------------------*/
/* Handle profile pen button click */
/*---------------------------------*/
// Helper function to fill the profile form once visible
function fillProfileForm(profileModal) {
  const profileModallNameText = profileModal.querySelector(
    ".profile-modal__name-text"
  );
  const profileModalJobText = profileModal.querySelector(
    ".profile-modal__job-text"
  );

  profileModallNameText.value = profileName.textContent;
  profileModalJobText.value = profileNameTag.textContent;
}

function handleEditProfile(event) {
  fillProfileForm(profileModal);
  openModal(profileModal.closest(".modal"));
}

profilePen.addEventListener("click", handleEditProfile);

// Handle profile modal close button click
profileModalClose.addEventListener("click", () => {
  closeModal(profileModalClose.closest(".modal"));
});

function handleProfileFormSubmit(event) {
  // Without the following line (PreventDefault()), the page will be reloaded on submission.
  // This will prevent us from seeing the changes and persisting the changes
  // onto the page
  event.preventDefault();

  const profileModalNameText = profileModal.querySelector(
    ".profile-modal__name-text"
  );

  const profileModalJobText = profileModal.querySelector(
    ".profile-modal__job-text"
  );

  profileName.textContent = profileModalNameText.value;
  profileNameTag.textContent = profileModalJobText.value;

  closeModal(profileModalClose.closest(".modal"));
}

// Handle profile edit form submit
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

/*---------------------------------*/
/* Handle cards addition logic     */
/*---------------------------------*/

// Card Functions

/*function toggleLike(event) {
  if (event.target.classList.contains("card__heart-like")) {
    event.target.classList.remove("card__heart-like");
    event.target.classList.add("card__heart");
  } else if (event.target.classList.contains("card__heart")) {
    event.target.classList.remove("card__heart");
    event.target.classList.add("card__heart-like");
  }
}*/

function handleToggleLike(event) {
  event.target.classList.toggle("card__heart_like");
}

function handleDeleteCard(event) {
  event.target.closest(".card").remove();
}

function handleOpenImageModal(event) {
  const imageURL = event.target.src;
  const imageText = event.target.alt;
  const imageModalExpanded = imageModalContainer.querySelector(
    ".image-modal__expanded"
  );
  imageModalExpanded.src = imageURL;
  imageModalExpanded.alt = imageText;
  imageModalContainer.querySelector(".image-modal__label").textContent =
    imageText;

  openModal(imageModalContainer.closest(".modal"));
}

function handleCloseImageModal(event) {
  closeModal(imageModalContainer.closest(".modal"));
}

const imageModalClose = document.querySelector(".image-modal-container__close");
imageModalClose.addEventListener("click", handleCloseImageModal);

// Add cards using template logic
function getCardElement(data) {
  // Add cards using template logic
  //const cardTemplate = document.querySelector("#card").content;
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
  closeModal(addCardModalClose.closest(".modal"));
});

// Handle the ADD button (to add cards)
function handleCardButtonClick(event) {
  openModal(addCardModal.closest(".modal"));
}

addCardButton.addEventListener("click", handleCardButtonClick);

const cardTitle = document.querySelector(".add-card-modal__title-text");
const cardURL = document.querySelector(".add-card-modal__image-url");

function handleCreateCardSubmit(event) {
  // console.log("sekhar");
  event.preventDefault();

  const card = getCardElement({ name: cardTitle.value, link: cardURL.value });
  contentList.prepend(card);

  closeModal(addCardModalClose.closest(".modal"));
  // Reset the form so that the previous values are not loaded
  document.querySelector(".add-card-modal__form").reset();
}

addCardFormElement.addEventListener("submit", handleCreateCardSubmit);

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
  const button = document.querySelector("#" + formContainer + "__button");

  const formElements = Array.from(evt.currentTarget.elements);

  if (hasInValidInput(formElements)) {
    button.setAttribute("disabled", true);
    button.classList.add(formContainer + "__button-disabled");
    button.classList.remove(formContainer + "__button");
  } else {
    button.removeAttribute("disabled");
    button.classList.add(formContainer + "__button");
    button.classList.remove(formContainer + "__button-disabled");
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

/*Closing pop-up by clicking on the overlay*/

const handleOverLayClick = (evt) => {
  if (evt.currentTarget.classList.contains("modal_open")) {
    if (
      !evt.target.classList.contains("profile-modal__content") &&
      !evt.target.classList.contains("add-card-modal__content") &&
      !evt.target.classList.contains("image-modal")
    ) {
      closeModal(evt.currentTarget);
    }
  }
};

const handleOverLayEsc = (evt) => {
  const modalOpened = document.querySelector(".modal_open");
  if (evt.key === "Escape" && modalOpened) {
    closeModal(modalOpened);
  }
};

Array.from(document.querySelectorAll(".modal")).forEach((element) => {
  element.addEventListener("click", handleOverLayClick);
});

// You cannot define the keydown event at the modal level.
window.addEventListener("keydown", handleOverLayEsc);
