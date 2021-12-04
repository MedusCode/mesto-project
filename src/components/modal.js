import { openPopup, closePopup } from './utils.js';

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

const serverErrorPopup = document.querySelector('.popup_type_server-error');
const serverErrorMessage = document.querySelector('.server-error__message');

function openServerErrorPopup(errorMessage) {
  serverErrorMessage.textContent = errorMessage;
  openPopup(serverErrorPopup);
}

export { setPopupsListeners, openServerErrorPopup, closePopupEscHandler };
