function uploadSuccessMessage() {
  console.log(1);
  const succesMessage = document.querySelector('#success').content.cloneNode(true);
  succesMessage.querySelector('.success__button').addEventListener('click', closeSuccessMessage);
  document.body.appendChild(succesMessage);
}
function closeSuccessMessage() {
  document.body.querySelector('.success').remove();
}
function uploadErrorMessage() {
  const errorMessage = document.querySelector('#error').content.cloneNode(true);
  errorMessage.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  document.body.appendChild(errorMessage);
  document.querySelector('.error').style.zIndex = '999';
}
function closeErrorMessage() {
  document.body.querySelector('.error').remove();
}
export {uploadErrorMessage,uploadSuccessMessage}
