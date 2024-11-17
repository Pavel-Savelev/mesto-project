import "./pages/index.css";
import { createCard } from "./scripts/cards";
import { initialCards } from "./scripts/initialCards";
import { openModal, closeModal } from "./scripts/modal";

const placesList = document.querySelector(".places__list");
const closeFormButtons = document.querySelectorAll(".popup__close"); // close popup
const closeOverlays = document.querySelectorAll(".popup");

const inputTypeName = document.querySelector(".popup__input_type_name");
const profileTitle = document.querySelector(".profile__title");
const inputTypeDescription = document.querySelector(
  ".popup__input_type_description"
);
const profileDescription = document.querySelector(".profile__description");
//massive card
initialCards.forEach((card) => {
  renderCard(
    createCard(card, { handleDeleteCard, handlelikeCard, handleImageClick })
  );
});

//function for add card
function renderCard(card) {
  placesList.appendChild(card);
}

function handleDeleteCard(card) {
  return card.remove();
}

function handlelikeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

function handleImageClick(popup, data) {
  const popupImage = document.querySelector(".popup__image");
  popupImage.src = data.link;
  popupImage.alt = data.name;
  const popupCaption = document.querySelector(".popup__caption");
  popupCaption.textContent = data.name;
  closeEventButtons(popup, closeFormButtons, closeOverlays);
  openModal(popup);
}
// -------------------------CREATE CARD FROM ARRAY FINISH-------------------------------//

function closeEventButtons(popup, closeButtons, closeOverlays) {
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => closeModal(popup));
  });

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closeModal(popup);
    }
  });
  closeOverlays.forEach((overlay) => {
    overlay.addEventListener("click", function (e) {
      if (e.target === popup) {
        closeModal(popup);
      }
    });
  });
}
//-----------------------------FORMS----------------------------------//

//--------FORM-EDIT--------//
const button_edit = document.querySelector(".profile__edit-button");
const popup_edit_default = document.querySelector(".popup.popup_type_edit");
button_edit.addEventListener("click", () => openModal(popup_edit_default));
closeEventButtons(popup_edit_default, closeFormButtons, closeOverlays);
//--------FORM-EDIT-FINISH--------//

//-------FORM-ADD-CARD------//
const button__add = document.querySelector(".profile__add-button");
const popup_add_default = document.querySelector(".popup.popup_type_new-card");
button__add.addEventListener("click", () => openModal(popup_add_default));
closeEventButtons(popup_add_default, closeFormButtons, closeOverlays);
//-------FORM-ADD-CARD-FINISH------//

//-----------------------------FROMS FINISH--------------------------//

//---------------------------FORM SAVE VALUE FOR INPUT'S PROFILE-------------------------//
const formEdit = document.forms["edit-profile"];
inputTypeName.value = profileTitle.textContent;
inputTypeDescription.value = profileDescription.textContent;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = inputTypeName.value;
  const jobInput = inputTypeDescription.value;
  profileTitle.textContent = nameInput;
  profileDescription.textContent = jobInput;
  closeModal(popup_edit_default)
}

formEdit.addEventListener("submit", handleProfileFormSubmit);
//---------------------------FORM SAVE VALUE FOR INPUT'S PROFILE FINISH---------------//

//---------------------------FORM FOR INPUT'S CARD-------------------------//
const cardForm = document.forms["new-place"];
// const container__list = document.querySelector(".places__list");

function handleCardFormSubmit(evt) {
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

  const card = createCard(new__card, {
    handleDeleteCard,
    handlelikeCard,
    handleImageClick,
  });

  closeModal(popup_add_default)
  placesList.prepend(card);
  cardForm.reset();
}

cardForm.addEventListener("submit", handleCardFormSubmit);
//---------------------------FORM FOR INPUT'S CARD FINISH-------------------------//
