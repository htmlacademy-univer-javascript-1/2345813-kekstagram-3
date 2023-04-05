import '../nouislider/nouislider.js';
const loader = document.querySelector('#upload-file');
const photoEditor = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');

function openImageEditor() {
  photoEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  form.reset();
}

const editablePhoto = document.querySelector('#editable-photo');

function closeImageEditor(evt) {
  if (evt.key === 'Escape' || evt.target === closeButton) {
    photoEditor.classList.add('hidden');
    document.body.classList.remove('modal-open');

    form.reset();
    editablePhoto.removeAttribute('style');
    editablePhoto.removeAttribute('class');

  }
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
  editablePhoto.style.filter =
  checkedButton.value === 'chrome'
    ? `grayscale(${effectValue.value})`
    : checkedButton.value === 'sepia'
    ? `sepia(${effectValue.value})`
    : checkedButton.value === 'marvin'
    ? `invert(${effectValue.value}%)`
    : checkedButton.value === 'phobos'
    ? `blur(${effectValue.value}px)`
    : checkedButton.value === 'heat'
    ? `brightness(${effectValue.value})`
    : '';
});

effectButtons.forEach((button) => {
  button.addEventListener('click', effectChange);
});
loader.addEventListener('change', openImageEditor);
document.addEventListener('keyup', closeImageEditor);
closeButton.addEventListener('click', closeImageEditor);
zoomInButton.addEventListener('click', zoomInPhoto);
zoomOutBotton.addEventListener('click', zoomOutPhoto);

