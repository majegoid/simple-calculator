// state
let operandA = undefined;
let operandB = undefined;
let operator = undefined;
let operatorFunc = undefined;
let expressionString = '';
let resultString = '0';

// document queries
// number keys
let key0Div = document.querySelector('#key-0');
let key1Div = document.querySelector('#key-1');
let key2Div = document.querySelector('#key-2');
let key3Div = document.querySelector('#key-3');
let key4Div = document.querySelector('#key-4');
let key5Div = document.querySelector('#key-5');
let key6Div = document.querySelector('#key-6');
let key7Div = document.querySelector('#key-7');
let key8Div = document.querySelector('#key-8');
let key9Div = document.querySelector('#key-9');
// operator keys
let keyPlusDiv = document.querySelector('#key-plus');
let keySubtractDiv = document.querySelector('#key-subtract');
let keyMultiplyDiv = document.querySelector('#key-multiply');
let keyDivideDiv = document.querySelector('#key-divide');
let keyEqualsDiv = document.querySelector('#key-equals');
// expression management keys (change numbers, clear state)
let keyClearDiv = document.querySelector('#key-clear');
let keyDeleteDiv = document.querySelector('#key-delete');
let keyPeriodDiv = document.querySelector('#key-period');
// displays
let expressionDisplayDiv = document.querySelector('#expression-display');
let resultDisplayDiv = document.querySelector('#result-display');

// add event listeners
// number keys
key0Div.onclick = handleNumberKeyPress;
key1Div.onclick = handleNumberKeyPress;
key2Div.onclick = handleNumberKeyPress;
key3Div.onclick = handleNumberKeyPress;
key4Div.onclick = handleNumberKeyPress;
key5Div.onclick = handleNumberKeyPress;
key6Div.onclick = handleNumberKeyPress;
key7Div.onclick = handleNumberKeyPress;
key8Div.onclick = handleNumberKeyPress;
key9Div.onclick = handleNumberKeyPress;
// operator keys
keyPlusDiv.onclick = handleOperatorKeyPress;
keySubtractDiv.onclick = handleOperatorKeyPress;
keyMultiplyDiv.onclick = handleOperatorKeyPress;
keyDivideDiv.onclick = handleOperatorKeyPress;
// misc keys
keyEqualsDiv.onclick = handleEqualsKeyPress;
keyClearDiv.onclick = handleClearKeyPress;
keyPeriodDiv.onclick = handlePeriodKeyPress;
// keyDeleteDiv.onclick = handleDeleteKeyPress;

// operation functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// event handlers
// function to handle all number key presses
function handleNumberKeyPress(e) {
  let inputNumberAsString = e.currentTarget.id.split('-')[1];
  let inputNumber = Number(inputNumberAsString);

  // case where there is no value for the left operand A
  if (operandA === undefined) {
    operandA = inputNumber;
    // case where resultString is not '0' - append the operand
    if (resultString !== '0') {
      resultString += inputNumberAsString;
    }
    // case where resultString is '0' - replace with the operand
    if (resultString === '0') {
      resultString = inputNumberAsString;
    }
    expressionString += inputNumberAsString;
    updateDisplays();
    return;
  }

  // when operand A, operator, and operand B are given
  if (operandA !== undefined && operator !== undefined && operandB !== undefined) {
    let operandBAsString = String(operandB) + String(inputNumber);
    operandB = Number(operandBAsString);
    resultString = operandBAsString;
    expressionString += String(inputNumber);
    updateDisplays();
    return;
  }

  // when operand A is given and operator is not given
  if (operandA !== undefined && operator === undefined) {
    let operandAAsString = String(operandA);
    operandA = Number(operandAAsString + inputNumberAsString);
    operandAAsString = String(operandA);
    resultString = operandAAsString;
    expressionString = operandAAsString;
    updateDisplays();
    return;
  }

  // when operand A and operator are given
  if (operandA !== undefined && operator !== undefined) {
    operandB = inputNumber;
    resultString = inputNumberAsString;
    expressionString += ` ${inputNumberAsString}`;
    updateDisplays();
    return;
  }
}

// function to handle all operator key presses
function handleOperatorKeyPress(e) {
  // exit if waiting on operandB
  if (operandA !== undefined && operator !== undefined) {
    return;
  }

  // based on key id, set operatorFunc and operator
  let keyId = e.currentTarget.id;
  switch (keyId) {
    case 'key-plus':
      operatorFunc = add;
      operator = '+';
      break;
    case 'key-subtract':
      operatorFunc = subtract;
      operator = '-';
      break;
    case 'key-multiply':
      operatorFunc = multiply;
      operator = '*';
      break;
    case 'key-divide':
      operatorFunc = divide;
      operator = '/';
      break;
    default:
      throw new Error('Invalid operator id.');
  }

  // case where the operator is input first and operandA is undefined
  if (operandA === undefined && resultString === '0') {
    operandA = Number(resultString);
    // resultString stays '0'
    expressionString += `${operandA} ${operator}`;
    updateDisplays();
    return;
  }

  // case where the operation is done
  if (operatorFunc && operandA !== undefined && operandB !== undefined) {
    let result = operate(operatorFunc, operandA, operandB);
    // update operandA to be the result
    return;
  }

  // case where the operator is appended to the left operand
  if (operandA !== undefined && operandB === undefined) {
    expressionString += ` ${operator}`;
    resultString = String(operandA);
    updateDisplays();
    return;
  }
}

function handleEqualsKeyPress(e) {
  if (operandA !== undefined && operandB !== undefined && operatorFunc) {
    // perform operation
    let result = operate(operatorFunc, operandA, operandB);
    // set up operands A and B for the next operation
    operandA = Number(result);
    operandB = undefined;
    // set up display values
    expressionString += ' =';
    resultString = String(result);
    updateDisplays();
    // set expression to operandA for the next operation
    expressionString = String(operandA);
  }
}

function handleClearKeyPress(e) {
  operandA = undefined;
  operandB = undefined;
  operator = undefined;
  // expressionString must have an operator to be cleared properly
  expressionString = '';
  resultString = '0';
  updateDisplays();
}

function handlePeriodKeyPress(e) {
  console.log('period key pressed');
  // case where operandA should be edited
  if (operandA !== undefined && operator === undefined) {
    expressionString = String(operandA) + '.';
    resultString = String(operandA) + '.';
    updateDisplays();
  }
  // case where operandB should be edited
}

// all operator keys call operate (+,-,*,/,=)
function operate(operatorFunc, a, b) {
  if (operatorFunc && a !== undefined && b !== undefined) return operatorFunc(a, b);
}

function updateDisplays(
  resultDisplayValue = resultString,
  expressionDisplayValue = expressionString
) {
  resultDisplayDiv.textContent = resultDisplayValue;
  // clear button case
  if (expressionDisplayValue === '') {
    expressionDisplayDiv.textContent = expressionDisplayValue;
    return;
  }
  // update expressionDisplayDiv only if expressionDisplayValue contains an operator:
  let expressionContainsOperator = Array.from(expressionDisplayValue).find((c) =>
    ['+', '-', '*', '/', '='].includes(c)
  );
  if (expressionContainsOperator) {
    expressionDisplayDiv.textContent = expressionDisplayValue;
  }
}

// update displays initially
updateDisplays();
