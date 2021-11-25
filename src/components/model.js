function isCursorOnOverlay(evt) {
  const poupContainerRect = evt.currentTarget.querySelector('.popup__container').getBoundingClientRect();
  const cursorXPosition = evt.clientX;
  const cursorYPosition = evt.clientY;
  return (cursorYPosition < poupContainerRect.top || cursorYPosition > poupContainerRect.bottom || cursorXPosition > poupContainerRect.right || cursorXPosition < poupContainerRect.left);
}

function pointerMoveHandler(evt) {
  const closeButton = evt.currentTarget.querySelector('.popup__close-button');
  if (isCursorOnOverlay(evt)) {
    closeButton.classList.add('popup__close-button_hover');
  }
  else {
    closeButton.classList.remove('popup__close-button_hover');
  }
}

function pointerUpHandler(evt) {
  const popup = evt.currentTarget;
  if (isCursorOnOverlay(evt)) {
    closePopup(popup);
  }
  else {
    popup.removeEventListener('mouseup', pointerUpHandler);
    popup.removeEventListener('touchend', pointerUpHandler);
  }
}

function pointerDownHandler(evt) {
  const popup = evt.currentTarget;
  if (isCursorOnOverlay(evt)) {
    popup.addEventListener('mouseup', pointerUpHandler);
    popup.addEventListener('touchend', pointerUpHandler);
  }
  else {
    popup.removeEventListener('mousemove', pointerMoveHandler);
  }
}

function addOverlayClickListeners(popup) {
  popup.addEventListener('mousedown', pointerDownHandler);
  popup.addEventListener('touchstart', pointerDownHandler);
  popup.addEventListener('mousemove', pointerMoveHandler);
  popup.addEventListener('mouseup', evt => {
    evt.currentTarget.addEventListener('mousemove', pointerMoveHandler);
  });
}

function removeOverlayClickListeners(popup) {
  popup.removeEventListener('mousedown', pointerDownHandler);
  popup.removeEventListener('mouseup', pointerUpHandler);
  popup.removeEventListener('touchstart', pointerDownHandler);
  popup.removeEventListener('touchend', pointerUpHandler);
  popup.removeEventListener('mousemove', pointerMoveHandler);
}

function closePopupEscHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addOverlayClickListeners(popup);
  document.addEventListener('keydown', closePopupEscHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeOverlayClickListeners(popup);
  document.removeEventListener('keydown', closePopupEscHandler);
}

export { openPopup, closePopup };
