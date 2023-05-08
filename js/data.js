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
export { getSliderOption };
