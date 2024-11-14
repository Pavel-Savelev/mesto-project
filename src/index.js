const places__list = document.querySelector(".places__list");


//function for add card
function renderCard(card) {
  places__list.appendChild(card);
}
//massive card
initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard));
});
// -------------------------CREATE CARD FROM ARRAY FINISH-------------------------------//

//-----------------------------FORMS----------------------------------//
const close_form = document.querySelectorAll(".popup__close"); // close popup
const button__save = document.querySelectorAll(".popup__button"); // close popup

//--------FORM-EDIT--------//
const button_edit = document.querySelector(".profile__edit-button");
const popup_edit_default = document.querySelector(".popup.popup_type_edit");
form_fnc(button_edit, popup_edit_default, close_form, button__save);
//--------FORM-EDIT-FINISH--------//

//-------FORM-ADD-CARD------//
const button__add = document.querySelector(".profile__add-button");
const popup_add_default = document.querySelector(".popup.popup_type_new-card");
form_fnc(button__add, popup_add_default, close_form, button__save);
//-------FORM-ADD-CARD-FINISH------//

//-----------------------------FROMS FINISH--------------------------//

//---------------------------FORM SAVE VALUE FOR INPUT'S PROFILE-------------------------//
const formElement = document.querySelector('form[name="edit-profile"]');
document.querySelector(".popup__input_type_name").value =
  document.querySelector(".profile__title").textContent;
document.querySelector(".popup__input_type_description").value =
  document.querySelector(".profile__description").textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(".popup__input_type_name").value;
  const jobInput = document.querySelector(
    ".popup__input_type_description"
  ).value;
  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__description").textContent = jobInput;
}

formElement.addEventListener("submit", handleFormSubmit);
//---------------------------FORM SAVE VALUE FOR INPUT'S PROFILE FINISH---------------//

//---------------------------FORM FOR INPUT'S CARD-------------------------//
const form__place = document.querySelector('form[name="new-place"]'); //form__place
const list_card = document.querySelector(".places__list");

const container__list = document.querySelector(".places__list");

function cardElements(evt) {
  evt.preventDefault();
  const name__card = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const url__card = document.querySelector(".popup__input_type_url").value;
  const new__card = {
    name: name__card,
    link: url__card,
  };
  initialCards.unshift(new__card);

  const container__list__item = document.createElement("li");
  container__list__item.classList.add("places__item");
  container__list__item.classList.add("card");

  const container__list__item__img = document.createElement("img");
  container__list__item__img.classList.add("card__image");
  container__list__item__img.src = new__card.link;
  container__list__item__img.alt = new__card.name;

  const delete__button = document.createElement("button");
  delete__button.type = "button";
  delete__button.classList.add("card__delete-button");

  const block_div = document.createElement("div");
  block_div.classList.add("card__description");

  const card__name = document.createElement("h2");
  card__name.classList.add("card__title");
  card__name.textContent = new__card.name;

  const like__button = document.createElement("button");
  like__button.classList.add("card__like-button");

  container__list.appendChild(container__list__item);
  container__list__item.appendChild(container__list__item__img);
  container__list__item.appendChild(delete__button);
  container__list__item.appendChild(block_div);
  block_div.appendChild(card__name);
  block_div.appendChild(like__button);

  container__list.prepend(container__list__item)

  document.querySelector(".popup__input_type_card-name").value = "";
  document.querySelector(".popup__input_type_url").value = "";

  like__button.addEventListener("click", function () {
    like__button.classList.toggle("card__like-button_is-active");
  });

  delete__button.addEventListener("click", function(){
    container__list__item.remove()
  });

  card__use(initialCards[0].name, initialCards[0].link);
}



form__place.addEventListener("submit", cardElements);
//---------------------------FORM FOR INPUT'S CARD FINISH-------------------------//

function card__use(name, link) {
  const card__image__active = document.querySelectorAll(".card__image");
  card__image__active.forEach((image) =>
    image.addEventListener("click", function () {
      const popup_type_image = document.querySelector(
        ".popup.popup_type_image"
      );
      const image__place = document.querySelector(".popup__image");
      image__place.src = link;
      const discription__place = document.querySelector(".popup__caption");
      discription__place.textContent = name;
      form_fnc(image, popup_type_image, close_form);
    })
  );
}

initialCards.forEach((card) => {
  card__use(card.name, card.link);
});
