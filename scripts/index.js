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

// Create all gloabal variables (for performance improvement)
// These are referenced in functions
const modal = document.querySelector(".modal");

// Handle profile pen button click

// Helper function to open profile form
function openModal() {
  modal.classList.add("modal_open");
}

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

// Helper function to close profile form
function closeModal() {
  modal.classList.remove("modal_open");
}

const profilePen = document.querySelector(".profile__pen");

function editProfile(event) {
  const profileModal = document.querySelector(".profile-modal");
  fillProfileForm(profileModal);
  openModal();
}

profilePen.addEventListener("click", editProfile);

// Handle profile modal close button click
const profileModalClose = document.querySelector(".profile-modal__close");

profileModalClose.addEventListener("click", closeModal);

// Handle modal Form
const profileFormElement = document.querySelector(".profile-modal__form");

function handleProfileFormSubmit(event) {
  // Without the following line (PreventDefault()), the page will be reloaded on submission.
  // This will prevent us from seeing the changes and persisting the changes
  // onto the page
  event.preventDefault();

  const profileModalNameText = event.target.querySelector(
    ".profile-modal__name-text"
  );
  const profileModalJobText = event.target.querySelector(
    ".profile-modal__job-text"
  );

  const profileName = document.querySelector(".profile__name");
  const profileNameTag = document.querySelector(".profile__name-tag");

  profileName.textContent = profileModalNameText.value;
  profileNameTag.textContent = profileModalJobText.value;

  closeModal();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Add cards using template logic
const cardTemplate = document.querySelector("#card").content;

function getCardElement(data) {
  // Add cards using template logic
  //const cardTemplate = document.querySelector("#card").content;
  // cardTemplate is already defined outside the function
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardLabel = cardElement.querySelector(".card__label-text");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardLabel.textContent = data.name;

  return cardElement;
}

// Read the content__list class (Un-ordered list)
// Then add list items to this in a loop.
// list item is nothing but a card
contentList = document.querySelector(".content__list");
initialCards.forEach((data) => contentList.append(getCardElement(data)));
