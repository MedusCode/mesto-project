import { openPopup } from './model.js';
import { deleteCard } from './api.js'

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

function addTrashButton(newPhotoCard, cardId) {
  const trashButton = document.createElement('button');
  trashButton.classList.add('card__trash-button', 'page__button', 'page__button_style_transparent');
  trashButton.addEventListener('click', () => {
    deleteCard(cardId)
      .then(() => {
        newPhotoCard.remove();
      })
  })
  newPhotoCard.appendChild(trashButton);
}

function createCard(cardName, cardPhotoLink, cardId) {
  const newPhotoCard = photoCardTemplate.querySelector('.card').cloneNode(true);
  const newPhoto = newPhotoCard.querySelector('.card__photo');
  const newName = newPhotoCard.querySelector('.card__photo-name');
  newPhoto.src = cardPhotoLink;
  newPhoto.alt = `фотография - ${cardName}`;
  newName.textContent = cardName;
  if (cardId) {
    addTrashButton(newPhotoCard, cardId);
  }
  newPhotoCard.addEventListener('click', (evt) => {
    const target = evt.target;
    if (checkForClass(target, 'card__photo')) {
      openFullPhotoPopup(newPhoto, newName);
    }
    else if (checkForClass(target, 'card__like-button')) {
      toggleLikeButtonClass(target);
    }
  });
  return newPhotoCard;
}

export { createCard };
