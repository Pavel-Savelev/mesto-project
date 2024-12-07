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
const inputAvatar = document.querySelector('.popup__input_type_avatar');
// -----------------------------------------------------------------
const profileDescription = document.querySelector(".profile__description");

const nameCard = document.querySelector(".popup__input_type_card-name");
const urlCard = document.querySelector(".popup__input_type_url");

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
  popupEditDefault.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранить'
  openModal(popupEditDefault);
});
//----------------------------------------//

//-------FORM-ADD-CARD------//
const addButton = document.querySelector(".profile__add-button");
const popupAddDefault = document.querySelector(".popup.popup_type_new-card");
addButton.addEventListener("click", () => {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  popupAddDefault.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранить'
  openModal(popupAddDefault);
});

//-----------------------------------------------------//

//---------------------------FORM SAVE VALUE FOR INPUT'S PROFILE-------------------------//
const formEdit = document.forms["edit-profile"];

inputTypeName.value = profileTitle.textContent;
inputTypeDescription.value = profileDescription.textContent;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTypeName.value;
  profileDescription.textContent = inputTypeDescription.value;
  updateDataProfile(profileTitle.textContent, profileDescription.textContent);
  popupEditDefault.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранение...'
  closeModal(popupEditDefault);
}

formEdit.addEventListener("submit", handleProfileFormSubmit);
//-----------------------------------------//

//---------------------------FORM FOR INPUT'S CARD-------------------------//
const cardForm = document.forms["new-place"];

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  //
  postNewCard(nameCard.value, urlCard.value).then((res) => {
    const card = createCard({
      name: nameCard.value,
      link: urlCard.value,
      likes: [],
      isDeletable: true,
      _id: res._id,
    });
    closeModal(popupAddDefault);
    popupAddDefault.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранение...'
    placesList.prepend(card);
    cardForm.reset();
  }) 
  .catch((err) => {
    console.log(err);
  }); 
}

cardForm.addEventListener("submit", handleCardFormSubmit);
//---------------------------------------------------//
// ------------------avatar--------------------------
const avatarForm =document.forms['avatar'];

profileImage.addEventListener('click',() => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  popupAvatar.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранить'
  openModal(popupAvatar);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  updateAvatar(inputAvatar.value)
  profileImage.style.backgroundImage = `url('${inputAvatar.value}')`;
  popupAvatar.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранение...'
  closeModal(popupAvatar);
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);
// -------------------------------------------------
enableValidation(validationConfig);

// Pomises
Promise.all([getDataAboutClient(), getCardData()]).then(
  (arr) => {
    const clientData = arr[0];
    const cardData = arr[1];

    profileTitle.textContent = clientData.name;
    profileDescription.textContent = clientData.about;

    profileImage.style.backgroundImage = `url('${clientData.avatar}')`;

    cardData.forEach((card) => {
      let islike = false
      card.likes.forEach((idcard)=>{
        if (idcard._id === clientData._id){
          islike = true
        }
      })
      renderCard(
        createCard({
          name: card.name,
          link: card.link,
          likes: card.likes,
          _id: card._id,
          isDeletable: clientData._id === card.owner._id,
          isliked:islike,
        })
      );
    });
  }
)
.catch((err) => {
  console.log(err); 
}); 

// -------------------------------------------------//
