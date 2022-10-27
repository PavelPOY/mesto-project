
import '../pages/index.css';
import {addCard} from './cards.js'; 
import {openModal, closeModal, closeOverlay} from './modal.js';
import {enableValidation} from './validate.js';

// GENERAL ПЕРЕМЕННЫЕ
const popupCloseButton = document.querySelectorAll ('.popup__close-button')
const popup = document.querySelectorAll('.popup');

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
const cardelements = document.querySelector('.elements')
const cardAddButton = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('[name="card-name"]');
const cardAboutInput = document.querySelector('[name="card-about"]');
const cardForm = document.querySelector('[name="card-form"]');
const cardTemplate = document.querySelector('#elements__template').content;

// IMAGE ПЕРЕМЕННЫЕ
const imageContainer = document.querySelector('#image')
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__image-caption');


// INITIALCARDS

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 



//ФУНКЦИЯ СОХРАНЕНИЯ ПОЛЯ ПРОФИЛЯ
function saveEditProfile() {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent; 
}
  
//ФУНКЦИЯ SUBMIT ДОБАВЛЕНИЯ НОВОГО ТЕКСТА В ПОЛЕ ПРОФИЛЯ
function formSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileAbout.textContent = profileAboutInput.value;
    closeModal(profile);
}

//ФУНКЦИЯ SUBMIT ДОБАВЛЕНИЯ КАРТОЧКИ
function formSubmitCard(evt) {
  evt.preventDefault();
  const data = {
    name : cardNameInput.value,
    link : cardAboutInput.value
  };
  cardelements.prepend(createCard(data));
  cardForm.reset(); 
  closeModal(card);
}

//ОБРАБОТЧИК ДЛЯ ДОБАВЛЕНИЯ НОВОГО ТЕКСТА В ПОЛЯ ПРОФИЛЯ
profileForm.addEventListener('submit', formSubmitProfile);

//ОБРАБОТЧИК ДЛЯ ДОБАВЛЕНИЯ НОВЫХ КАРТ
cardForm.addEventListener('submit', formSubmitCard);

//ОБРАБОТЧИК КНОПКИ ОТКРЫТИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
profileEditButton.addEventListener('click', () => {
    saveEditProfile();
    openModal(profile);
});

//ОБРАБОТЧИК КНОПКИ ОТКРЫТИЯ ДОБАВЛЕНИЯ НОВЫХ КАРТ
cardAddButton.addEventListener('click', () => {
  openModal(card);
});

//ОБРАБОТЧИК КНОПКИ ЗАКРЫТИЯ ВСЕХ МОДАЛЬНЫХ ОКН
popupCloseButton.forEach( popupClose => {
  const popup = popupClose.closest('.popup');
  popupClose.addEventListener('click', () => closeModal(popup));
});

//ОБРАБОТЧИК КНОПКИ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА ПО "OVERLAY"
popup.forEach( popupElement => {
  popupElement.addEventListener('click', closeOverlay);
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup_error_visible'
});

addCard(initialCards);

export {cardelements, cardTemplate, imageContainer, image, caption};