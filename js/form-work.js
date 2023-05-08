import { uploadErrorMessage, uploadSuccessMessage } from './messages.js';
import { sendPhoto } from './server-interaction.js';
import { getSliderOption } from './data.js';
const loader = document.querySelector('#upload-file');
const photoEditor = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const editablePhoto = document.querySelector('#editable-photo');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomOutBotton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const effectButtons = form.querySelectorAll('.effects__radio');
const fileInput = document.querySelector('#upload-file');
let checkedButton = form.querySelector('#effect-none');
const slider = form.querySelector('.effect-level__slider');
const effectValue = form.querySelector('.effect-level__value');
const pristine = new Pristine(form);
const MIN_SCALE = 25;
const MAX_SCALE = 100;


const validateComment = (value) => {
  const MIN_LENGTH = 20;
  const MAX_LENGTH = 140;
  return value.length >= MIN_LENGTH && value.length <= MAX_LENGTH - 1;
};

pristine.addValidator(
  form.querySelector('.text__description'),
  validateComment
);

function zoomInPhoto() {
  const scale = Number(scaleValue.value.replace('%', ''));
  if (scale !== MAX_SCALE) {
    const newScale = scale + MIN_SCALE;
    editablePhoto.style = `transform: scale(${newScale / MAX_SCALE})`;
    scaleValue.value = `${newScale}%`;
  }
}

function zoomOutPhoto() {
  const scale = Number(scaleValue.value.replace('%', ''));
  if (scale !== MIN_SCALE) {
    const newScale = scale - MIN_SCALE;
    editablePhoto.style = `transform: scale(${newScale / MAX_SCALE})`;
    scaleValue.value = `${newScale}%`;
  }
}

function effectChange(evt) {
  const pressedButton = evt.target;
  if (pressedButton !== checkedButton) {
    checkedButton.checked = false;
    pressedButton.checked = true;
    editablePhoto.classList.add(`effects__preview--${pressedButton.value}`);
    editablePhoto.classList.remove(`effects__preview--${checkedButton.value}`);
    checkedButton = pressedButton;

    if (pressedButton.value !== 'none') {
      slider.style.display = 'block';
      const sliderOption = getSliderOption(pressedButton.value);
      slider.noUiSlider.updateOptions(sliderOption);
      effectValue.value = sliderOption.start;
    }
    else {
      editablePhoto.style.filter = '';
      slider.style.display = 'none';
    }
  }
}

function CheckAndSubmitForm(evt) {
  evt.preventDefault();
  const submitButton = document.querySelector('#upload-submit');
  submitButton.disabled = true;

  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    sendPhoto(formData,
      () => {
        uploadSuccessMessage();
        closeImageEditor();
      },
      uploadErrorMessage
    );
  }
  else {
    uploadErrorMessage();
  }
  submitButton.disabled = false;
}


function openImageEditor() {
  const uploadedFile = fileInput.files[0];
  photoEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const fileReader = new FileReader();
  fileReader.onloadend = function () {
    editablePhoto.src = fileReader.result;
  };
  fileReader.readAsDataURL(uploadedFile);
  slider.style.display = 'none';

  effectButtons.forEach((button) => {
    button.addEventListener('click', effectChange);
  });
  document.addEventListener('keyup', closeImageEditorByEvent);
  closeButton.addEventListener('click', closeImageEditorByEvent);
  zoomInButton.addEventListener('click', zoomInPhoto);
  zoomOutBotton.addEventListener('click', zoomOutPhoto);
  form.addEventListener('submit', CheckAndSubmitForm);

  const imageTypes = ['image/jpeg', 'image/png'];
  if (!uploadedFile || imageTypes.indexOf(uploadedFile.type) === -1) {
    uploadErrorMessage();
    closeImageEditor();
  }
}

function closeImageEditor() {
  photoEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');

  form.reset();
  editablePhoto.removeAttribute('style');
  editablePhoto.removeAttribute('class');

  effectButtons.forEach((button) => {
    button.removeEventListener('click', effectChange);
  });
  document.removeEventListener('keyup', closeImageEditorByEvent);
  closeButton.removeEventListener('click', closeImageEditorByEvent);
  zoomInButton.removeEventListener('click', zoomInPhoto);
  zoomOutBotton.removeEventListener('click', zoomOutPhoto);
  form.removeEventListener('submit', CheckAndSubmitForm);
}

function closeImageEditorByEvent(evt) {
  if (evt.type !== 'keyup' || evt.key === 'Escape') {
    closeImageEditor();
  }
}
noUiSlider.create(slider, getSliderOption('chrome'));
slider.style.display = 'none';


slider.noUiSlider.on('update', () => {
  effectValue.value = slider.noUiSlider.get();
  let filterPhoto = '';
  switch (checkedButton.value) {
    case 'chrome':
      filterPhoto = `grayscale(${effectValue.value})`;
      break;
    case 'sepia':
      filterPhoto = `sepia(${effectValue.value})`;
      break;
    case 'marvin':
      filterPhoto = `invert(${effectValue.value}%)`;
      break;
    case 'phobos':
      filterPhoto = `blur(${effectValue.value}px)`;
      break;
    case 'heat':
      filterPhoto = `brightness(${effectValue.value})`;
      break;
    default:
      filterPhoto = '';
      break;
  }
  editablePhoto.style.filter = filterPhoto;
});

loader.addEventListener('change', openImageEditor);
export { closeImageEditorByEvent };
