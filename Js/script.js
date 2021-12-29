/*jshint esversion: 6 */
/*jshint -W087 */
let digit = 0;
const exeption = "810/232/2/1.5";
let temp = 0;
let result = 0;
firstItteration = true;

//check digits count function
const checkDigit = (exeptionElement) => {
  exeptionElement.forEach((element, index) => {
    if (
      index < exeptionElement.length - 1 &&
      exeptionElement[index] != "+" &&
      exeptionElement[index] != "-" &&
      exeptionElement[index] != "/" &&
      exeptionElement[index] != "*"
    ) {
      while (
        index < exeptionElement.length - 1 &&
        exeptionElement[index + 1] != "+" &&
        exeptionElement[index + 1] != "-" &&
        exeptionElement[index + 1] != "/" &&
        exeptionElement[index + 1] != "*"
      ) {
        exeptionElement[index] += exeptionElement[index + 1];
        exeptionElement.splice(index + 1, 1);
      }
    } else {
      exeptionElement[index] = exeptionElement[index];
    }
  });
  console.log(exeptionElement);
  return exeptionElement;
};

//Addition function
const addition = (ex) => {
  const exeptionElements = checkDigit(exeption.split(""));
  for (let i = 0; i <= exeptionElements.length; i++) {
    if (exeptionElements[i] === "+" && firstItteration === true) {
      temp = +exeptionElements[i - 1] + +exeptionElements[i + 1];
      result += temp;
      firstItteration = false;
      i++;
    }
    if (exeptionElements[i] === "+" && firstItteration == false) {
      result += +exeptionElements[i + 1];
    }
  }
  console.log(`temp= ${temp}\n result= ${result}`);
};
//addition(exeption);

//Substruct function
const substruct = (ex) => {
  const exeptionElements = checkDigit(exeption.split(""));
  for (let i = 0; i <= exeptionElements.length; i++) {
    if (exeptionElements[i] === "-" && firstItteration === true) {
      temp = +exeptionElements[i - 1] - +exeptionElements[i + 1];
      result += temp;
      firstItteration = false;
      i++;
    }
    if (exeptionElements[i] === "-" && firstItteration == false) {
      result -= +exeptionElements[i + 1];
    }
  }
  console.log(`temp= ${temp}\n result= ${result}`);
};
//substruct(exeption);

//division function
const division = (ex) => {
  const exeptionElements = checkDigit(exeption.split(""));
  for (let i = 0; i <= exeptionElements.length; i++) {
    if (exeptionElements[i] === "/" && firstItteration === true) {
      temp = +exeptionElements[i - 1] / +exeptionElements[i + 1];
      result = temp;
      firstItteration = false;
      i++;
    }
    if (exeptionElements[i] === "/" && firstItteration == false) {
      result /= +exeptionElements[i + 1];
    }
  }
  console.log(`temp= ${temp}\n result= ${result}`);
};
division(exeption);
