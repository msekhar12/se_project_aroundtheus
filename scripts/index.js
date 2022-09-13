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
let initialCards = [
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

// Handle profile pen button
let profilePen = document.querySelector(".profile__pen");

profilePen.addEventListener("click", function (event) {
  let modalOpen = document.querySelector(".modal__open");
  let profileName = document.querySelector(".profile__name");
  let profileNameTag = document.querySelector(".profile__name-tag");
  let modalNameText = document.querySelector(".modal__name-text");
  let modalJobText = document.querySelector(".modal__job-text");

  userName = profileName.textContent;
  userTag = profileNameTag.textContent;
  modalNameText.value = userName;
  modalJobText.value = userTag;

  modalOpen.setAttribute("style", "display:flex");
});

// Handle modal close
let modalClose = document.querySelector(".modal__close");

modalClose.addEventListener("click", function (event) {
  let modalOpen = document.querySelector(".modal__open");
  modalOpen.setAttribute("style", "display:none");
});

// Handle modal Form
const profileFormElement = document.querySelector(".modal__form");

function handleProfileFormSubmit(event) {
  // Without the following line (PreventDefault()), the page will be reloaded on submission.
  // This will prevent us from seeing the changes and persisting the changes
  // onto the page
  event.preventDefault();
  let modalNameText = event.target.querySelector(".modal__name-text");
  let modalJobText = event.target.querySelector(".modal__job-text");

  let profileName = document.querySelector(".profile__name");
  let profileNameTag = document.querySelector(".profile__name-tag");

  profileName.textContent = modalNameText.value;
  profileNameTag.textContent = modalJobText.value;
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
