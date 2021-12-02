import { openPopup, closePopup } from './model.js';
import { deleteCard } from './api.js';

const deleteCardPopup = document.querySelector('.popup_type_delete-card');
const deleteCardButton = deleteCardPopup.querySelector('.popup__accept-button');

function deleteCardHandler(evt) {
  const button = evt.currentTarget;
  deleteCard(button.cardId)
    .then(() => {
      button.card.remove();
      closePopup(document.querySelector('.popup_opened'));
    })
}

function addTrashButton(newPhotoCard, cardId) {
  const trashButton = document.createElement('button');
  trashButton.classList.add('card__trash-button', 'page__button', 'page__button_style_transparent');
  trashButton.addEventListener('click', () => {
    deleteCardButton.removeEventListener('click', deleteCardHandler);
    deleteCardButton.cardId = cardId;
    deleteCardButton.card = newPhotoCard;
    deleteCardButton.addEventListener('click', deleteCardHandler);
    openPopup(deleteCardPopup);
  });
  newPhotoCard.appendChild(trashButton);
}

export { addTrashButton };
