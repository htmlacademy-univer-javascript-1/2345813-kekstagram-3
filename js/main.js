import { generateRandomPhotoObjects } from './data.js';
import { drawPhotos } from './thumbail-rendering.js';

const photos = generateRandomPhotoObjects(25);
drawPhotos(photos);

