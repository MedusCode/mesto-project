import '../pages/index.css';

import { setPopupsListeners, openServerErrorPopup } from '../components/modal.js';
import { openPopup, closePopup } from '../components/utils.js';
import { createCard } from '../components/card.js';
import { enableValidation } from '../components/validate.js'
import { patchProfileInfo, postNewCard, patchProfileAvatar, getInitialCards, getProfileInfo } from '../components/api.js';

export let userId;

const editButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup_type_edit-profile');
const editForm = popupEditForm.querySelector('.form');
const nameInput = editForm.querySelector('.form__input_type_name');
const addInfoInput = editForm.querySelector('.form__input_type_additional-info');
const profileName = document.querySelector('.profile__name');
const profileAddInfo = document.querySelector('.profile__additional-info');

const addButton = document.querySelector('.profile__add-button');
const popupAddForm = document.querySelector('.popup_type_add-card');
const addForm = popupAddForm.querySelector('.form');
const photoNameInput = addForm.querySelector('.form__input_type_photo-name');
const photoLinkInput = addForm.querySelector('.form__input_type_photo-link');

const changeAvatarButton = document.querySelector('.profile__change-avatar-button');
const popupChangeAvatarForm = document.querySelector('.popup_type_change-avatar')
const changeAvatarForm = popupChangeAvatarForm.querySelector('.form');
const avatarLinkInput = changeAvatarForm.querySelector('.form__input_type_change-avatar');
const avatar = document.querySelector('.profile__avatar');

const profileAdditionalInfo = document.querySelector('.profile__additional-info');
const profileAvatar = document.querySelector('.profile__avatar');

const cardsList = document.querySelector('.cards__list');
const submitButtonSelector = '.form__save-button';

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.currentTarget.querySelector(submitButtonSelector);
  const submitButtonText = submitButton.textContent
  submitButton.textContent = 'Сохранение...';
  patchProfileInfo(nameInput.value, addInfoInput.value)
    .then(info => {
      profileName.textContent = info.name;
      profileAddInfo.textContent = info.about;
      closePopup(popupEditForm);
    })
    .catch(openServerErrorPopup)
    .finally(() => {
      submitButton.textContent = submitButtonText;
    });
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.currentTarget.querySelector(submitButtonSelector);
  const submitButtonText = submitButton.textContent
  submitButton.textContent = 'Сохранение...';
  postNewCard(photoNameInput.value, photoLinkInput.value)
    .then(card => {
      cardsList.prepend(createCard(card, userId));
      closePopup(popupAddForm);
    })
    .catch(openServerErrorPopup)
    .finally(() => {
      submitButton.textContent = submitButtonText;
    });
}

function changeAvatarFormSubmitHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.currentTarget.querySelector(submitButtonSelector);
  const submitButtonText = submitButton.textContent
  submitButton.textContent = 'Сохранение...';
  patchProfileAvatar(avatarLinkInput.value)
    .then(profile => {
      avatar.src = profile.avatar;
      closePopup(popupChangeAvatarForm);
    })
    .catch(openServerErrorPopup)
    .finally(() => {
      submitButton.textContent = submitButtonText;
    });
}

editForm.addEventListener('submit', editFormSubmitHandler);

addForm.addEventListener('submit', addFormSubmitHandler);

changeAvatarForm.addEventListener('submit', changeAvatarFormSubmitHandler);

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

changeAvatarButton.addEventListener('click', () => {
  changeAvatarForm.reset();
  openPopup(popupChangeAvatarForm);
})

enableValidation({
  inputSelector: '.form__input',
  errorSpanSelector: '.form__validation-error',
  submitButtonSelector: submitButtonSelector,
  inputErrorClass: 'form__input_invalid',
});

getProfileInfo()
  .then(profileInfo => {
    profileName.textContent = profileInfo.name;
    profileAdditionalInfo.textContent = profileInfo.about;
    profileAvatar.src = profileInfo.avatar;
    userId = profileInfo._id;
    getInitialCards()     // Сделал Promise в promis'e, чтобы карточки не загружались до получения userId
      .then(initialCards => {
        initialCards.reverse().forEach(card => {
          cardsList.prepend(createCard(card, userId));
        });
      })
      .catch(openServerErrorPopup);
  })
  .catch(openServerErrorPopup);

setPopupsListeners();
