import { getRandomNumber } from './util.js';

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
  const descritions = ['beautiful', 'sad', 'funny', 'sad', 'boring'];

  for (let i = 1; i <= number; i++) {
    photos[i - 1] = generatePhotoObject(i, `photos/${i}.jpg`, descritions[i % 5], getRandomNumber(15, 200), getRandomNumber(0, 200));
  }
  return photos;
}

export { generateRandomPhotoObjects };
