const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
    
];

//--------------------------CREATE CARD FROM ARRAY-------------------//

function createCard(data, on__delete) {
  const card__template = document.querySelector("#card-template").content;
  const cardElement = card__template
    .querySelector(".places__item")
    .cloneNode(true);
  const user__image = cardElement.querySelector(".card__image");
  user__image.setAttribute("src", data.link);
  user__image.setAttribute("alt", data.name);

  const user__title = cardElement.querySelector(".card__title");
  user__title.innerHTML = data.name;

  const card__delete = cardElement.querySelector(".card__delete-button");
  card__delete.addEventListener("click", () => {
    on__delete(cardElement);
  });

  const like__button = cardElement.querySelector(".card__like-button");
  handlelikeCard(like__button)
  
  return cardElement;
}

// function for delete card
function handleDeleteCard(card) {
  return card.remove();
}

function handlelikeCard(button){
  button.addEventListener("click", function(){
    button.classList.toggle("card__like-button_is-active");
  })
  
}