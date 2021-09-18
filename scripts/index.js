function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAddInfo.textContent = addInfoInput.value;
  popupEditForm.classList.remove('popup_opened');
}

const popupEditForm = document.querySelector('#popup-edit-form');
const popupAddForm = document.querySelector('#popup-add-form');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editForm = popupEditForm.querySelector('#edit-form');
const nameInput = editForm.querySelector('#name-input');
const profileName = document.querySelector('.profile__name');
const addInfoInput = editForm.querySelector('#additional-info-input');
const profileAddInfo = document.querySelector('.profile__additional-info');

console.log(popupAddForm);

editButton.addEventListener('click', () => {
  popupEditForm.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  addInfoInput.value = profileAddInfo.textContent;
})

addButton.addEventListener('click', () => {
  popupAddForm.classList.add('popup_opened');
})

document.querySelectorAll('.popup__close-button').forEach((CloseButton) => {
  CloseButton.addEventListener ('click', () => {
    document.querySelectorAll('.popup').forEach((popup) => {
      popup.classList.remove('popup_opened');
    })
  })
})

editForm.addEventListener('submit', formSubmitHandler);
