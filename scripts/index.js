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

// Preload some elements to avoid redundant loading
const imageModalContainer = document.querySelector(".image-modal-container");

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
  const profileName = document.querySelector(".profile__name");
  const profileNameTag = document.querySelector(".profile__name-tag");
  const profileModallNameText = profileModal.querySelector(
    ".profile-modal__name-text"
  );
  const profileModalJobText = profileModal.querySelector(
    ".profile-modal__job-text"
  );
  profileModallNameText.value = profileName.textContent;
  profileModalJobText.value = profileNameTag.textContent;
}

const profilePen = document.querySelector(".profile__pen");

function editProfile(event) {
  const profileModal = document.querySelector(".profile-modal");
  fillProfileForm(profileModal);
  openModal(profileModal.closest(".modal"));
}

profilePen.addEventListener("click", editProfile);

// Handle profile modal close button click
const profileModalClose = document.querySelector(".profile-modal__close");

profileModalClose.addEventListener("click", () => {
  closeModal(profileModalClose.closest(".modal"));
});

// Handle modal Form
const profileFormElement = document.querySelector(".profile-modal__form");

function handleProfileFormSubmit(event) {
  // Without the following line (PreventDefault()), the page will be reloaded on submission.
  // This will prevent us from seeing the changes and persisting the changes
  // onto the page
  event.preventDefault();

  const profileModalNameText = document.querySelector(
    ".profile-modal__name-text"
  );
  const profileModalJobText = document.querySelector(
    ".profile-modal__job-text"
  );
  const profileName = document.querySelector(".profile__name");
  const profileNameTag = document.querySelector(".profile__name-tag");

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

function toggleLike(event) {
  event.target.classList.toggle("card__heart_like");
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function openImageModal(event) {
  const imageURL = event.target.src;
  const imageText = event.target.alt;
  imageModalContainer.querySelector(".image-modal__expanded").src = imageURL;
  imageModalContainer.querySelector(".image-modal__label").textContent =
    imageText;
  imageModalContainer.closest(".modal").classList.add("modal_open");
}

function closeImageModal(event) {
  imageModalContainer.closest(".modal").classList.remove("modal_open");
}

const imageModalClose = document.querySelector(".image-modal-container__close");
imageModalClose.addEventListener("click", closeImageModal);

// Add cards using template logic
const cardTemplate = document.querySelector("#card").content;

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

  cardLikeButton.addEventListener("click", toggleLike);
  deleteCardButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", openImageModal);

  return cardElement;
}

// Fill with default cards initially
contentList = document.querySelector(".content__list");
initialCards.forEach((data) => contentList.append(getCardElement(data)));

/*---------------------------------*/
/* New cards addition logic        */
/*---------------------------------*/

// Handle add card modal close button click
const addCardModalClose = document.querySelector(".add-card-modal__close");

addCardModalClose.addEventListener("click", () => {
  closeModal(addCardModalClose.closest(".modal"));
});

// Handle the ADD button (to add cards)
const addCardButton = document.querySelector(".profile__add-button");

function addCardButtonClick(event) {
  const addCardModal = document.querySelector(".add-card-modal");
  openModal(addCardModal.closest(".modal"));
}

addCardButton.addEventListener("click", addCardButtonClick);

const addCardCreateButton = document.querySelector(".add-card-modal__button");

function createNewCard(event) {
  event.preventDefault();
  const cardTitle = document.querySelector(".add-card-modal__title-text").value;

  const cardURL = document.querySelector(".add-card-modal__image-url").value;

  if (cardURL) {
    const card = getCardElement({ name: cardTitle, link: cardURL });
    contentList.prepend(card);
  }

  closeModal(addCardModalClose.closest(".modal"));
  // Reset the form so that the previous values are not loaded
  document.querySelector(".add-card-modal__form").reset();
}

addCardCreateButton.addEventListener("click", createNewCard);
