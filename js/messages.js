import { closeImageEditorByEvent } from './form-work.js';

let errorMessage;
let succesMessage;

function uploadSuccessMessage() {
  const clonedSuccesMessage = document.querySelector('#success').content.cloneNode(true);
  clonedSuccesMessage.querySelector('.success__button').addEventListener('click', closeSuccessMessage);
  document.addEventListener('click', closeSuccessMessageOnAnotherClick);
  document.addEventListener('keyup', closeSuccessMessage);
  document.body.appendChild(clonedSuccesMessage);
  succesMessage = document.body.querySelector('.success');
}
function closeSuccessMessage(evt) {
  if (evt.type !== 'keyup' || evt.key === 'Escape') {
    document.removeEventListener('keyup', closeSuccessMessage);
    document.querySelector('.success__button').removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('click', closeSuccessMessageOnAnotherClick);
    succesMessage.remove();
    document.removeEventListener('keyup', closeSuccessMessage);
  }
}

function closeSuccessMessageOnAnotherClick(evt){
  if(evt.target===succesMessage){
    closeSuccessMessage(evt);
  }
}
function uploadErrorMessage() {
  const clonedErrorMessage = document.querySelector('#error').content.cloneNode(true);
  clonedErrorMessage.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  document.addEventListener('click', closeErrorMessageOnAnotherClick);
  document.addEventListener('keyup', closeErrorMessage);
  document.body.appendChild(clonedErrorMessage);
  errorMessage = document.body.querySelector('.error');
  errorMessage.style.zIndex = '999';

  document.removeEventListener('keyup', closeImageEditorByEvent);
}
function closeErrorMessage(evt) {
  if (evt.type !== 'keyup' || evt.key === 'Escape') {
    errorMessage.querySelector('.error__button').addEventListener('click', closeErrorMessage);
    document.removeEventListener('click', closeErrorMessageOnAnotherClick);
    document.removeEventListener('keyup', closeErrorMessage);
    errorMessage.remove();

    document.addEventListener('keyup', closeImageEditorByEvent);
    document.removeEventListener('keyup', closeErrorMessage);
  }
}
function closeErrorMessageOnAnotherClick(evt){
  if(evt.target===errorMessage){
    closeErrorMessage(evt);
  }
}
export { uploadErrorMessage, uploadSuccessMessage };
