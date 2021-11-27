function setPopupsListeners() {
  let mouseDownCaught = false;

  function removeMouseUpHandler(popup) {
    popup.removeEventListener('mouseup', mouseUpHandler);
  }

  function mouseUpHandler(evt) {
    const popup = evt.currentTarget;
    if (evt.target === popup) {
      closePopup(popup);
      removeMouseUpHandler(popup);
    }
    else {
      removeMouseUpHandler(popup);
    }
  }

  function mouseDownHandler(evt) {
    mouseDownCaught = true;
    const popup = evt.currentTarget;
    if (evt.target === popup) {
      popup.addEventListener('mouseup', mouseUpHandler);
    }
  }

  function overlayClickHandler(popup) {
    if (mouseDownCaught) {
      mouseDownCaught = false;
      return;
    }

    closePopup(popup);
    console.log('hey');
  }

  function closeButtonClickHandler(popup) {
    closePopup(popup);
  }

  function clickHandler(evt) {
    const popup = evt.currentTarget;
    if (evt.target === popup) {
      overlayClickHandler(popup);
    }
    else if (evt.target.classList.contains('popup__close-button')) {
      closeButtonClickHandler(popup);
    }
  }

  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', mouseDownHandler); // Чтобы попап не закрывался, например, при неаккуратном коприровании текста.
    popup.addEventListener('click', clickHandler); // Если не поймано событие mousedown, то будет отрабатывать обработчик события click. К примеру, на мобильных устройствах.
  });
}

function closePopupEscHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscHandler);
}

export { openPopup, closePopup, setPopupsListeners };
