export const configDict = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorSelector: ".modal__input-error",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_inactive",
  errorClass: "modal__input-error_display",
};

export const profilePen = document.querySelector(".profile__pen");
export const profileAvatar = document.querySelector(".profile__avatar");
export const avatarEdit = document.querySelector(".profile__avatar-edit");

const profileModal = document.querySelector("#profile-edit");
const profileFormElement = profileModal.querySelector(".modal__form");
export const profileFormName = profileFormElement["name"];
export const profileModalNameInput = profileModal.querySelector(
  "#profile-modal-name"
);
export const profileModalJobInput =
  profileModal.querySelector("#profile-modal-job");

// Global variables for card template
export const cardTemplateID = "#card";

// Global variables to support new card addition logic
export const addCardButton = document.querySelector(".profile__add-button");
