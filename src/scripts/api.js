const config = {
  baseURL: "https://nomoreparties.co/v1/wff-cohort-27",
  headers: {
    authorization: "27e5a5dc-daf8-4e11-bc03-4831131ab86e",
    "Content-Type": "application/json",
  },
};

// не рабоатет

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getDataAboutClient = () => {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

export const getCardData = () => {
  return fetch(`${config.baseURL}/cards `, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

export const updateDataProfile = (nameProfile, profileDescription) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameProfile,
      about: profileDescription,
    }),
  });
};

export const postNewCard = (name, link) => {
  return fetch(`${config.baseURL}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const addLike = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

export const updateAvatar = (avatar) => {
  return fetch(`${config.baseURL}/users/me/avatar `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  });
};
