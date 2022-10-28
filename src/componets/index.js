
import '../pages/index.css';
import {createCard} from './cards.js'; 
import {openModal, closeModal, closeOverlay} from './modal.js';
import {enableValidation, hideAllInputError} from './validate.js';
import {initialCards} from './constants.js';

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

// CARDS ПЕРЕМЕННЫЕ
const card = document.querySelector('#card')
const cardElements = document.querySelector('.elements')
const cardAddButton = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('[name="card-name"]');
const cardAboutInput = document.querySelector('[name="card-about"]');
const cardForm = document.querySelector('[name="card-form"]');
const cardTemplate = document.querySelector('#elements__template').content;

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

//ФУНКЦИЯ СОХРАНЕНИЯ ПОЛЯ ПРОФИЛЯ
function fillInEditProfileFormInputs() {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent; 
}

//ФУНКЦИЯ СОХРАНЕНИЯ ДАННЫХ ПРОФИЛЯ
function setUserInfo() {
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function addCard() {
  const data = {
    name : cardNameInput.value,
    link : cardAboutInput.value
  };
  cardElements.prepend(createCard(data, cardTemplate, imageContainer, image, caption));
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ ВСЕХ
function renderCards(data) {
  data.forEach(data => cardElements.append(createCard(data, cardTemplate, imageContainer, image, caption)));
}

//ФУНКЦИЯ SUBMIT ДОБАВЛЕНИЯ КАРТОЧКИ
function formSubmitCard(evt) {
  evt.preventDefault();
  addCard();
  cardForm.reset(); 
  closeModal(card);
}

//ФУНКЦИЯ SUBMIT ДОБАВЛЕНИЯ НОВОГО ТЕКСТА В ПОЛЕ ПРОФИЛЯ
function formSubmitProfile(evt) {
  evt.preventDefault();
  setUserInfo();
  closeModal(profile);
}

//ОБРАБОТЧИК ДЛЯ ДОБАВЛЕНИЯ НОВОГО ТЕКСТА В ПОЛЯ ПРОФИЛЯ
profileForm.addEventListener('submit', formSubmitProfile);

//ОБРАБОТЧИК ДЛЯ ДОБАВЛЕНИЯ НОВЫХ КАРТ
cardForm.addEventListener('submit', formSubmitCard);

//ОБРАБОТЧИК КНОПКИ ОТКРЫТИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
profileEditButton.addEventListener('click', () => {
  hideAllInputError(profileForm, validation);
  fillInEditProfileFormInputs();
  openModal(profile);
});

//ОБРАБОТЧИК КНОПКИ ОТКРЫТИЯ ДОБАВЛЕНИЯ НОВЫХ КАРТ
cardAddButton.addEventListener('click', () => {
  hideAllInputError(cardForm, validation);
  openModal(card);
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

enableValidation(validation);
renderCards(initialCards);

export {cardElements, cardTemplate, imageContainer, image, caption};