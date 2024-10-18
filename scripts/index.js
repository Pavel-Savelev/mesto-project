// @todo: Темплейт карточки
// const user__template = document.querySelector('#card-template').content;
// const places__list = document.querySelector('.places__list');

// initialCards.forEach(element => {
//     const user__elements = user__template.querySelector('.places__item').cloneNode(true);

//     const user__image = user__elements.querySelector('.card__image');
//     user__image.setAttribute('src',element.link);
//     user__image.setAttribute('alt',element.name);

//     const user__title = user__elements.querySelector('.card__title');
//     user__title.innerHTML = element.name;

//     const card__delete = user__elements.querySelector('.card__delete-button');
//     card__delete.addEventListener('click',function(event){
//         event.target.parentNode.remove(user__elements);
//     })

//     const card__like = user__elements.querySelector('.card__like-button');
//     card__like.addEventListener('click',function(){
//         if (card__like.classList.contains('card__like-button_is-active')){
//             card__like.classList.remove('card__like-button_is-active');
//         }
//         else{
//             card__like.classList.add('card__like-button_is-active');
//         }
//     })

//     places__list.appendChild(user__elements);
// });

const card__template = document.querySelector("#card-template").content;
const places__list = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(data, on__delete) {
  const cardElement = card__template
    .querySelector(".places__item")
    .cloneNode(true);
  //устанавливаем данные карточки и обработчик клика по корзинке удаления
  const user__image = cardElement.querySelector(".card__image");
  user__image.setAttribute("src", data.link);
  user__image.setAttribute("alt", data.name);

  const user__title = cardElement.querySelector(".card__title");
  user__title.innerHTML = data.name;

  const card__delete = cardElement.querySelector(".card__delete-button");
  card__delete.addEventListener("click", () => {
    on__delete(cardElement);
  });

  return cardElement;
}

function handleDeleteCard(card) {
  return card.remove();
}

function renderCard(card) {
  places__list.appendChild(card);
}

initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard));
});
