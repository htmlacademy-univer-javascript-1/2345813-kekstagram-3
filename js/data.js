import { getRandomNumber } from './util.js';

const DESCRIPTIONS = ['beautiful', 'sad', 'funny', 'sad', 'boring'];

function generatePhotoObject(id, url, descrition, likes, comments) {
  const photo = {
    id,
    url,
    descrition,
    likes,
    comments,
  };
  return photo;
}

function generateRandomPhotoObjects(number) {
  const photos = new Array(number);

  for (let i = 1; i <= number; i++) {
    photos[i - 1] = generatePhotoObject(i, `photos/${i}.jpg`, DESCRIPTIONS[i % 5], getRandomNumber(15, 200), getRandomNumber(0, 200));
  }
  return photos;
}

export { generateRandomPhotoObjects };
