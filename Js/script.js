//F that check operators in mass by index
let digit = 0;
let temp = 0;
let result = 0;
let itteration = 0;
firstItteration = true;
let exeption = "-810+232*44-22+(2-18)*(45+3)-44";
let operatorsStack = [];
/////////////////////////////////String to digits
const checkDigit = (exeptionElement) => {
  const specialChars = ["+", "-", "/", "*", "(", ")"];
  exeptionElement.forEach((element, index) => {
    if (
      index < exeptionElement.length - 1 &&
      !specialChars.includes(exeptionElement[index])
    ) {
      while (
        index < exeptionElement.length - 1 &&
        !specialChars.includes(exeptionElement[index + 1])
      ) {
        exeptionElement[index] += exeptionElement[index + 1];
        exeptionElement.splice(index + 1, 1);
      }
    } else {
      exeptionElement[index] = exeptionElement[index];
    }
  });
  digitalSign(exeptionElement);
  console.log(exeptionElement);
  return exeptionElement;
};

/////////////////////////////////negative digits
const digitalSign = (exeptionElement) => {
  exeptionElement.forEach((element, index) => {
    if (
      (exeptionElement[index] === "-" && index === 0) ||
      (exeptionElement[index] === "-" && exeptionElement[index - 1] == "(")
    ) {
      exeptionElement[index] += exeptionElement[index + 1];
      exeptionElement.splice(index + 1, 1);
    }
  });
};

/////////////////////////////////Main calculations
const calculations = (ex) => {
  let exeptionElements = checkDigit(exeption.split(""));
  let tempResult;

  let a = "*",
    b = "/";
  ////test
  let scopeFirst = 0;
  while (exeptionElements.indexOf("(") !== -1) {
    scopeFirst = exeptionElements.indexOf("(");
    scopes(scopeFirst, exeptionElements);
  }
  // operatorsStack.push(exeptionElements.filter((el) => el == "*" || el == "/"));
  // operatorsStack.push(exeptionElements.filter((el) => el == "+" || el == "-"));
  // let operators = [].concat(...operatorsStack);
  itteration++;

  ////////

  ///////////// * and /
  for (let i = 1; i < exeptionElements.length; i++) {
    operatorsStack.push(
      exeptionElements.filter((el) => el == "*" || el == "/")
    );
    operatorsStack.push(
      exeptionElements.filter((el) => el == "+" || el == "-")
    );
    let operators = [].concat(...operatorsStack);
    itteration++;
    if (
      exeptionElements.indexOf("*", 1) !== -1 ||
      exeptionElements.indexOf("/", 1) !== -1
    ) {
      switch (exeptionElements[i]) {
        case "*":
          itteration++;
          multiply(
            exeptionElements[i - 1],
            i,
            exeptionElements[i + 1],
            exeptionElements
          );
          i = i - 1;
          break;
        case "/":
          itteration++;
          devision(
            exeptionElements[i - 1],
            i,
            exeptionElements[i + 1],
            exeptionElements
          );
          i = i - 1;
          break;
      }
    } else {
      break;
    }
  }

  ///////////// + and -
  for (let i = 1; i < exeptionElements.length; i++) {
    itteration++;
    switch (exeptionElements[i]) {
      case "+":
        itteration++;
        addition(
          exeptionElements[i - 1],
          i,
          exeptionElements[i + 1],
          exeptionElements
        );
        i = i - 1;
        break;
      case "-":
        itteration++;
        substruct(
          exeptionElements[i - 1],
          i,
          exeptionElements[i + 1],
          exeptionElements
        );
        i = i - 1;
        break;
    }
  }

  console.log(result);
  console.log(itteration);
};

//////////////////////////////////////////////////Equations

//////////////////////////////////Scopes
const scopes = (scopeIndex, exeptionElements) => {
  let scopeEnd = exeptionElements.indexOf(")");
  let inScopeLength = scopeEnd - scopeIndex - 1;
  //let scopeElements = exeptionElements.splice(scopeIndex + 1, inScopeLength);

  // operatorsStack.push(scopeElements.filter((el) => el == "*" || el == "/"));
  // operatorsStack.push(scopeElements.filter((el) => el == "+" || el == "-"));
  // let operators = [].concat(...operatorsStack);
  for (let i = scopeIndex + 1; i < scopeEnd; i++) {
    switch (exeptionElements[i]) {
      case "*":
        itteration++;
        multiply(
          exeptionElements[i - 1],
          i,
          exeptionElements[i + 1],
          exeptionElements
        );
        scopeEnd = exeptionElements.indexOf(")");
        i = i - 1;
        break;
      case "/":
        itteration++;
        devision(
          exeptionElements[i - 1],
          i,
          exeptionElements[i + 1],
          exeptionElements
        );
        scopeEnd = exeptionElements.indexOf(")");
        i = i - 1;
        break;
      default:
    }
    //exeptionElements[elementIndex - 1] = res;
  }

  ///// + -
  for (let i = scopeIndex + 1; i < scopeEnd; i++) {
    switch (exeptionElements[i]) {
      case "+":
        itteration++;
        addition(
          exeptionElements[i - 1],
          i,
          exeptionElements[i + 1],
          exeptionElements
        );
        scopeEnd = exeptionElements.indexOf(")");
        i = i - 1;
        break;
      case "-":
        itteration++;
        substruct(
          exeptionElements[i - 1],
          i,
          exeptionElements[i + 1],
          exeptionElements
        );
        scopeEnd = exeptionElements.indexOf(")");
        i = i - 1;
        break;
      default:
    }
    //exeptionElements[elementIndex - 1] = res;
  }
  exeptionElements.splice(scopeIndex, 1);
  exeptionElements.splice(scopeIndex + 1, 1);
};

/////////////////////////////////Multiply
const multiply = (
  beforeElement,
  elementIndex,
  afterElement,
  exeptionElements
) => {
  let res = beforeElement * afterElement;
  exeptionElements[elementIndex - 1] = res;
  exeptionElements.splice(elementIndex, 2);
  console.log(exeptionElements);
};

/////////////////////////////////Addition
const addition = (
  beforeElement,
  elementIndex,
  afterElement,
  exeptionElements
) => {
  let res = +beforeElement + +afterElement;
  exeptionElements[elementIndex - 1] = res;
  exeptionElements.splice(elementIndex, 2);
  console.log(exeptionElements);
};

/////////////////////////////////Substruct
const substruct = (
  beforeElement,
  elementIndex,
  afterElement,
  exeptionElements
) => {
  let res = +beforeElement - +afterElement;
  exeptionElements[elementIndex - 1] = res;
  exeptionElements.splice(elementIndex, 2);
  console.log(exeptionElements);
};

/////////////////////////////////Devision
const devision = (
  beforeElement,
  elementIndex,
  afterElement,
  exeptionElements
) => {
  let res = +beforeElement / +afterElement;
  exeptionElements[elementIndex - 1] = res;
  exeptionElements.splice(elementIndex, 2);
  console.log(exeptionElements);
};

calculations(exeption);
