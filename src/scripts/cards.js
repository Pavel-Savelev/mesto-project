// --------------------------CREATE CARD FROM ARRAY-------------------//
export function createCard(
  data,
  {handleImageClick }
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement)
  );

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => handleLikeCard(likeButton));

  const imageCard = cardElement.querySelector(".card__image");
  imageCard.setAttribute("src", data.link);
  imageCard.setAttribute("alt", data.name);
  
  
  imageCard.addEventListener("click", () => handleImageClick(data));

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;

  return cardElement;
}

function handleDeleteCard(card) {
  return card.remove();
}

function handleLikeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

