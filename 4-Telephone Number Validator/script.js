function telephoneCheck(str) {
  let regexSemAspas = /^[1]*[\s]*[\d]{3}[\s]*[-]*[\d]{3}[\s]*[-]*[\d]{4}$/g;
  let regexComAspas = /^[1]*[\s]*[(][\d]{3}[)][\s]*[-]*[\d]{3}[\s]*[-]*[\d]{4}$/g;
  let numberArr1 = str.match(regexSemAspas);
  let numberArr2 = str.match(regexComAspas);

  if(numberArr1 == null) {
    if (numberArr2 == null)
      return false;
    numberArr1 = [].concat(numberArr2);
  }

  let numberArrSimplex = numberArr1.join("").match(/\d/g);
  if (numberArrSimplex.length == 11) {
    if(numberArrSimplex[0] == 1) 
      return true;
    else
      return false;
  }

  if(numberArrSimplex.length == 10)
    return true;

  return false;
}

console.log(telephoneCheck("1 555)555-5555"));
