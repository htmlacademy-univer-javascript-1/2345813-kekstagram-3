import { drawPhotos } from './thumbail-rendering.js';
import { showServerError, loadPhotos } from './server-interaction.js';

loadPhotos(drawPhotos,showServerError);
