import { closeImageEditorByEvent } from './form-work.js';
function uploadSuccessMessage() {
  const succesMessage = document.querySelector('#success').content.cloneNode(true);
  succesMessage.querySelector('.success__button').addEventListener('click', closeSuccessMessage);
  document.addEventListener('keyup', closeSuccessMessage);
  document.body.appendChild(succesMessage);
}
function closeSuccessMessage(evt) {
  if (evt.type !== 'keyup' || evt.key === 'Escape'){
    document.removeEventListener('keyup', closeSuccessMessage);
    document.querySelector('.success__button').removeEventListener('click', closeSuccessMessage);
    document.body.querySelector('.success').remove();
  }
}
function uploadErrorMessage() {
  const errorMessage = document.querySelector('#error').content.cloneNode(true);
  errorMessage.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  document.addEventListener('keyup', closeErrorMessage);
  document.body.appendChild(errorMessage);
  document.querySelector('.error').style.zIndex = '999';

  document.removeEventListener('keyup',closeImageEditorByEvent);
}
function closeErrorMessage(evt) {
  if (evt.type !== 'keyup' || evt.key === 'Escape'){
    document.removeEventListener('keyup', closeErrorMessage);
    document.querySelector('.error__button').removeEventListener('click', closeErrorMessage);
    document.body.querySelector('.error').remove();

    document.addEventListener('keyup',closeImageEditorByEvent);
  }
}
export {uploadErrorMessage,uploadSuccessMessage};
