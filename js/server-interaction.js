const URL = 'https://27.javascript.pages.academy/kekstagram-simple/data';

const showServerError = () => {
  // eslint-disable-next-line
  console.error('Photos could not be loaded from the server');
};
function loadPhotos(onSuccess, onFail) {
  fetch(URL).then((response) => {
    response.json().then((photos) => onSuccess(photos));
  })
    .catch(onFail);
}


function sendPhoto(body, onSuccess, onFail) {
  fetch(
    'https://27.javascript.pages.academy/kekstagram-simple',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export { showServerError, loadPhotos, sendPhoto };
