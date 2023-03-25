function drawPhotos(photos) {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#picture');
  photos.forEach((photo) => {
    const picture = template.content.cloneNode(true);

    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__comments').textContent = photo.comments;
    picture.querySelector('.picture__likes').textContent = photo.likes;

    fragment.appendChild(picture);
  });
  const photoBlock = document.querySelector('.pictures');
  photoBlock.appendChild(fragment);
}

export { drawPhotos };
