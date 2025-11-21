// calculator.js

//selecting elements
const previousDisplay = document.getElementById('previous-value');
const currentDisplay = document.getElementById('current-value');
const buttons = document.querySelectorAll('button');

// variables to hold state
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let currentValue = '0';


// function to update display
function updateDisplay() {
    //shows current value on the calculator display
    currentDisplay.textContent = currentValue;
    //shows previous value and operator
    if(firstOperand!==null &&  operator!==null){
        previousDisplay.textContent = `${firstOperand} ${operator}`;
    } else {
        previousDisplay.textContent = '';
    }
}

// handle number input or decimal point
function inputDigit(num) {
    
    if (waitingForSecondOperand) {
        currentValue = num;
        waitingForSecondOperand = false;
    } else {
        if (currentValue === '0' && num !== '.') {
            currentValue = num;
        } else {
            if (num === '.' && currentValue.includes('.')) {
                return; // prevent multiple decimals
            }
            currentValue += num;

        }
 

    }

    
}

// handle operator input
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentValue);
    
     if (firstOperand === null) {
                firstOperand = inputValue;
            } else if (operator) {
                const result = calculate(firstOperand, inputValue, operator);
                currentValue = String(result);
                firstOperand = result;
            }

            waitingForSecondOperand = true;
            operator = nextOperator;
        }
    
    
// do calculation
function calculate(first, second, operator) {
    // do basic arithmetic 
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second === 0 ? 'Error' : first / second;
        default:
            return second;
    }
}

// handle equals
function handleEquals() {
    const inputValue = parseFloat(currentValue);
    if (operator && !waitingForSecondOperand) {
        const result = calculate(firstOperand, inputValue, operator);
        currentValue = String(result);
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }
}

// handle clear
function handleClear() {
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    currentValue = '0';
}




// add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;

    if (!isNaN(action) || action === '.') {
            inputDigit(action);
        } else if (action === '+' || action === '-' || action === '*' || action === '/') {
            handleOperator(action);
        } else if (action === '=') {
            handleEquals();
        } else if (action === 'AC' || action === 'clear') {
            handleClear();
        }else if (action === 'backspace') {
            currentValue = currentValue.slice(0, -1) || '0';

        }else if (action === "percent"){
        const inputValue = parseFloat(currentValue);
        currentValue = String(inputValue / 100);
    }else if(action === 'sign'){
        const inputValue = parseFloat(currentValue);
        currentValue = String(-inputValue);

    }

        updateDisplay();
    });
});



function keydownHandler(event) {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        inputDigit(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperator(key);
    } else if (key === '=' || key === 'Enter') {
        handleEquals();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        handleClear();
    }else if (key === 'Backspace') {
        currentValue = currentValue.slice(0, -1) || '0';
    }else if (key === "%"){
        const inputValue = parseFloat(currentValue);
        currentValue = String(inputValue / 100);
    }
    updateDisplay();
}




// add keyboard support
document.addEventListener('keydown', keydownHandler);

// initial display update
updateDisplay();





