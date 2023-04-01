import '../pristine/pristine.min.js'
const loader = document.querySelector('#upload-file');
const photoEditor = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');

function openImageEditor(){
  photoEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
}
loader.addEventListener('change', openImageEditor);


function closeImageEditor(evt){
  if(evt.key === 'Escape' || evt.target === closeButton){
    photoEditor.classList.add('hidden');
    document.body.classList.remove('modal-open');

    loader.reset();
  }
}

document.addEventListener('keyup', closeImageEditor);
closeButton.addEventListener('click', closeImageEditor);


window.onload = function () {

  const form = document.getElementById(".text__description");

  // create the pristine instance
  const pristine = new Pristine(form);

  form.addEventListener('submit', function (e) {
     e.preventDefault();

     // check if the form is valid
     const valid = pristine.validate(); // returns true or false

  });
};