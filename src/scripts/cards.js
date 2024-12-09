import {deleteCard,addLike,deleteLike} from './api.js'
import { onOpenImagePopup } from '../index.js';
// --------------------------CREATE CARD FROM ARRAY-------------------//
export function createCard(card) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  if (card.isDeletable) {
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    cardDeleteButton.addEventListener("click", () =>
      handleDeleteCard(cardElement,card._id)
    .catch(err=>{
      console.log(err)
    })
    .finally(()=>{
      console.log('выполнено')
    })
    );
  }else {
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    cardDeleteButton.style.display = 'none'
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => handleLikeCard(likeButton,card._id,countLikeSelector));

  if (card.isliked){
    likeButton.classList.add("card__like-button_is-active")
  }

  const imageCard = cardElement.querySelector(".card__image");
  imageCard.setAttribute("src", card.link);
  imageCard.setAttribute("alt", card.name);

  imageCard.addEventListener("click", () => onOpenImagePopup(card.link,card.name));

  const countLikeSelector = cardElement.querySelector(".card__like-count");

  countLikeSelector.textContent = card.likes.length;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  return cardElement;
}

async function handleDeleteCard(card, cardId) {
  try {
    // Удаляем карту с сервера
    await deleteCard(cardId);
    //-----------------------
    // Удаляем карту из DOM
    card.remove();
    //-----------------------
  } catch (error) {
    console.error("Ошибка при удалении карты:", error);
  }
}

function handleLikeCard(button,idCard,countLikes) {
  if (button.classList.contains("card__like-button_is-active")){
    deleteLike(idCard)
    .then(()=>{
      button.classList.remove("card__like-button_is-active")
      countLikes.textContent=Number(countLikes.textContent)-1
    })
    .catch(err=>{
      console.log('Ошибка:',err)
    })
    .finally(()=>{
      console.log('Выполнено')
    })
  }else{
    addLike(idCard)
    .then(()=>{
      button.classList.add("card__like-button_is-active")
    countLikes.textContent=Number(countLikes.textContent)+1
    })
    .catch(err=>{
      console.log("Ошибка:",err)
    })
    .finally(()=>{
      console.log('Выполнено')
    })
  }
}
