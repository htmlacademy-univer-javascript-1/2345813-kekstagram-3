function getRandomNumber(a, b){
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength (string, length) {
  return string.length <= length;
}

function generatePhotos(number){
  let photos = new Array(number);
  descritions = ['beautiful', 'sad', 'funny', 'sad', 'boring'];

  for (let i = 1; i<=number; i++){
    photos[i-1] = {
      id: i,
      url: 'photos/' + i,
      descrition: descritions[i % 5],
      likes: getRandomNumber(15,200),
      comments: getRandomNumber(0,200),
    }
  }
  return photos
}
console.log(generatePhotos(25)[1]);
