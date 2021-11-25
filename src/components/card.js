import { openPopup } from './model.js';

const photoCardTemplate = document.querySelector('#photo-card-template').content;
const popupFullPhoto = document.querySelector('.popup_type_full-photo');

function createCard(cardPhotoLink, cardName) {
  const newPhotoCard = photoCardTemplate.querySelector('.card').cloneNode(true);
  const newPhoto = newPhotoCard.querySelector('.card__photo');
  const newName = newPhotoCard.querySelector('.card__photo-name');
  newPhoto.src = cardPhotoLink;
  newName.textContent = cardName;
  newPhoto.addEventListener('click', () => {
    popupFullPhoto.querySelector('.full-photo__photo').src = newPhoto.src;
    popupFullPhoto.querySelector('.full-photo__name').textContent = newName.textContent;
    openPopup(popupFullPhoto);
  });
  newPhotoCard.querySelector('.card__like-button').addEventListener('click', (event) => {
    event.target.classList.toggle('card__like-button_active');
  });
  newPhotoCard.querySelector('.card__trash-button').addEventListener('click', () => {
    newPhotoCard.remove();
  });
  return newPhotoCard;
}

export { createCard };
