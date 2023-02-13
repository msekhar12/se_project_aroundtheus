import "../pages/index.css";

import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { Card } from "../components/Card.js";

import { FormValidator } from "../components/FormValidator.js";

import { PopupWithImage } from "../components/PopupWithImage.js";

import { Api } from "../components/Api.js";
import { Popup } from "../components/Popup";

const apiOptions = {
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  token: "51b8259d-f8d1-4b7c-b443-194620edca24",
};

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
const profileAvatar = document.querySelector(".profile__avatar");
const avatarEdit = document.querySelector(".profile__avatar-edit");
const avatarEditModal = document.querySelector("#avatar-edit");

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
//const addCardModal = document.querySelector("#add-card");

//const addCardFormElement = addCardModal.querySelector(".modal__form");
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
    new Api(apiOptions)
      .updateUserInfo({
        name: inputs["profile-modal-name"],
        about: inputs["profile-modal-job"],
      })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(
            `Error while updating the Profile: ${result.status}`
          );
        }
      })
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        console.log(data);
        profileForm.close();
      })
      .catch((errMessage) => {
        console.log(errMessage);
        profileForm.close();
      });

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
  const card = new Card({
    data: item,
    selector: cardTemplateID,
    clickEventHandler: () => {
      modalCard.open({
        src: item.link,
        alt: item.name,
      });
    },
    deleteEventHandler: () => {
      const deleteCardConfirmation = new PopupWithForm({
        modalSelector: "#delete-card-confirmation",
        handleFormSubmit: () => {
          new Api(apiOptions).deleteCard(item.imageId).then((result) => {
            if (result.ok) {
              console.log(result);
              card.removeCardElement();
              deleteCardConfirmation.close();
            } else {
              console.log(`Error while deleting the card. ${result.status}`);
            }
          });
        },
      });
      deleteCardConfirmation.open();
    },
    likeEventHandler: () => {
      new Api(apiOptions)
        .updateLikeCard(item.imageId, card.isCardLiked())
        .then((result) => {
          if (result.ok) {
            console.log(result);
            return result.json();
          } else {
            return Promise.reject(
              `Error while updating the likes. ${result.status}`
            );
          }
        })
        .then((result) => {
          console.log(result);
          if (checkCardLike(result.likes)) {
            card.likeCard();
          } else {
            card.unlikeCard();
          }
          card.updateLikes(result.likes.length);
        })
        .catch((errMessage) => {
          console.log(errMessage);
        });
    },
  });
  return card;
}

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

    new Api(apiOptions)
      .addNewPicture(item)
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(
            `Error while adding new image: ${result.status}`
          );
        }
      })
      .then((data) => {
        const card = createCard({
          name: data.name,
          link: data.link,
          ownerInd: data.ownerInd,
          cardLiked: false,
          likes: 0,
        });
        const cardElement = card.getCardElement();
        cardsList.prependItem(cardElement);
        addCardForm.close();
      })
      .catch((errMessage) => {
        console.log(errMessage);
        addCardForm.close();
      });

    //addCardForm.reset();
  },
});

function handleCardAddButtonClick() {
  addCardForm.open();
}

addCardButton.addEventListener("click", handleCardAddButtonClick);

function addInitialCards(initialCards) {
  cardsList = new Section(
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
}

function addProfileInfo(profileInfo, initialCards) {
  profileName.textContent = profileInfo.name;
  profileNameTag.textContent = profileInfo.about;
  profileAvatar.src = profileInfo.avatar;
  profileAvatar.alt = `Profile of ${profileInfo.name}`;

  profileAvatar.onload = () => {
    addInitialCards(initialCards);
  };
  profileAvatar.onerror = () => console.log("Error: Not able to load Avatar!!");
}

profileAvatar.addEventListener("mouseover", (event) => {
  avatarEdit.classList.add("profile__avatar-edit_show");
});

avatarEdit.addEventListener("mouseout", (event) => {
  avatarEdit.classList.remove("profile__avatar-edit_show");
});

avatarEdit.addEventListener("click", (event) => {
  console.log(avatarEditModal.classList);
  avatarEditModal.classList.add("modal_open");
});

// profileAvatar.addEventListener("mouseout", (event) => {
// avatarEdit.classList.remove("profile__avatar-edit_show");
// });

// This variable will be updated in addInitialCards() function,
// which will be called in the promise, after the cards have been read.
// cardsList is required later, when we add new cards to the page.
// This variable cannot be a const, as I cannot assign a new value

let cardsList = "";

//profileInfo contains the user details (like their id, name and about info)
//It will be filled via an API call
const profileInfo = {};

//Checks if the user ID is one of the IDs who liked the photo
function checkCardLike(likes) {
  for (let i = 0; i < likes.length; i++) {
    if (likes[i]._id == profileInfo._id) {
      return true;
    }
  }
  return false;
}

function loadInitialPage() {
  const initialCards = [];

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
    profileInfo.name = result[1].name;
    profileInfo.about = result[1].about;
    profileInfo.avatar = result[1].avatar;
    profileInfo._id = result[1]._id;

    //ownerInd will help us to determine if the photo is owned by the user
    // If owned by the user, we will add the delete bin to the photo,
    // else we will not add delete bin to the photo
    result[0].forEach((element) => {
      const ownerInd = profileInfo._id === element.owner._id;

      const cardLiked = checkCardLike(element.likes);
      initialCards.push({
        name: element.name,
        link: element.link,
        likes: element.likes.length,
        ownerInd: ownerInd,
        imageId: element._id,
        cardLiked: cardLiked,
      });
    });
    addProfileInfo(profileInfo, initialCards);
  });
}

loadInitialPage();
