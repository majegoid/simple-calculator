// state
let runningTotal = 0;
let currentOperator = undefined;
let displayValue = '';

// get access to elements
let keyClearDiv = document.querySelector('#key-clear');
let keyDeleteDiv = document.querySelector('#key-delete');

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

let keyPlusDiv = document.querySelector('#key-plus');
let keySubtractDiv = document.querySelector('#key-subtract');
let keyMultiplyDiv = document.querySelector('#key-multiply');
let keyDivideDiv = document.querySelector('#key-divide');

let keyPeriodDiv = document.querySelector('#key-period');
let keyEqualsDiv = document.querySelector('#key-equals');

let displayDiv = document.querySelector('#calculator-display');

// add event listeners
key7Div.onclick = (e) => {
  displayValue += e.currentTarget.id.split('-')[1];
};

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operatorFunc, a, b) {
  operatorFunc(a, b);
}

function updateDisplay() {
  
}
