import '../pages/index.css';

import { openPopup, closePopup, setPopupsListeners } from '../components/model.js';
import { createCard } from '../components/card.js';
import { enableValidation } from '../components/validate.js'
import { createInitialCards, setProfileValues } from '../components/utils.js';
import { patchProfileInfo, postNewCard } from '../components/api.js';

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
const submitButtonSelector = '.form__save-button';

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  patchProfileInfo(nameInput.value, addInfoInput.value)
    .then(info => {
      profileName.textContent = info.name;
      profileAddInfo.textContent = info.about;
    })
  closePopup(popupEditForm);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  postNewCard(photoNameInput.value, photoLinkInput.value)
    .then(card => {
      cardsList.prepend(createCard(card.name, card.link, card._id));
    })
  closePopup(popupAddForm);
}

editForm.addEventListener('submit', editFormSubmitHandler);

addForm.addEventListener('submit', addFormSubmitHandler);

editButton.addEventListener('click', () => {
  editForm.reset();
  editForm.querySelector(submitButtonSelector).disabled = false;
  nameInput.value = profileName.textContent;
  addInfoInput.value = profileAddInfo.textContent;
  openPopup(popupEditForm);
});

addButton.addEventListener('click', () => {
  addForm.reset();
  openPopup(popupAddForm);
});

enableValidation({
  errorSpanSelector: '.form__validation-error',
  submitButtonSelector: submitButtonSelector,
  inputErrorClass: 'form__input_invalid',
});

setPopupsListeners();

createInitialCards();

setProfileValues();


