import { openPopup } from './model.js';

const photoCardTemplate = document.querySelector('#photo-card-template').content;
const popupFullPhoto = document.querySelector('.popup_type_full-photo');

function checkForClass(target, checkingClass) {
  return target.classList.contains(checkingClass);
}

function openFullPhotoPopup(newPhoto, newName) {
  const fullPhoto = popupFullPhoto.querySelector('.full-photo__photo');
  const fullPhotoName = popupFullPhoto.querySelector('.full-photo__name');
  fullPhoto.src = newPhoto.src;
  fullPhoto.alt = newPhoto.alt;
  fullPhotoName.textContent = newName.textContent;
  openPopup(popupFullPhoto);
}

function toggleLikeButtonClass(LikeButton) {
  LikeButton.classList.toggle('card__like-button_active');
}

function createCard(cardPhotoLink, cardName) {
  const newPhotoCard = photoCardTemplate.querySelector('.card').cloneNode(true);
  const newPhoto = newPhotoCard.querySelector('.card__photo');
  const newName = newPhotoCard.querySelector('.card__photo-name');
  newPhoto.src = cardPhotoLink;
  newPhoto.alt = `фотография - ${cardName}`;
  newName.textContent = cardName;
  newPhotoCard.addEventListener('click', (evt) => {
    const target = evt.target;
    if (checkForClass(target, 'card__photo')) {
      openFullPhotoPopup(newPhoto, newName);
    }
    else if (checkForClass(target, 'card__like-button')) {
      toggleLikeButtonClass(target);
    }
    else if (checkForClass(target, 'card__trash-button')) {
      newPhotoCard.remove();
    }
  });
  return newPhotoCard;
}

export { createCard };
