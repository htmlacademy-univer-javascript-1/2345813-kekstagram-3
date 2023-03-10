function getRandomNumber(from, to){
  if (from >= to){
    return "Invalid input values";
  }

  return Math.random()*(to - from) + from;
}
console.log(getRandomNumber(1,9))

function checkStringLength(string, Maxlength){

  return String(string).length <= Maxlength;
}

console.log(checkStringLength("What is it?",2))
console.log(checkStringLength("What is it?",11))
