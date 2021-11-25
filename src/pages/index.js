import '../pages/index.css';

import { openPopup, closePopup } from '../components/model.js';
import { createCard } from '../components/card.js';
import { enableValidation } from '../components/validate.js'
import { createInitialCards } from '../components/utils.js';

const popupEditForm = document.querySelector('.popup_type_edit-profile');
const popupAddForm = document.querySelector('.popup_type_add-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editForm = popupEditForm.querySelector('.form');
const nameInput = editForm.querySelector('.form__input_type_name');
const addInfoInput = editForm.querySelector('.form__input_type_additional-info');
const addForm = popupAddForm.querySelector('.form');
const photoNameInput = addForm.querySelector('.form__input_type_photo-name');
const photoLinkInput = addForm.querySelector('.form__input_type_photo-link');
const profileName = document.querySelector('.profile__name');
const profileAddInfo = document.querySelector('.profile__additional-info');
const cardsList = document.querySelector('.cards__list');

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAddInfo.textContent = addInfoInput.value;
  closePopup(popupEditForm);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  cardsList.prepend(createCard(photoLinkInput.value, photoNameInput.value));
  photoLinkInput.value = '';
  photoNameInput.value = '';
  closePopup(popupAddForm);
}

editForm.addEventListener('submit', editFormSubmitHandler);

addForm.addEventListener('submit', addFormSubmitHandler);

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  addInfoInput.value = profileAddInfo.textContent;
  openPopup(popupEditForm);
});

addButton.addEventListener('click', () => {
  addForm.reset();
  openPopup(popupAddForm);
});

document.querySelectorAll('.popup__close-button').forEach((closeButton) => {
  closeButton.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

enableValidation({
  errorSpanSelector: '.form__validation-error',
  submitButtonSelector: '.form__save-button',
  inputErrorClass: 'form__input_invalid',
  openButtonSelector: '.form-open-button'
});

createInitialCards();

