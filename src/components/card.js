import { openPopup } from './utils.js';
import { setInitialLikes, checkLikesCounter, likeCardHandler } from './like-card.js'
import { addTrashButton } from './trash-button.js';

const photoCardTemplate = document.querySelector('#photo-card-template').content;
const popupFullPhoto = document.querySelector('.popup_type_full-photo');
const fullPhoto = popupFullPhoto.querySelector('.full-photo__photo');
const fullPhotoName = popupFullPhoto.querySelector('.full-photo__name');

function checkForClass(target, checkingClass) {
  return target.classList.contains(checkingClass);
}

function openFullPhotoPopup(newPhoto, newName) {
  fullPhoto.src = '';
  fullPhoto.src = newPhoto.src;
  fullPhoto.alt = newPhoto.alt;
  fullPhotoName.textContent = newName.textContent;
  openPopup(popupFullPhoto);
}

function createCard(card, userId) {
  const newPhotoCard = photoCardTemplate.querySelector('.card').cloneNode(true);
  const newPhoto = newPhotoCard.querySelector('.card__photo');
  const newName = newPhotoCard.querySelector('.card__photo-name');
  newPhoto.src = card.link;
  newPhoto.alt = `фотография - ${card.name}`;
  newName.textContent = card.name;
  setInitialLikes(newPhotoCard, card, userId);
  checkLikesCounter(newPhotoCard, card);
  if (card.owner._id === userId) {
    addTrashButton(newPhotoCard, card._id);
  }
  newPhotoCard.addEventListener('click', (evt) => {
    const target = evt.target;
    if (checkForClass(target, 'card__photo')) {
      openFullPhotoPopup(newPhoto, newName);
    }
    else if (checkForClass(target, 'card__like-button')) {
      likeCardHandler(target, newPhotoCard, card);
    }
  });
  return newPhotoCard;
}

export { createCard };
