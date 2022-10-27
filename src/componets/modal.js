//ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА
function openModal(element) {
  element.classList.add('popup_opened');  
  document.addEventListener('keydown', closeEscape); 
}

//ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА
function closeModal(element) {
  element.classList.remove('popup_opened');  
  document.removeEventListener('keydown', closeEscape);
}

//ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА ПО КНОПКЕ "ESCAPE"
function closeEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closeModal(openedPopup);
  }
}

//ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА ПО "OVERLAY"
function closeOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}

export {openModal, closeModal, closeEscape, closeOverlay};