import "../pages/index.css";

import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { Card } from "../components/Card.js";

import { FormValidator } from "../components/FormValidator.js";

import { PopupWithImage } from "../components/PopupWithImage.js";

import { Api } from "../components/Api.js";

import {
  configDict,
  profilePen,
  profileAvatar,
  avatarEdit,
  profileFormName,
  profileModalNameInput,
  profileModalJobInput,
  cardTemplateID,
  addCardButton,
} from "../utils/constants.js";

// Global variable to select all forms
// Also convert the pseudo array to normal array using Array.from().
// Without using Array.from(), we cannot parse through the forms to enable
// input field validation
const allForms = Array.from(
  document.querySelectorAll(configDict["formSelector"])
);

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
  avatarSelector: ".profile__avatar",
  userId: null,
});

const profileEditSubmitButton = document
  .querySelector("#profile-edit")
  .querySelector(".modal__submit");

const profileEditSubmitButtonTextOriginal = profileEditSubmitButton.textContent;

// create an Api object.
// This object's options are set
// whenever we call the functions of this object.
const api = new Api({});

// Create profileForm object
const profileForm = new PopupWithForm({
  modalSelector: "#profile-edit",
  handleFormSubmit: (inputs) => {
    profileEditSubmitButton.textContent = "Saving...";

    const apiOptions = {
      baseUrl: "https://around.nomoreparties.co/v1/group-12",
      headers: {
        authorization: "51b8259d-f8d1-4b7c-b443-194620edca24",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputs["profile-modal-name"],
        about: inputs["profile-modal-job"],
      }),
    };
    api.setOptions(apiOptions);
    api
      .updateUserInfo()
      .then((result) => {
        userInfo.setUserInfo(result.name, result.about);
        profileForm.close();
      })
      .catch((errMessage) => {
        console.log(errMessage);
      })
      .finally(() => {
        profileEditSubmitButton.textContent =
          profileEditSubmitButtonTextOriginal;
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

// The handleFormSubmit is initialized with dummy
// function. This will be set in the deleteEventHandler in the createCard() function
const deleteCardConfirmation = new PopupWithForm({
  modalSelector: "#delete-card-confirmation",
  handleFormSubmit: () => {},
});

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
      const apiOptions = {
        baseUrl: "https://around.nomoreparties.co/v1/group-12",
        headers: {
          authorization: "51b8259d-f8d1-4b7c-b443-194620edca24",
        },
        cardId: item.imageId,
      };

      api.setOptions(apiOptions);

      deleteCardConfirmation.open();
      deleteCardConfirmation.setSubmitAction(() => {
        api
          .deleteCard()
          .then((result) => {
            card.removeCardElement();
            deleteCardConfirmation.close();
          })
          .catch((err) => console.log(err));
      });
    },
    likeEventHandler: () => {
      const apiOptions = {
        baseUrl: "https://around.nomoreparties.co/v1/group-12",
        headers: {
          authorization: "51b8259d-f8d1-4b7c-b443-194620edca24",
        },
        cardId: item.imageId,
        cardLiked: card.isCardLiked(),
      };
      api.setOptions(apiOptions);
      api
        .updateLikeCard()
        .then((result) => {
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
const addCardSubmitButton = document
  .querySelector("#add-card")
  .querySelector(".modal__submit");

const addCardSubmitButtonTextOriginal = addCardSubmitButton.textContent;

// Handle the ADD button (to add cards)
// modalSelector, handleFormSubmit
const addCardForm = new PopupWithForm({
  modalSelector: "#add-card",
  handleFormSubmit: (inputs) => {
    addCardSubmitButton.textContent = "Saving...";

    const item = {
      name: inputs["add-card-title"],
      link: inputs["add-card-image-url"],
    };

    const apiOptions = {
      baseUrl: "https://around.nomoreparties.co/v1/group-12",
      headers: {
        authorization: "51b8259d-f8d1-4b7c-b443-194620edca24",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    api.setOptions(apiOptions);

    api
      .addNewPicture()
      .then((data) => {
        const card = createCard({
          name: data.name,
          link: data.link,
          ownerInd: true,
          cardLiked: false,
          likes: 0,
          imageId: data._id,
        });
        const cardElement = card.getCardElement();
        cardsList.prependItem(cardElement);
        addCardForm.reset();
        addCardForm.close();
      })
      .catch((errMessage) => {
        console.log(errMessage);
        addCardForm.close();
      })
      .finally(() => {
        addCardSubmitButton.textContent = addCardSubmitButtonTextOriginal;
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

function updateProfileAvatar(newAvatar) {
  const oldAvatar = profileAvatar.src;
  userInfo.setAvatar(newAvatar, `Profile of ${profileInfo.name}`);
  profileAvatar.onerror = () => {
    userInfo.setAvatar(oldAvatar, `Profile of ${profileInfo.name}`);
    console.log("Error: Not able to load new Avatar. Avatar unchanged!!");
  };
}

const avatarEditSubmitButton = document
  .querySelector("#avatar-edit")
  .querySelector(".modal__submit");

const avatarEditSubmitButtonTextOriginal = avatarEditSubmitButton.textContent;

const updateAvatarForm = new PopupWithForm({
  modalSelector: "#avatar-edit",
  handleFormSubmit: (inputs) => {
    const newAvatarInfo = {
      avatar: inputs["avatar-url"],
    };

    const apiOptions = {
      baseUrl: "https://around.nomoreparties.co/v1/group-12",
      headers: {
        authorization: "51b8259d-f8d1-4b7c-b443-194620edca24",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAvatarInfo),
    };
    avatarEditSubmitButton.textContent = "Saving...";
    api.setOptions(apiOptions);
    api
      .updateAvatar()
      .then((data) => {
        updateProfileAvatar(inputs["avatar-url"]);
        updateAvatarForm.close();
      })
      .catch((errMessage) => {
        console.log(errMessage);
      })
      .finally(() => {
        avatarEditSubmitButton.textContent = avatarEditSubmitButtonTextOriginal;
      });

    //addCardForm.reset();
  },
});

profileAvatar.addEventListener("mouseover", (event) => {
  avatarEdit.classList.add("profile__avatar-edit_show");
});

avatarEdit.addEventListener("mouseout", (event) => {
  avatarEdit.classList.remove("profile__avatar-edit_show");
});

avatarEdit.addEventListener("click", (event) => {
  updateAvatarForm.open();
});

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
    if (likes[i]._id == profileInfo.userId) {
      return true;
    }
  }
  return false;
}

function loadInitialPage() {
  const initialCards = [];

  const apiOptions = {
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "51b8259d-f8d1-4b7c-b443-194620edca24",
    },
  };

  api.setOptions(apiOptions);

  api
    .performPromiseAll([api.getInitialCards(), api.getUserInfo()])
    .then(([cardsData, userData]) => {
      //profileInfo is a global variable
      profileInfo.name = userData.name;
      profileInfo.about = userData.about;
      profileInfo.avatarUrl = userData.avatar;
      profileInfo.userId = userData._id;

      //Set user info and avatar on the page
      userInfo.setUserInfo(profileInfo.name, profileInfo.about);
      userInfo.setAvatar(
        profileInfo.avatarUrl,
        `Profile of ${profileInfo.name}`
      );

      profileAvatar.onload = () => {
        //ownerInd will help us to determine if the photo is owned by the user
        // If owned by the user, we will add the delete bin to the photo,
        // else we will not add delete bin to the photo
        cardsData.forEach((element) => {
          const ownerInd = profileInfo.userId === element.owner._id;

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

        addInitialCards(initialCards);
      };

      profileAvatar.onerror = () =>
        console.log("Error: Not able to load Avatar!!");

      // addProfileInfo(profileInfo, initialCards);
    })
    .catch((res) => {
      console.log(`Error while loading the initial page: ${res.status}`);
    });
}

loadInitialPage();
