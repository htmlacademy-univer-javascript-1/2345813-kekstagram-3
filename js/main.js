function getRandomNumber(from, to){
  if (from >= to){
    return 'Invalid input values';
  }

  return Math.random()*(to - from) + from;
}
let a= getRandomNumber(1,9);

function checkStringLength(string, Maxlength){

  return String(string).length <= Maxlength;
}

let b = checkStringLength('What is it?',11);
