function uploadSuccessMessage(){
  const succesMessage = document.querySelector('#success').content.cloneNode(true);
  succesMessage.querySelector('.success__button').addEventListener('click',closeSuccessMessage);
  document.body.appendChild(succesMessage);
}
function closeSuccessMessage(){
  document.body.querySelector('.success').remove();
}
function uploadErrorMessage(){
  const errorMessage = document.querySelector('#error').content.cloneNode(true);
  errorMessage.querySelector('.error__button').addEventListener('click',closeErrorMessage);
  document.body.appendChild(errorMessage);
  document.querySelector('.error').style.zIndex = '999';
}
function closeErrorMessage(){
  document.body.querySelector('.error').remove();
}


const pristine = new Pristine(form);
  function sendData(body) {
    fetch(
      'https://27.javascript.pages.academy/kekstagram-simple',
      {
        method: 'POST',
        body,
      },
    )
      .then((response) => {
        if (response.ok) {
          uploadSuccessMessage();
          closeImageEditor();
        } else {
          uploadErrorMessage();
        }
      })
      .catch((err) => {
        console.log(err);
        uploadErrorMessage();
      });
  }

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
      const sentInformation = new FormData(evt.target);
      sendData(sentInformation);
  });

