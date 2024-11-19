import "./pages/index.css";
import { createCard } from "./scripts/cards";
import { initialCards } from "./scripts/initialCards";
import { openModal, closeModal } from "./scripts/modal";

const placesList = document.querySelector(".places__list");

const inputTypeName = document.querySelector(".popup__input_type_name");
const profileTitle = document.querySelector(".profile__title");
const inputTypeDescription = document.querySelector(
  ".popup__input_type_description"
);
const profileDescription = document.querySelector(".profile__description");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const nameCard = document.querySelector(".popup__input_type_card-name");
const urlCard = document.querySelector(".popup__input_type_url");

const popupTypeImage = document.querySelector(".popup.popup_type_image");

initialCards.forEach((card) => {
  renderCard(createCard(card, { handleImageClick }));
});

const popups = document.querySelectorAll('.popup')

popups.forEach(handleClosePopup)

//function for add card
function renderCard(card) {
  placesList.appendChild(card);
}

function handleImageClick(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
  openModal(popupTypeImage);
}
// -------------------------CREATE CARD FROM ARRAY FINISH-------------------------------//

function handleClosePopup (popup){
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });

  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      closeModal(popup);
    }
  });
}

//-----------------------------FORMS----------------------------------//

//--------FORM-EDIT--------//
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEditDefault = document.querySelector(".popup.popup_type_edit");
buttonEdit.addEventListener("click", () => openModal(popupEditDefault));
//--------FORM-EDIT-FINISH--------//

//-------FORM-ADD-CARD------//
const addButton = document.querySelector(".profile__add-button");
const popupAddDefault = document.querySelector(".popup.popup_type_new-card");
addButton.addEventListener("click", () => openModal(popupAddDefault));
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
  closeModal(popupEditDefault);
}

formEdit.addEventListener("submit", handleProfileFormSubmit);
//---------------------------FORM SAVE VALUE FOR INPUT'S PROFILE FINISH---------------//

//---------------------------FORM FOR INPUT'S CARD-------------------------//
const cardForm = document.forms["new-place"];
// const container__list = document.querySelector(".places__list");

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: nameCard.value,
    link: urlCard.value,
  };

  initialCards.unshift(newCard);

  const card = createCard(newCard, {
    handleImageClick,
  });

  closeModal(popupAddDefault);
  placesList.prepend(card);
  cardForm.reset();
}

cardForm.addEventListener("submit", handleCardFormSubmit);
//---------------------------FORM FOR INPUT'S CARD FINISH-------------------------//
