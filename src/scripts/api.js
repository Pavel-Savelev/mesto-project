export const getDataAboutClient = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me',{
        headers: {
            authorization: '27e5a5dc-daf8-4e11-bc03-4831131ab86e',
            'Content-Type': 'application/json'
          }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });

}

export const getCardData = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/cards ',{
        headers: {
            authorization: '27e5a5dc-daf8-4e11-bc03-4831131ab86e',
            'Content-Type': 'application/json'
          }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const updateDataProfile = (nameProfile,profileDescription) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me',{
    method:'PATCH',
    headers: {
      authorization: '27e5a5dc-daf8-4e11-bc03-4831131ab86e',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameProfile,
      about: profileDescription
    })
  })
}

export const postNewCard = (name,link) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-27/cards',{
    method:'POST',
    headers: {
      authorization: '27e5a5dc-daf8-4e11-bc03-4831131ab86e',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }); 
}

export const deleteCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/${cardId}`,{
    method:'DELETE',
    headers: {
      authorization: '27e5a5dc-daf8-4e11-bc03-4831131ab86e',
      'Content-Type': 'application/json'
    }
  })
}

export const addLike = (cardId) =>{
  return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardId}`,{
    method:'PUT',
    headers: {
      authorization: '27e5a5dc-daf8-4e11-bc03-4831131ab86e',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const deleteLike = (cardId) =>{
  return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardId}`,{
    method:'DELETE',
    headers: {
      authorization: '27e5a5dc-daf8-4e11-bc03-4831131ab86e',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const updateAvatar = (avatar) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-27/users/me/avatar `,{
    method:'PATCH',
    headers: {
      authorization: '27e5a5dc-daf8-4e11-bc03-4831131ab86e',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar
    })
  })
  .then(res => {
    if (res.ok) {
      return (res.json());
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
  
}
