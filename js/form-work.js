//import '../pristine/pristine.min.js'
let loader = document.querySelector('#upload-file');
let photoEditor = document.querySelector('.img-upload__overlay');
let closeButton = document.querySelector('#upload-cancel');

function openImageEditor(evt){
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
