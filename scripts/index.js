const popupEditForm = document.querySelector('.popup_type_edit-profile');
const popupAddForm = document.querySelector('.popup_type_add-card');
const popupFullPhoto = document.querySelector('.popup_type_full-photo');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editForm = popupEditForm.querySelector('.form');
const nameInput = editForm.querySelector('.form__input_type_name');
const addInfoInput = editForm.querySelector('.form__input_type_additional-info');
const addForm = popupAddForm.querySelector('.form');
const photoNameInput = addForm.querySelector('.form__input_type_photo-name');
const photoLinkInput = addForm.querySelector('.form__input_type_photo-link');
const profileName = document.querySelector('.profile__name');
const profileAddInfo = document.querySelector('.profile__additional-info');
const cardsList = document.querySelector('.cards__list');
const photoCardTemplate = document.querySelector('#photo-card-template').content;

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function createCard(cardPhotoLink, cardName) {
  const newPhotoCard = photoCardTemplate.querySelector('.card').cloneNode(true);
  const newPhoto = newPhotoCard.querySelector('.card__photo');
  const newName = newPhotoCard.querySelector('.card__photo-name');
  newPhoto.src = cardPhotoLink;
  newName.textContent = cardName;
  newPhoto.addEventListener('click', () => {
    popupFullPhoto.querySelector('.full-photo__photo').src = newPhoto.src;
    popupFullPhoto.querySelector('.full-photo__name').textContent = newName.textContent;
    openPopup(popupFullPhoto);
  });
  newPhotoCard.querySelector('.card__like-button').addEventListener('click', (event) => {
    event.target.classList.toggle('card__like-button_active');
  });
  newPhotoCard.querySelector('.card__trash-button').addEventListener('click', () => {
    newPhotoCard.remove();
  });
  return newPhotoCard;
}

function editFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAddInfo.textContent = addInfoInput.value;
  closePopup(popupEditForm);
}

function addFormSubmitHandler (evt) {
  evt.preventDefault();
  cardsList.prepend(createCard(photoLinkInput.value, photoNameInput.value));
  photoLinkInput.value = '';
  photoNameInput.value = '';
  closePopup(popupAddForm);
}


editForm.addEventListener('submit', editFormSubmitHandler);

addForm.addEventListener('submit', addFormSubmitHandler);

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  addInfoInput.value = profileAddInfo.textContent;
  openPopup(popupEditForm);
});

addButton.addEventListener('click', () => {
  openPopup(popupAddForm);
});

document.querySelectorAll('.popup__close-button').forEach((closeButton) => {
  closeButton.addEventListener ('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

initialCards.forEach((element) => {
  cardsList.prepend(createCard(element.link, element.name));
});


