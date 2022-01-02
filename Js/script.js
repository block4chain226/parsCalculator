//F that check operators in mass by index
let digit = 0;
let temp = 0;
let result = 0;
let itteration = 0;
firstItteration = true;
let exeption = "2*(-810)*2-232*44-(22+(2/18*5)*(45+3)-(94*1-34/3)*4)*1";
let operatorsStack = [];
let exeptionElements;
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
  //console.log(closedScopesCountCheck(exeptionElement));
  console.log(exeptionElement);
  //scopeStack(exeptionElement);
  return exeptionElement;
};

/////////////////////////////////negative digits
const digitalSign = (exeptionElement) => {
  exeptionElement.forEach((element, index) => {
    if (
      (exeptionElement[index] === "-" && index === 0) ||
      (exeptionElement[index] === "-" && exeptionElement[index - 1] == "(") ||
      (exeptionElement[index] === "-" && exeptionElement[index - 1] === "-")
    ) {
      exeptionElement[index] += exeptionElement[index + 1];
      exeptionElement.splice(index + 1, 1);
    }
    if (
      (exeptionElement[index] === "*" ||
        exeptionElement[index] === "+" ||
        exeptionElement[index] === "/") &&
      exeptionElement[index + 1] === "-"
    ) {
      exeptionElement[index + 1] += exeptionElement[index + 2];
      exeptionElement.splice(index + 2, 1);
    }
  });
};
exeptionElements = checkDigit(exeption.split(""));
/////////////////////////////////Main calculations
const calculations = (ex) => {
  //let exeptionElements = checkDigit(exeption.split(""));
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
};

//////////////////////////////////////////////////Equations

//////////////////////////////////Scopes
const scopes = (scopeIndex, exeptionElements) => {
  let endScope = exeptionElements.indexOf(")");
  let inScopeLength = endScope - scopeIndex - 1;
  //let scopeElements = exeptionElements.splice(scopeIndex + 1, inScopeLength);
  let localScopes = closedScopesCountCheck(scopeIndex, exeptionElements);
  if (localScopes.isconformity == true) {
    calculateAllInnerScopes(
      scopeIndex,
      localScopes.openedCount,
      exeptionElements
    );
  }
  ///////////////////////////////////////////////check if we have scopes!!!!!!!!!!!!!
  if (exeptionElements.indexOf("(") !== -1) {
    endScope = exeptionElements.indexOf(")");
    if (endScope !== -1) {
      for (let i = scopeIndex + 1; i < endScope; i++) {
        switch (exeptionElements[i]) {
          case "*":
            itteration++;
            multiply(
              exeptionElements[i - 1],
              i,
              exeptionElements[i + 1],
              exeptionElements
            );
            endScope = exeptionElements.indexOf(")");
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
            endScope = exeptionElements.indexOf(")");
            i = i - 1;
            break;
          default:
        }
        //exeptionElements[elementIndex - 1] = res;
      }
    }
  }
  ///// + -
  endScope = exeptionElements.indexOf(")");
  if (endScope !== -1) {
    for (let i = scopeIndex + 1; i < endScope; i++) {
      switch (exeptionElements[i]) {
        case "+":
          itteration++;
          addition(
            exeptionElements[i - 1],
            i,
            exeptionElements[i + 1],
            exeptionElements
          );
          endScope = exeptionElements.indexOf(")");
          i = i - 1;
          break;
        //////////////////////////////////Main Problem!!!!!!!!!!!!!!!
        case "-":
          itteration++;
          substruct(
            exeptionElements[i - 1],
            i,
            exeptionElements[i + 1],
            exeptionElements
          );

          endScope = exeptionElements.indexOf(")");
          i = i - 1;
          break;

        default:
      }
      //exeptionElements[elementIndex - 1] = res;
    }
    exeptionElements.splice(scopeIndex, 1);
    exeptionElements.splice(scopeIndex + 1, 1);
  }
};
////////////////////////////////////////////////Priority

const localScopesCountCheck = (firstScope, ex) => {};

/////////////////////////////////ScopesStack
const scopeStack = (exeptionElements) => {
  let scopesArray = [];
  exeptionElements.forEach((element, index) => {
    if (element === "(") {
      while (exeptionElements[index] !== ")") {
        scopesArray.push(exeptionElements[index]);
        index++;
      }
      scopesArray.push(exeptionElements[index]);
    }
  });
  return scopesArray;
};

