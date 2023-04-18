import '../nouislider/nouislider.js';
import { uploadErrorMessage,uploadSuccessMessage } from './messages.js';
import { sendPhoto } from './server-interaction.js';
const loader = document.querySelector('#upload-file');
const photoEditor = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const editablePhoto = document.querySelector('#editable-photo');

function openImageEditor(evt) {
  photoEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const uploadedImage = document.querySelector('#upload-file').files[0];
  const fileReader = new FileReader();
  fileReader.onloadend = function () {
    editablePhoto.src = fileReader.result;
  };
  fileReader.readAsDataURL(uploadedImage);
}


function closeImageEditor() {
  photoEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');

  form.reset();
  editablePhoto.removeAttribute('style');
  editablePhoto.removeAttribute('class');

}

const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomOutBotton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');

function zoomInPhoto() {
  const scale = Number(scaleValue.value.replace('%', ''));
  if (scale !== 100) {
    const newScale = scale + 25;
    editablePhoto.style = `transform: scale(${newScale / 100})`;
    scaleValue.value = `${newScale}%`;
  }
}

function zoomOutPhoto() {
  const scale = Number(scaleValue.value.replace('%', ''));
  if (scale !== 25) {
    const newScale = scale - 25;
    editablePhoto.style = `transform: scale(${newScale / 100})`;
    scaleValue.value = `${newScale}%`;
  }
}

const effectButtons = form.querySelectorAll('.effects__radio');
let checkedButton = form.querySelector('#effect-none');

const slider = form.querySelector('.effect-level__slider');
const effectValue = form.querySelector('.effect-level__value');

function getSliderOption(effect) {
  if (effect === 'chrome' || effect === 'sepia') {
    return {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    };
  }
  else if (effect === 'marvin') {
    return {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
    };
  }
  else if (effect === 'phobos') {
    return {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    };
  }
  else if (effect === 'heat') {
    return {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    };
  }
}

noUiSlider.create(slider, getSliderOption('chrome'));
slider.style.display = 'none';

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

slider.noUiSlider.on('update', () => {
  effectValue.value = slider.noUiSlider.get();
  let filterPhoto = "";
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

effectButtons.forEach((button) => {
  button.addEventListener('click', effectChange);
});
loader.addEventListener('change', openImageEditor);
document.addEventListener('keyup', (evt) => {
  if (evt.key === 'Escape')
    closeImageEditor()
});
closeButton.addEventListener('click', closeImageEditor);
zoomInButton.addEventListener('click', zoomInPhoto);
zoomOutBotton.addEventListener('click', zoomOutPhoto);

form.addEventListener('submit', (evt) => {
  const pristine = new Pristine(form);
  evt.preventDefault();
  const IsValid = pristine.validate();
  const formData = new FormData(evt.target);
  if (IsValid) {
    sendPhoto(formData,
      () => {
        console.log(1);
        uploadSuccessMessage();
        closeImageEditor();
      },
      uploadErrorMessage
    );
  }
  else{
    uploadErrorMessage();
  }
});

