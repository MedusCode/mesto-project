function clickOverlayPopupHandler(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function pressEscPopupHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', clickOverlayPopupHandler);
  document.addEventListener('keydown', pressEscPopupHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', clickOverlayPopupHandler);
  document.removeEventListener('keydown', pressEscPopupHandler);
}

export { openPopup, closePopup };
