import { createCard } from './card.js';
import { getInitialCards } from './api.js';

const cardsList = document.querySelector('.cards__list');

function createInitialCards () {
  getInitialCards()
    .then(initialCards => {
      initialCards.forEach(element => {
        cardsList.prepend(createCard(element.link, element.name));
      });
    })
}

export { createInitialCards };
