import "../pages/index.css";

import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { Card } from "../components/Card.js";

import { FormValidator } from "../components/FormValidator.js";

import { PopupWithImage } from "../components/PopupWithImage.js";

import { Api } from "../components/Api.js";

const apiOptions = {
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  token: "51b8259d-f8d1-4b7c-b443-194620edca24",
};

// const yosmiteImage = "https://code.s3.yandex.net/web-code/yosemite.jpg";
// const lakeLousieImage = "https://code.s3.yandex.net/web-code/lake-louise.jpg";
// const baldMountainsImage =
//   "https://code.s3.yandex.net/web-code/bald-mountains.jpg";
// const latemarImage = "https://code.s3.yandex.net/web-code/latemar.jpg";
// const vanoiseNationalImage = "https://code.s3.yandex.net/web-code/vanoise.jpg";
// const lagoDiBraiesImage = "https://code.s3.yandex.net/web-code/lago.jpg";

// const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: yosmiteImage,
//   },

//   ,
//   {
//     name: "Lake Louise",
//     link: lakeLousieImage,
//   },
//   {
//     name: "Bald Mountains",
//     link: baldMountainsImage,
//   },
//   { name: "Latemar", link: latemarImage },
//   {
//     name: "Vanoise National Park",
//     link: vanoiseNationalImage,
//   },
//   {
//     name: "Lago di Braies",
//     link: lagoDiBraiesImage,
//   },
// ];

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
//const profileName = document.querySelector(".profile__name");
//const profileNameTag = document.querySelector(".profile__name-tag");

const profileModal = document.querySelector("#profile-edit");
const profileFormElement = profileModal.querySelector(".modal__form");
const profileFormName = profileFormElement["name"];
const profileModalNameInput = profileModal.querySelector("#profile-modal-name");
const profileModalJobInput = profileModal.querySelector("#profile-modal-job");

// Global variables for card template
const cardTemplateID = "#card";

// Global variable for all cards container
// const contentList = document.querySelector(".content__list");

// Global variables to support new card addition logic
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card");
const addCardFormElement = addCardModal.querySelector(".modal__form");
//const addCardFormName = addCardFormElement["name"];
//const cardTitle = addCardModal.querySelector("#add-card-title");
//const cardURL = addCardModal.querySelector("#add-card-image-url");

// Add forms input validators
// formValidators objects will contain the form name as the key
// and FormValidator object as its value.
const formValidators = {};

allForms.forEach((form) => {
  const formValidator = new FormValidator(configDict, form);
  formValidators[form["name"]] = formValidator;
  formValidator.enableValidation();
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__name-tag",
});

// Create profileForm object
const profileForm = new PopupWithForm({
  modalSelector: "#profile-edit",
  handleFormSubmit: (inputs) => {
    userInfo.setUserInfo(
      inputs["profile-modal-name"],
      inputs["profile-modal-job"]
    );
    profileForm.close();
    //profileForm.reset();
  },
});

/*---------------------------------*/
/* Handle profile pen button click */
/*---------------------------------*/
// Helper function to fill the profile form once visible
function fillProfileForm() {
  const profile = userInfo.getUserInfo();
  profileModalNameInput.value = profile.profileName;
  profileModalJobInput.value = profile.profileJob;
}

function handleEditProfile() {
  formValidators[profileFormName].resetValidation();
  fillProfileForm();
  profileForm.open();
}

profilePen.addEventListener("click", handleEditProfile);

/*---------------------------------*/
/* Handle cards addition logic     */
/*---------------------------------*/

const modalCard = new PopupWithImage("#image-modal");

// Fill with default cards initially
// ({ items, renderer }, containerSelector)
//    handleDeleteCard, handleLikeCard, handleExpandCard
function createCard(item) {
  return new Card({
    data: item,
    selector: cardTemplateID,
    clickEventHandler: () => {
      modalCard.open({
        src: item.link,
        alt: item.name,
      });
    },
  });
}

// const cardsList = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       const card = createCard(item);
//       const cardElement = card.getCardElement();
//       cardsList.addItem(cardElement);
//     },
//   },
//   ".content__list"
// );

// cardsList.renderItems();

/*---------------------------------*/
/* New cards addition logic        */
/*---------------------------------*/

// Handle the ADD button (to add cards)
// modalSelector, handleFormSubmit
const addCardForm = new PopupWithForm({
  modalSelector: "#add-card",
  handleFormSubmit: (inputs) => {
    const item = {
      name: inputs["add-card-title"],
      link: inputs["add-card-image-url"],
    };
    const card = createCard(item);
    const cardElement = card.getCardElement();
    cardsList.prependItem(cardElement);
    addCardForm.close();
    //addCardForm.reset();
  },
});

function handleCardAddButtonClick() {
  addCardForm.open();
}

addCardButton.addEventListener("click", handleCardAddButtonClick);

function loadInitialPage() {
  const initialCards = [];
  const profileInfo = {};
  const cardData = new Api(apiOptions)
    .getInitialCards()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });

  const userData = new Api(apiOptions)
    .getUserInfo()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });

  new Api(apiOptions).performPromiseAll([cardData, userData]).then((result) => {
    result[0].forEach((element) =>
      initialCards.push({ name: element.name, link: element.link })
    );
    const cardsList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const card = createCard(item);
          const cardElement = card.getCardElement();
          cardsList.addItem(cardElement);
        },
      },
      ".content__list"
    );

    cardsList.renderItems();

    profileInfo.name = result[1].name;
    profileInfo.about = result[1].about;
    profileInfo.avatar = result[1].avatar;
  });
}

loadInitialPage();
