import { generateRandomPhotos } from './data.js';
import { drawPhotos } from './thumbailRendering.js';

const photos = generateRandomPhotos(25);
drawPhotos(photos);

