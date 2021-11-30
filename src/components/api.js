import { openServerErrorPopup } from './model.js'

const config = {
  server: 'https://nomoreparties.co/v1/',
  cohortId: 'plus-cohort-4',
  token: '590940f5-109a-4e3f-877b-dbdaff7dcb8c',
}

function getJsonFromServer(source) {
  return fetch(`${config.server + config.cohortId}/${source}`, {
    headers: {
      authorization: config.token
    }
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

function getInitialCards() {
  return getJsonFromServer('cards')
    .then(cards => {
      return cards;
    })
}

export { getInitialCards };