////////////////////////////////closedScopesCountCheck
const closedScopesCountCheck = (firstScope, exeptionElements) => {
  let scopes = {
    isconformity: false,
    openedCount: 0,
    closedCount: 0,
  };
  // ex.forEach((element, index) => {
  for (let i = firstScope; i < exeptionElements.length; i++) {
    if (exeptionElements[i] === "(") {
      scopes.openedCount++;
    } else if (exeptionElements[i] === ")") {
      scopes.closedCount++;
    }
  }
  if (
    scopes.openedCount &&
    scopes.closedCount !== 0 &&
    scopes.openedCount === scopes.closedCount
  ) {
    console.log(`scopes count = ${scopes.openedCount}`);
    scopes.isconformity = true;
    return scopes;
  } else {
    return scopes;
  }
};

////////////////////////////////calculateAllInnerScopes
const calculateAllInnerScopes = (
  firstScope,
  openedScopesCount,
  exeptionElements
) => {
  let beginScope = exeptionElements.indexOf("(", firstScope + 1);
  beginScope = exeptionElements.indexOf("(", beginScope + 1);
  let endScope = exeptionElements.indexOf(")", beginScope + 1);
  let destroyScopes = false;
  for (let j = 0; j < openedScopesCount; j++) {
    for (let i = beginScope; i < endScope; i++) {
      switch (exeptionElements[i]) {
        case "*":
          multiply(
            exeptionElements[i - 1],
            i,
            exeptionElements[i + 1],
            exeptionElements
          );
          i = i - 1;
          if (
            exeptionElements[i - 1] === "(" &&
            exeptionElements[i + 1] === ")"
          ) {
            exeptionElements.splice(i - 1, 1);
            exeptionElements.splice(i, 1);
            ///////////////////////////////////////////////////////////?
            beginScope = exeptionElements.indexOf("(", beginScope);
          }

          endScope = exeptionElements.indexOf(")", beginScope);
          break;
        case "/":
          devision(
            exeptionElements[i - 1],
            i,
            exeptionElements[i + 1],
            exeptionElements
          );
          i = i - 1;
          if (
            exeptionElements[i - 1] === "(" &&
            exeptionElements[i + 1] === ")"
          ) {
            exeptionElements.splice(i - 1, 1);
            exeptionElements.splice(i, 1);
            ///////////////////////////////////////////////////////////?
            beginScope = exeptionElements.indexOf("(", beginScope);
          }

          endScope = exeptionElements.indexOf(")", beginScope);
          break;
      }
    }
    destroyScopes = false;
    //while (destroyScopes === false) {
    for (let i = beginScope; i < endScope; i++) {
      switch (exeptionElements[i]) {
        case "+":
          addition(
            exeptionElements[i - 1],
            i,
            exeptionElements[i + 1],
            exeptionElements
          );

          i = i - 1;
          if (
            exeptionElements[i - 1] === "(" &&
            exeptionElements[i + 1] === ")"
          ) {
            exeptionElements.splice(i - 1, 1);
            exeptionElements.splice(i, 1);
            ///////////////////////////////////////////////////////////?
            beginScope = exeptionElements.indexOf("(", beginScope);
            endScope = exeptionElements.indexOf(")", beginScope);
            i = endScope;
            //destroyScopes = true;
          }

          endScope = exeptionElements.indexOf(")", beginScope);
          break;
        case "-":
          substruct(
            exeptionElements[i - 1],
            i,
            exeptionElements[i + 1],
            exeptionElements
          );
          i = i - 1;
          if (
            exeptionElements[i - 1] === "(" &&
            exeptionElements[i + 1] === ")"
          ) {
            exeptionElements.splice(i - 1, 1);
            exeptionElements.splice(i, 1);
            ///////////////////////////////////////////////////////////?
            beginScope = exeptionElements.indexOf("(", beginScope);
            endScope = exeptionElements.indexOf(")", beginScope);
            i = endScope;

            //destroyScopes = true;
          }

          endScope = exeptionElements.indexOf(")", beginScope);
          break;
      }
    }
    //}
    //openedScopesCount--;
  }
};

///////////////////////////////////////////////////////Scopes calculations
const scopesMultiply = () => {};

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

calculations(exeptionElements);
