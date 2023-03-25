import { generateRandomPhotos } from './data.js';
import { drawPhotos } from './thumbail-rendering.js';

const photos = generateRandomPhotos(25);
drawPhotos(photos);

