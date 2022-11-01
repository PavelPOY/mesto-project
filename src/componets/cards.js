import {deleteCard, deleteLike, putLike, user} from './api.js';
import {openModal} from './modal.js';

//ПРОВЕРКА ЛАЙКА
function hasLiked(data) {
  return data.likes.some(like => like._id === user.id);
}

//СОЗДАНИЕ НОВОЙ КАРТОЧКИ
function createCard(data, cardTemplate, imageContainer, image, caption) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.elements__title');
  const cardLike = cardElement.querySelector('.elements__button');
  const cardLikeText = cardElement.querySelector(".elements__like");
  const cardDelete = cardElement.querySelector('.elements__button-delete');
  const cardImage = cardElement.querySelector('.elements__image');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardLikeText.textContent = data.likes.length;

//LIKE

  if (hasLiked(data)) {
    cardLike.classList.add('elements__button_active');
  }
  
  cardLike.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("elements__button_active")) {
      deleteLike(data._id)
        .then(card => {
          evt.target.classList.toggle("elements__button_active");
          cardLikeText.textContent = card.likes.length;
        })
        .catch((error) => console.log(error));
    } else {
      putLike(data._id)
        .then(card => {
          evt.target.classList.toggle("elements__button_active");
          cardLikeText.textContent = card.likes.length;
        })
        .catch((error) => console.log(error));
    }
  });

//DELETE
  if (user.id !== data.owner._id) {
    cardDelete.style.visibility = "hidden";
  } else {
    cardDelete.addEventListener('click', (evt) => {
      deleteCard(data._id)
        .then(() => {
          evt.target.closest(".elements__card").remove();
        })
        .catch((error) => console.log(error));
    });
  }

//IMAGE
  cardImage.addEventListener('click', () => {
    openModal(imageContainer);
    caption.textContent = data.name;
    image.src = data.link;
    image.alt = data.name;
  });
  
  return cardElement;
}

export { createCard };