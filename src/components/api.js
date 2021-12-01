import { openServerErrorPopup } from './model.js'

const config = {
  server: 'https://nomoreparties.co/v1/',
  cohortId: 'plus-cohort-4',
  token: '590940f5-109a-4e3f-877b-dbdaff7dcb8c',
}

function manipulateJsonFromServer(source, method = 'GET', body = null) {
  return fetch(`${config.server + config.cohortId}/${source}`, {
    method: method,
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: body
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`${res.status}: ${res.statusText}`);
      }
    })
    .catch(openServerErrorPopup)
}

function getUserId() {
  return manipulateJsonFromServer('users/me')
    .then(profile => {
      return profile._id;
    })
}

function getProfileInfo() {
  return manipulateJsonFromServer('users/me');
}

function patchProfileInfo(name, about) {
  return manipulateJsonFromServer('users/me', 'PATCH', JSON.stringify({
    name: name,
    about: about,
  }));
}

function getInitialCards() {
  return manipulateJsonFromServer('cards');
}

function postNewCard(name, link) {
  return manipulateJsonFromServer('cards', 'POST', JSON.stringify({
    name: name,
    link: link,
  }));
}

function deleteCard(cardId) {
  return manipulateJsonFromServer(`cards/${cardId}`, 'DELETE');
}



export { getUserId, getInitialCards, getProfileInfo, patchProfileInfo, postNewCard, deleteCard };
