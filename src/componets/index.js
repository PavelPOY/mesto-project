import '../pages/index.css';
import {getProfile, getCards, patchProfile, postCard, patchAvatar, user} from './api.js'; 
import {createCard} from './cards.js'; 
import {openModal, closeModal, closeOverlay} from './modal.js';
import {enableValidation, hideAllInputError} from './validate.js';

// GENERAL ПЕРЕМЕННЫЕ
const popupCloseButton = document.querySelectorAll ('.popup__close-button')
const allPopups = document.querySelectorAll('.popup');

// PROFILE ПЕРЕМЕННЫЕ
const profile = document.querySelector('#profile')
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileNameInput = document.querySelector('[name="profile-name"]');
const profileAboutInput = document.querySelector('[name="profile-about"]');
const profileForm = document.querySelector('[name="profile-form"]');
const profileEditButton = document.querySelector ('.profile__edit-button');
const profileSubmit = profileForm.querySelector('button[type="submit"]');


// PROFILE AVATAR ПЕРЕМЕННЫЕ
const avatar = document.querySelector('#avatar')
const avatarImage = document.querySelector('.profile__image');
const avatarInput = document.querySelector('[name="profile-avatar-input"]');
const avatarForm = document.querySelector('[name="profile-avatar-form"]');
const avatarButton = document.querySelector ('.profile__avatar-button');
const avatarSubmit = avatarForm.querySelector('button[type="submit"]');

// CARDS ПЕРЕМЕННЫЕ
const card = document.querySelector('#card')
const cardElements = document.querySelector('.elements')
const cardAddButton = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('[name="card-name"]');
const cardAboutInput = document.querySelector('[name="card-about"]');
const cardForm = document.querySelector('[name="card-form"]');
const cardTemplate = document.querySelector('#elements__template').content;
const cardSubmit = cardForm.querySelector('button[type="submit"]');

// IMAGE ПЕРЕМЕННЫЕ
const imageContainer = document.querySelector('#image')
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__image-caption');

// ОБЪЕКТ ВАЛИДАЦИИ
const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup_error_visible'
};

enableValidation(validation);

//ОБЪЕДИНЕНИЕ ЗАПРОСОВ
Promise.all([getProfile(), getCards()])
  .then(data => {
    renderProfiles(data[0]);
    renderCards(data[1]);
  })
  .catch((error) => console.log(error));

//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function addCard(data) {
  cardElements.prepend(createCard(data, cardTemplate, imageContainer, image, caption));
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ ВСЕХ КАРТ
function renderCards(arrCards) {
  arrCards.forEach(data => cardElements.append(createCard(data, cardTemplate, imageContainer, image, caption)));
}

//ФУНКЦИЯ ПОДГРУЗКИ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
function renderProfiles(data) {
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
  user.id = data._id;
  avatarImage.src = data.avatar;
}

//ФУНКЦИЯ SUBMIT ДОБАВЛЕНИЯ КАРТОЧКИ
function formSubmitCard(evt) {
  evt.preventDefault();
  cardSubmit.textContent = "Создание...";
  postCard(cardNameInput.value, cardAboutInput.value)
    .then((data) => {
      addCard(data);
    })
    .catch((error) => console.log(error))
    .finally(() => setTimeout(() => cardSubmit.textContent = "Создать", 10000));
  cardForm.reset(); 
  closeModal(card);
}

//ФУНКЦИЯ SUBMIT ДОБАВЛЕНИЯ НОВОГО ТЕКСТА В ПОЛЕ ПРОФИЛЯ
function formSubmitProfile(evt) {
  evt.preventDefault();
  profileSubmit.textContent = "Сохранение...";
  patchProfile(profileNameInput.value, profileAboutInput.value )
    .then((data) => {
      profileName.textContent = data.name;
      profileAbout.textContent = data.about;
    })
    .catch((error) => console.log(error)) 
    .finally(() => setTimeout(() => profileSubmit.textContent = "Сохранить", 10000));
  closeModal(profile);
}

//ФУНКЦИЯ SUBMIT ДОБАВЛЕНИЯ ССЫЛКИ В АВАТАР
function formSubmitAvatar(evt) {
  evt.preventDefault();
  avatarSubmit.textContent = "Сохранение...";
  patchAvatar(avatarInput.value)
    .then((data) => {
      avatarImage.src = data.avatar;
    })
    .catch((error) => console.log(error))
    .finally(() => setTimeout(() => avatarSubmit.textContent = "Сохранить", 10000));
  closeModal(avatar);
}

//ОБРАБОТЧИК ДЛЯ ДОБАВЛЕНИЯ НОВОГО ТЕКСТА В ПОЛЯ ПРОФИЛЯ
profileForm.addEventListener('submit', formSubmitProfile);

//ОБРАБОТЧИК ДЛЯ ДОБАВЛЕНИЯ НОВЫХ КАРТ
cardForm.addEventListener('submit', formSubmitCard);

//ОБРАБОТЧИК ДЛЯ ДОБАВЛЕНИЯ НОВЫХ КАРТ
avatarForm.addEventListener('submit', formSubmitAvatar);

//ОБРАБОТЧИК КНОПКИ ОТКРЫТИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
profileEditButton.addEventListener('click', () => {
  hideAllInputError(profileForm, validation);
  openModal(profile);
});

//ОБРАБОТЧИК КНОПКИ ОТКРЫТИЯ ДОБАВЛЕНИЯ НОВЫХ КАРТ
cardAddButton.addEventListener('click', () => {
  hideAllInputError(cardForm, validation);
  openModal(card);
});

//ОБРАБОТЧИК КНОПКИ ОТКРЫТИЯ АВАТАРА
avatarButton.addEventListener('click', () => {
  hideAllInputError(avatarForm, validation);
  openModal(avatar);
});

//ОБРАБОТЧИК КНОПКИ ЗАКРЫТИЯ ВСЕХ МОДАЛЬНЫХ ОКН
popupCloseButton.forEach( popupClose => {
  const popup = popupClose.closest('.popup');
  popupClose.addEventListener('click', () => closeModal(popup));
});

//ОБРАБОТЧИК КНОПКИ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА ПО "OVERLAY"
allPopups.forEach( popupElement => {
  popupElement.addEventListener('click', closeOverlay);
});

export {cardElements, cardTemplate, imageContainer, image, caption, user};