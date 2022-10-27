import {cardelements, cardTemplate, imageContainer, image, caption} from './index.js';

//СОЗДАНИЕ НОВОЙ КАРТОЧКИ
function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.elements__title');
  const cardLike = cardElement.querySelector('.elements__button');
  const cardDelete = cardElement.querySelector('.elements__button-delete');
  const cardImage = cardElement.querySelector('.elements__image');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

//LIKE
  cardLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__button_active');
  });
//DELETE
  cardDelete.addEventListener('click', (evt) => {
    evt.target.closest('.elements__card').remove();
  });
 
//IMAGE
  cardImage.addEventListener('click', () => {
    openModal(imageContainer);
    caption.textContent = data.name;
    image.src = data.link;
    image.alt = data.name;
  });
  
  return cardElement;
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function addCard(data) {
  data.forEach(data => cardelements.append(createCard(data)));
}

export { createCard, addCard };