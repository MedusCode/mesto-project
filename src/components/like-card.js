import { likeCard, dislikeCard } from './api.js';
import { openServerErrorPopup } from './modal.js';

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

function likeCardHandler(likeButton, newPhotoCard, card) {
  if (likeButton.classList.contains('card__like-button_active')) {
    dislikeCard(card._id)
      .then(card => {
        likeButton.classList.remove('card__like-button_active');
        checkLikesCounter(newPhotoCard, card);
      })
      .catch(openServerErrorPopup);
  }
  else {
    likeCard(card._id)
      .then(card => {
        likeButton.classList.add('card__like-button_active');
        checkLikesCounter(newPhotoCard, card);
      })
      .catch(openServerErrorPopup);
  }
}

export { setInitialLikes, checkLikesCounter, likeCardHandler }
