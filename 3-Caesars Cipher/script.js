const alphabet = [ 'A', 'B',  'C',  'D',  'E',  'F',  'G',  'H',  'I',  'J',  'K',  'L',  'M',  'N',  'O',  'P',  'Q',  'R',  'S',  'T',  'U',  'V',  'W',  'X',  'Y',  'Z' ] //26 letras

function rot13(str) {
  let arr = "".concat(str).match(/\w+\S/gi); 
  let decoded = arr
  .reduce((acc, word) => { 
    let decodedWord = "";
    for (let letter of word) {
      let isLetter = alphabet.indexOf(letter) >= 0 ? true : false;

      if(isLetter) { 
        let pos = alphabet.indexOf(letter) + 13;
        if(pos > 25) 
          pos -= 26;
        let decodedLetter = alphabet[pos];
        decodedWord += decodedLetter;
      }
      else
        decodedWord += letter; 
    }
    return acc.concat(decodedWord);
  }, [])
  .join(" "); 
  return decoded;
}

rot13("SERR PBQR PNZC");
rot13("SERR CVMMN!");

//GENERATE ALPHABET (ASCII CODE FROM 65 UNTIL 90)
/*
let arr = [];
for (let i = 65; i <= 90; i++) {
  arr.push(String.fromCharCode(i));
  //"ABC".charCodeAt(0); //65 -> equivale ao "A" em ASCII
}
console.log(arr)
*/
