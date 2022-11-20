window.addEventListener("DOMContentLoaded", () => {
    const expressionBar = document.querySelector('.expression-bar');
    const resultBar = document.querySelector('.result-bar')
    const buttons = document.querySelectorAll(".btns");

    let expressionBarTextContent = "";

    buttons.forEach((button) => {
        button.addEventListener("click", event => {
            const clickedButton = event.target.textContent

            if (clickedButton !== "=") {
                expressionBarTextContent += clickedButton;
                expressionBar.textContent = expressionBarTextContent;
            } else {
                const result = calculate(expressionBarTextContent);
                console.log(result);
                resultBar.textContent = result;
            }
        });
    });
});

const operators = ['+', '-', '*', '/'];

function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function calculate(string) {
  // const [containsOperator, operator] = operatorFinder(string);
  if (containsOperator(string)) {
    const operator = operatorFinder(string);
    let indexOfOperator = string.indexOf(operator);
    let operand1 = "";
    for (let i = 0; i < indexOfOperator; i++) {
      const char = string[i];
      operand1 += char;
    }
    let operand2 = string.slice(indexOfOperator + 1, string.length);
    //Here//
    if (containsOperator(operand2)) {
      const updatedOperand2 = calculate(operand2);
      return selectOperatorFunctionAndCalculate(operator, Number(operand1), updatedOperand2);
    }
    // if (sign === "+") {
    //   const result = add(Number(operand1), Number(operand2));
    //   return result;
    // }
    const finalResult = selectOperatorFunctionAndCalculate(operator, operand1, operand2);
    return finalResult;
  } else {
    const finalResult = Number(string);
    return finalResult;
  }
}

function containsOperator(string) {
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (operators.includes(char)) {
      return true;
    }
  }
  return false;
}

function operatorFinder(string) {
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (operators.includes(char)) {
      const operator = char;
      return operator;
    }
  }
}

function selectOperatorFunctionAndCalculate(operator, operand1, operand2) {
  if (operator === "+") {
    const result = add(Number(operand1), Number(operand2));
    return (Math.round(result * 100) / 100).toFixed(2);
  } else if (operator === "-") {
    const result = sub(Number(operand1), Number(operand2));
    return (Math.round(result * 100) / 100).toFixed(2);
  } else if (operator === "*") {
    const result = mul(Number(operand1), Number(operand2));
    return (Math.round(result * 100) / 100).toFixed(2);
  } else if (operator === "/") {
    const result = divide(Number(operand1), Number(operand2));
    return (Math.round(result * 100) / 100).toFixed(2);
  }
}
