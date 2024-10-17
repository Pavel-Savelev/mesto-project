// @todo: Темплейт карточки
const user__template = document.querySelector('#card-template').content;
const places__list = document.querySelector('.places__list');

// const card = function(){
//     for (let i = 0;i<initialCards.length;i++){
//         user__image.setAttribute('src',initialCards[i].link)
//         user__image.setAttribute('alt',initialCards[i].name)
//         user__title.innerHTML = initialCards[i].name;
//         places__list.appendChild(user__elements)
//         // append.child
//     }
// }

initialCards.forEach(element => {
    const user__elements = user__template.querySelector('.places__item').cloneNode(true);
    
    const user__image = user__elements.querySelector('.card__image');
    user__image.setAttribute('src',element.link);
    user__image.setAttribute('alt',element.name);

    const user__title = user__elements.querySelector('.card__title');
    user__title.innerHTML = element.name;

    const card__delete = user__elements.querySelector('.card__delete-button');
    card__delete.addEventListener('click',function(event){
        event.target.parentNode.remove(user__elements);
    })

    const card__like = user__elements.querySelector('.card__like-button');
    card__like.addEventListener('click',function(){
        if (card__like.classList.contains('card__like-button_is-active')){
            card__like.classList.remove('card__like-button_is-active');
        }
        else{
            card__like.classList.add('card__like-button_is-active');
        }
    })
    
    places__list.appendChild(user__elements);
});

const profile__add = document.querySelector('.profile__add-button').cloneNode(true);
profile__add.addEventListener('click',function(){
    const create_card = document.querySelector('.popup_type_new-card');
    
})




// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
