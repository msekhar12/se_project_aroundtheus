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

let profile_pen = document.querySelector(".profile__pen");
//console.log(profile_pen);

profile_pen.addEventListener("click", function (event) {
  let modal_open = document.querySelector(".modal__open");
  let profile_name = document.querySelector(".profile__name");
  let profile_name_tag = document.querySelector(".profile__name-tag");
  let modal_text = document.querySelectorAll(".modal__text");

  user_name = profile_name.textContent;
  user_tag = profile_name_tag.textContent;
  modal_text[0].value = user_name;
  modal_text[1].value = user_tag;

  modal_open.setAttribute("style", "display:flex");
});

let modal_close = document.querySelector(".modal__close");

modal_close.addEventListener("click", function (event) {
  let modal_open = document.querySelector(".modal__open");
  modal_open.setAttribute("style", "display:none");
});
