// import '../pages/index.css'; // добавьте импорт главного файла стилей

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
// function for delete card
function handleDeleteCard(card) {
  return card.remove();
}
//function for add card
function renderCard(card) {
  places__list.appendChild(card);
}
//massive card
initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard));
});

const close_form = document.querySelectorAll('.popup__close')

const button_edit = document.querySelector(".profile__edit-button");
const popup_edit_default = document.querySelector(".popup.popup_type_edit");
form_fnc(button_edit,popup_edit_default,close_form[0])

const button__add = document.querySelector('.profile__add-button');
const popup_add_default = document.querySelector('.popup.popup_type_new-card');
form_fnc(button__add,popup_add_default,close_form[1])

function form_fnc(button,popup,close){
  button.addEventListener('click',function(){
    popup.setAttribute('style','display:flex')
  })
  document.addEventListener('keydown',function(evt){
    if (evt.key === 'Escape'){
      popup.setAttribute('style','display:none')
    }
  })
  close.addEventListener('click',function(){
    popup.setAttribute('style','display:none')
  })
}




