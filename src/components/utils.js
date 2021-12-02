import { createCard } from './card.js';
import { getUserId, getInitialCards, getProfileInfo } from './api.js';

const profileName = document.querySelector('.profile__name');
const profileAdditionalInfo = document.querySelector('.profile__additional-info');
const profileAvatar = document.querySelector('.profile__avatar');
const cardsList = document.querySelector('.cards__list');

function setProfileValues() {
  getProfileInfo()
    .then(profileInfo => {
      profileName.textContent = profileInfo.name;
      profileAdditionalInfo.textContent = profileInfo.about;
      profileAvatar.src = profileInfo.avatar;
    })
}

function createInitialCards() {
  getInitialCards()
    .then(initialCards => {
      getUserId()
        .then(userId => {
          initialCards.reverse().forEach(card => {
            cardsList.prepend(createCard(card, userId));
          });
        })
    })
}

export { createInitialCards, setProfileValues, };
