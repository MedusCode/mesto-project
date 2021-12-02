import { openPopup } from './model.js';
import { deleteCard, likeCard, dislikeCard } from './api.js';

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

function updateLikesCounter(newPhotoCard, card) {
  const likeCounter = newPhotoCard.querySelector('.card__like-counter');
  likeCounter.textContent = card.likes.length;
}

function setInitialLikes(newPhotoCard, card, myId) {
  const likeButton = newPhotoCard.querySelector('.card__like-button');
  card.likes.forEach(user => {
    if (user._id === myId) {
      likeButton.classList.add('card__like-button_active');
    }
  });
  updateLikesCounter(newPhotoCard, card);
}

function checkLikesCounter(newPhotoCard, card) {
  const likeButton = newPhotoCard.querySelector('.card__like-button');
  const likeCounter = newPhotoCard.querySelector('.card__like-counter');
  if (card.likes.length > 0) {
    likeButton.classList.add('card__like-button_counter-shown');
    likeCounter.classList.add('card__like-counter_shown');
    updateLikesCounter(newPhotoCard, card);
  }
  else {
    likeButton.classList.remove('card__like-button_counter-shown');
    likeCounter.classList.remove('card__like-counter_shown');
    updateLikesCounter(newPhotoCard, card);
  }
}

function LikeCard(likeButton, newPhotoCard, card) {
  if (likeButton.classList.contains('card__like-button_active')) {
    dislikeCard(card._id)
      .then(card => {
        likeButton.classList.remove('card__like-button_active');
        checkLikesCounter(newPhotoCard, card);
      })
  }
  else {
    likeCard(card._id)
      .then(card => {
        likeButton.classList.add('card__like-button_active');
        checkLikesCounter(newPhotoCard, card);
      })
  }
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

function createCard(card, userId) {
  const newPhotoCard = photoCardTemplate.querySelector('.card').cloneNode(true);
  const newPhoto = newPhotoCard.querySelector('.card__photo');
  const newName = newPhotoCard.querySelector('.card__photo-name');
  newPhoto.src = card.link;
  newPhoto.alt = `фотография - ${card.name}`;
  newName.textContent = card.name;
  setInitialLikes(newPhotoCard, card, userId);
  checkLikesCounter(newPhotoCard, card);
  if (card.owner._id === userId || !userId) {
    addTrashButton(newPhotoCard, card._id);
  }
  newPhotoCard.addEventListener('click', (evt) => {
    const target = evt.target;
    if (checkForClass(target, 'card__photo')) {
      openFullPhotoPopup(newPhoto, newName);
    }
    else if (checkForClass(target, 'card__like-button')) {
      LikeCard(target, newPhotoCard, card);
    }
  });
  return newPhotoCard;
}

export { createCard };
