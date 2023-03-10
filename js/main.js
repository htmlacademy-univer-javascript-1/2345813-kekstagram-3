function getRandomNumber(from, to){
  if (from >= to){
    return 'Invalid input values';
  }

  return Math.random()*(to - from) + from;
}
getRandomNumber(1,9);

function checkStringLength(string, Maxlength){

  return String(string).length <= Maxlength;
}

checkStringLength('What is it?',11);
