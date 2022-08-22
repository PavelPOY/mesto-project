// GENERAL ПЕРЕМЕННЫЕ
const popupCloseButton = document.querySelectorAll ('.popup__close-button')

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


//ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА
function openModal(element){
  element.classList.add('popup_opened');  
}

//ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА
function closeModal(element){
  element.classList.remove('popup_opened');  
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function addCard(data) {
  cardelements.prepend(createCard(data));
}

//ФУНКЦИЯ СОХРАНЕНИЯ ПОЛЯ ПРОФИЛЯ
function saveEditProfile() {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent; 
}
  
//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОГО ТЕКСТА В ПОЛЕ ПРОФИЛЯ
function formSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileAbout.textContent = profileAboutInput.value;
    closeModal(profile);
}

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
  cardImage.addEventListener('click', (evt) => {
    openModal(imageContainer);
    caption.textContent = data.name;
    image.src = data.link;
    image.alt = data.name;
  });
  
  return cardElement;
}

//ФУНКЦИЯ SUBMIT ДОБАВЛЕНИЯ КАРТОЧКИ
function formSubmitCard(evt) {
  evt.preventDefault();
  const data = {
    name : cardNameInput.value,
    link : cardAboutInput.value
  };
  addCard(data);
  cardForm.reset(); 
  closeModal(card);
}

//ДОБАВЛЕНИЕ КАРТОЧЕК В DOOM
initialCards.forEach((data) => {
  addCard(data);
});

//ОБРАБОТЧИК ДЛЯ ДОБАВЛЕНИЯ НОВОГО ТЕКСТА В ПОЛЯ ПРОФИЛЯ
profileForm.addEventListener('submit', formSubmitProfile);

//ОБРАБОТЧИК ДЛЯ ДОБАВЛЕНИЯ НОВЫХ КАРТ
cardForm.addEventListener('submit', formSubmitCard);

//ОБРАБОТЧИК КНОПКИ ОТКРЫТИЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
profileEditButton.addEventListener('click', (evt) => {
    saveEditProfile();
    openModal(profile);
});

//ОБРАБОТЧИК КНОПКИ ОТКРЫТИЯ ДОБАВЛЕНИЯ НОВЫХ КАРТ
cardAddButton.addEventListener('click', (evt) => {
  openModal(card);
});

//ОБРАБОТЧИК КНОПКИ ЗАКРЫТИЯ ВСЕХ МОДАЛЬНЫХ ОКН
popupCloseButton.forEach((popupClose) => {
  const popup = popupClose.closest('.popup');
  popupClose.addEventListener('click', () => closeModal(popup));
});


