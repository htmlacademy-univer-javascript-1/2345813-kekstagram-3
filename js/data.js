import { getRandomNumber } from './util.js';
function generatePhoto(id, url, descrition, likes, comments) {
  const photo = {
    id,
    url,
    descrition,
    likes,
    comments,
  };
  return photo;
}

function generateRandomPhotos(number) {
  const photos = new Array(number);
  const descritions = ['beautiful', 'sad', 'funny', 'sad', 'boring'];

  for (let i = 1; i <= number; i++) {
    photos[i - 1] = generatePhoto(i, `photos/${i}`, descritions[i % 5], getRandomNumber(15, 200), getRandomNumber(0, 200));
  }
  return photos;
}
export { generateRandomPhotos };
