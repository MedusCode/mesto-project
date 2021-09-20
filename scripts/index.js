const popupEditForm = document.querySelector('#popup-edit-form');
const popupAddForm = document.querySelector('#popup-add-form');
const popupFullPhoto = document.querySelector('#popup-full-photo');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editForm = popupEditForm.querySelector('.form');
const nameInput = editForm.querySelector('#name-input');
const addInfoInput = editForm.querySelector('#additional-info-input');
const addForm = popupAddForm.querySelector('.form');
const photoNameInput = addForm.querySelector('#photo-name-input');
const photoLinkInput = addForm.querySelector('#photo-link-input');
const profileName = document.querySelector('.profile__name');
const profileAddInfo = document.querySelector('.profile__additional-info');
const cardsList = document.querySelector('.cards__list');
const photoCardTemplate = document.querySelector('#photo-card-template').content;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function EditFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAddInfo.textContent = addInfoInput.value;
  popupEditForm.classList.remove('popup_opened');
}

function AddFormSubmitHandler (evt) {
  evt.preventDefault();
  const newPhotoCard = photoCardTemplate.querySelector('.card').cloneNode(true);
  newPhotoCard.querySelector('.card__photo').src = photoLinkInput.value;
  newPhotoCard.querySelector('.card__photo-name').textContent = photoNameInput.value;
  newPhotoCard.querySelector('.card__photo').addEventListener('click', (event) => {
    popupFullPhoto.querySelector('.full-photo__photo').src = event.target.src;
    popupFullPhoto.querySelector('.full-photo__name').textContent = event.target.parentElement.querySelector('.card__photo-name').textContent;
    popupFullPhoto.classList.add('popup_opened');
  })
  newPhotoCard.querySelector('.card__like-button').addEventListener('click', (event) => {
    event.target.classList.toggle('card__like-button_active');
  })
  newPhotoCard.querySelector('.card__trash-button').addEventListener('click', (event) => {
    event.target.closest('.card').remove();
  })
  photoLinkInput.value = '';
  photoNameInput.value = '';
  cardsList.prepend(newPhotoCard);
  popupAddForm.classList.remove('popup_opened');
}

editForm.addEventListener('submit', EditFormSubmitHandler);

addForm.addEventListener('submit', AddFormSubmitHandler);

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  addInfoInput.value = profileAddInfo.textContent;
  popupEditForm.classList.add('popup_opened');
})

addButton.addEventListener('click', () => {
  popupAddForm.classList.add('popup_opened');
})

document.querySelectorAll('.popup__close-button').forEach((CloseButton) => {
  CloseButton.addEventListener ('click', (event) => {
    event.target.closest('.popup').classList.remove('popup_opened');
  })
});

initialCards.forEach((element) => {
  photoLinkInput.value = element.link;
  photoNameInput.value = element.name;
  addForm.querySelector('.form__save-button').click();
})


