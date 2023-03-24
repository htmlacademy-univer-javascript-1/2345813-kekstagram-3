import { generateRandomPhotos } from "./data.js";
import { drawPhotos } from "./thumbailRendering.js";

let photos = generateRandomPhotos(25);
drawPhotos(photos);

