const loader = document.querySelector('#upload-file');
const photoEditor = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const form = document.querySelector('#upload-select-image');

function openImageEditor() {
  photoEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

const editablePhoto = document.querySelector('#editable-photo');

function closeImageEditor(evt) {
  if (evt.key === 'Escape' || evt.target === closeButton) {
    photoEditor.classList.add('hidden');
    document.body.classList.remove('modal-open');

    form.reset();
    editablePhoto.style = 'transform: scale(1)';
  }
}

const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomOutBotton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');

function zoomInPhoto() {
  const scale = Number(scaleValue.value.replace('%', ''));
  if (scale !== 100) {
    const newScale = scale +25;
    editablePhoto.style = `transform: scale(${newScale/100})`;
    scaleValue.value = `${newScale}%`
  }
}

function zoomOutPhoto() {
  const scale = Number(scaleValue.value.replace('%', ''));
  if (scale !== 25) {
    const newScale = scale -25;
    editablePhoto.style = `transform: scale(${newScale/100})`;
    scaleValue.value = `${newScale}%`;
  }
}

const effectButtons = form.querySelectorAll('.effects__radio');
let checkedButton = form.querySelector('#effect-none');

function effectChange(evt){
  const pressedButton = evt.target;
  if(pressedButton !== checkedButton){
      checkedButton.checked = false;
      pressedButton.checked = true;
      editablePhoto.classList.remove(`effects__preview--${checkedButton.value}`);
      editablePhoto.classList.add(`effects__preview--${pressedButton.value}`);
      checkedButton = pressedButton;
  }
}


effectButtons.forEach((button) => {
  button.addEventListener('click', effectChange);
});
loader.addEventListener('change', openImageEditor);
document.addEventListener('keyup', closeImageEditor);
closeButton.addEventListener('click', closeImageEditor);
zoomInButton.addEventListener('click', zoomInPhoto);
zoomOutBotton.addEventListener('click', zoomOutPhoto);

