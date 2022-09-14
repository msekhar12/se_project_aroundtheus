/*let initialCards = [
  { name: "Yosemite Valley", link: "../images/yosemite-valley.jpg" },
  { name: "Lake Louise", link: "../images/lake-louise.png" },
  { name: "Bald Mountains", link: "../images/bald-mountains.png" },
  { name: "Latemar", link: "../images/latemar.png" },
  {
    name: "Vanoise National Park",
    link: "../images/vanoise-national-park.jpg",
  },
  { name: "Lago di Braies", link: "../images/lago-di-braies.png" },
];

console.log(initialCards);*/

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

// Handle profile pen button click

// Helper function to open profile form
function openProfileModal() {
  const profileModal = document.querySelector(".profile-modal");
  profileModal.classList.add("profile-modal_open");
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
function closeProfileModal() {
  const profileModal = document.querySelector(".profile-modal");
  console.log(profileModal);
  profileModal.classList.remove("profile-modal_open");
}

let profilePen = document.querySelector(".profile__pen");

function editProfile(event) {
  let profileModal = document.querySelector(".profile-modal");
  fillProfileForm(profileModal);
  openProfileModal();
}

profilePen.addEventListener("click", editProfile);

// Handle profile modal close button click
let profileModalClose = document.querySelector(".profile-modal__close");
console.log(profileModalClose);

profileModalClose.addEventListener("click", closeProfileModal);

// Handle modal Form
const profileFormElement = document.querySelector(".profile-modal__form");

function handleProfileFormSubmit(event) {
  // Without the following line (PreventDefault()), the page will be reloaded on submission.
  // This will prevent us from seeing the changes and persisting the changes
  // onto the page
  event.preventDefault();

  let profileModalNameText = event.target.querySelector(
    ".profile-modal__name-text"
  );
  let profileModalJobText = event.target.querySelector(
    ".profile-modal__job-text"
  );

  let profileName = document.querySelector(".profile__name");
  let profileNameTag = document.querySelector(".profile__name-tag");

  profileName.textContent = profileModalNameText.value;
  profileNameTag.textContent = profileModalJobText.value;
  let modalOpen = document.querySelector(".modal__open");
  closeProfileModal();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Add cards using template logic
let cardTemplate = document.querySelector("#card").content;
let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

function getCardElement(data) {
  // Add cards using template logic
  const cardTemplate = document.querySelector("#card").content;
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
