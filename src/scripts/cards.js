// --------------------------CREATE CARD FROM ARRAY-------------------//
export function createCard(
  data,
  { handleDeleteCard, handlelikeCard, handleImageClick }
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
  likeButton.addEventListener("click", () => handlelikeCard(likeButton));

  const imageCard = cardElement.querySelector(".card__image");
  imageCard.setAttribute("src", data.link);
  imageCard.setAttribute("alt", data.name);
  
  const popup_type_image = document.querySelector(".popup.popup_type_image");
  imageCard.addEventListener("click", () => handleImageClick(popup_type_image,data));

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;

  return cardElement;
}

