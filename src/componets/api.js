function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
} 

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-16",
  headers: {
    authorization: "ac490a89-f995-48f9-b5f2-220c6032f771",
    "Content-Type": "application/json",
  },
};

const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
  .then((res) => {
    return getResponseData(res);
  })
};

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
  .then((res) => {
    return getResponseData(res);
  })
};

const patchProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
  .then((res) => {
    return getResponseData(res);
  })
};

const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,    
    }),
  })
  .then((res) => {
    return getResponseData(res);
  })
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => {
    return getResponseData(res);
  })
};


const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then((res) => {
    return getResponseData(res);
  })
};

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => {
    return getResponseData(res);
  })
};

const patchAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then((res) => {
    return getResponseData(res);
  })
};

export { getProfile, getCards, patchProfile, postCard, deleteCard, putLike, deleteLike, patchAvatar};