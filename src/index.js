import "./pages/index.css";
import { createCard } from "./scripts/cards";
import { openModal, closeModal, handleClosePopup } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validation";
import {
  getDataAboutClient,
  getCardData,
  updateDataProfile,
  postNewCard,
  updateAvatar,
} from "./scripts/api.js";

const placesList = document.querySelector(".places__list");
const profileImage = document.querySelector(".profile__image");
const inputTypeName = document.querySelector(".popup__input_type_name");
const profileTitle = document.querySelector(".profile__title");
const inputTypeDescription = document.querySelector(
  ".popup__input_type_description"
);
const popupAvatar = document.querySelector(".popup.popup_type_avatar");
const inputAvatar = document.querySelector(".popup__input_type_avatar");
// -----------------------------------------------------------------
const profileDescription = document.querySelector(".profile__description");

const nameCard = document.querySelector(".popup__input_type_card-name");
const urlCard = document.querySelector(".popup__input_type_url");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup.popup_type_image");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const popups = document.querySelectorAll(".popup");

popups.forEach(handleClosePopup);

//function for add card
function renderCard(card) {
  placesList.appendChild(card);
}
// -------------------------------------------------------//

//--------FORM-EDIT----------------------//
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEditDefault = document.querySelector(".popup.popup_type_edit");
buttonEdit.addEventListener("click", () => {
  inputTypeName.value = profileTitle.textContent;
  inputTypeDescription.value = profileDescription.textContent;
  clearValidation(formEdit, validationConfig);
  popupEditDefault.querySelector(
    validationConfig.submitButtonSelector
  ).textContent = "Сохранить";
  openModal(popupEditDefault);
});
//----------------------------------------//

//-------FORM-ADD-CARD------//
const addButton = document.querySelector(".profile__add-button");
const popupAddDefault = document.querySelector(".popup.popup_type_new-card");
addButton.addEventListener("click", () => {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  popupAddDefault.querySelector(
    validationConfig.submitButtonSelector
  ).textContent = "Сохранить";
  openModal(popupAddDefault);
});

//-----------------------------------------------------//

//---------------------------FORM SAVE VALUE FOR INPUT'S PROFILE-------------------------//
const formEdit = document.forms["edit-profile"];

inputTypeName.value = profileTitle.textContent;
inputTypeDescription.value = profileDescription.textContent;

export function onOpenImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTypeName.value;
  profileDescription.textContent = inputTypeDescription.value;
  updateDataProfile(profileTitle.textContent, profileDescription.textContent)
    .then(() => {
      closeModal(popupEditDefault);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupEditDefault.querySelector(
        validationConfig.submitButtonSelector
      ).textContent = "Сохранение...";
    });
}

formEdit.addEventListener("submit", handleProfileFormSubmit);
//-----------------------------------------//

//---------------------------FORM FOR INPUT'S CARD-------------------------//
const cardForm = document.forms["new-place"];

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  //
  postNewCard(nameCard.value, urlCard.value)
    .then((res) => {
      const card = createCard({
        name: nameCard.value,
        link: urlCard.value,
        likes: [],
        isDeletable: true,
        _id: res._id,
      });
      closeModal(popupAddDefault);
      placesList.prepend(card);
      cardForm.reset();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))

    .finally(() => {
      // Здесь изменяем текст кнопки, если это форма. Спасибо
      popupAddDefault.querySelector(
        validationConfig.submitButtonSelector
      ).textContent = "Сохранение...";
    });
}

cardForm.addEventListener("submit", handleCardFormSubmit);
//---------------------------------------------------//
// ------------------avatar--------------------------
const avatarForm = document.forms["avatar"];

profileImage.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  popupAvatar.querySelector(validationConfig.submitButtonSelector).textContent =
    "Сохранить";
  openModal(popupAvatar);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  updateAvatar(inputAvatar.value)
    .then((res) => {
      if (res.ok) {
        profileImage.style.backgroundImage = `url('${inputAvatar.value}')`;
        closeModal(popupAvatar);
      }
    })
    .catch((err) => console.log(`Ошибка: ${err}`))

    .finally(() => {
      // Здесь изменяем текст кнопки, если это форма.
      popupAvatar.querySelector(
        validationConfig.submitButtonSelector
      ).textContent = "Сохранение...";
    });
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);
// -------------------------------------------------
enableValidation(validationConfig);

// Pomises
Promise.all([getDataAboutClient(), getCardData()])
  .then((arr) => {
    const [clientData, cardData] = [arr[0], arr[1]];

    profileTitle.textContent = clientData.name;
    profileDescription.textContent = clientData.about;
    profileImage.style.backgroundImage = `url('${clientData.avatar}')`;

    cardData.forEach((card) => {
      const cardOptions = {
        name: card.name,
        link: card.link,
        likes: card.likes,
        _id: card._id,
        isDeletable: clientData._id === card.owner._id,
        isliked: false,
      };

      card.likes.forEach((idcard) => {
        if (idcard._id === clientData._id) {
          cardOptions.isliked = true;
        }
      });
      renderCard(createCard(cardOptions));
    });
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

// -------------------------------------------------//
