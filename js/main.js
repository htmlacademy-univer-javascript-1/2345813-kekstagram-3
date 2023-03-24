console.log(1);
import { generateRandomPhotos } from "./data.js";
import { drawPhoto } from "./thumbailRendering.js";

let photos = generateRandomPhotos(25);
drawPhoto(photos[1])
