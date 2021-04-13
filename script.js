// calculator object to track values
const calculatorObj = {
    operator: null,
    operand: null,
    waitForOperand: false,
    outputNum: '0'
}

// this updates calculator screen output
function updateScreen() {
    const output = document.querySelector('.output');
    output.value = calculatorObj.outputNum;
}

// this handles numbers pressed
function input(number) {
    const outputNum = calculatorObj.outputNum;
    const waitForOperand = calculatorObj.waitForOperand;
    // this ensures second operand is not appended to first operand
    if (waitForOperand === true) {
        calculatorObj.outputNum = number;
        calculatorObj.waitForOperand = false;
    } else {
        // appends number to output if it's not zero
        if (outputNum === '0') {
            calculatorObj.outputNum = number;
        } else {
            calculatorObj.outputNum = outputNum + number;
        }
    }
}

// handles when operators are pressed
function handleOperators(nextOperator) {
    const operand = calculatorObj.operand;
    const operator = calculatorObj.operator;
    const outputNum = calculatorObj.outputNum;
    const numFromStr = parseFloat(outputNum);
    
    //verifies numFromStr is a number, and operand is empty, then assign num to operand
    if (!isNaN(numFromStr) && operand === null) {
        calculatorObj.operand = numFromStr;
    } else if (operator) {
        const calculation = calculate(operand, numFromStr, operator);
        calculatorObj.firstOperand = calculation;
        calculatorObj.outputNum = String(calculation);
    }
    //updates calculator object with next operator
    calculatorObj.operator = nextOperator;
    calculatorObj.waitForOperand = true;
    console.log(calculatorObj);
}

//this resets the calculator object back to default values
function reset() {
    calculatorObj.operator = null;
    calculatorObj.operand = null;
    calculatorObj.waitForOperand = false;
    calculatorObj.outputNum = '0';
}

// this handles backspace button event
function backspace() {
    const outputNum = calculatorObj.outputNum;

    //returns if value is 0
    if (outputNum === '0' || outputNum === 0) {
        return;
    } else if (outputNum > 0 && outputNum < 10) {
        //reset display to zero if backspacing on single digit number
        calculatorObj.outputNum = '0';
        return;
    }

    // removes last character from display, which is like backspacing
    calculatorObj.outputNum = outputNum.slice(0, -1);
}

// this handles actual mathematical operations. pass in operator and both operands and returns calculated result
function calculate(operand1, operand2, operator) {
    // each case is an artithmetic operator
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '÷':
            return operand1 / operand2;
        case '×':
            return operand1 * operand2;
        case '=':
            return operand2;
    }
}

//update screen with default value of 0
updateScreen();

document.querySelector('.calculator-buttons').addEventListener('click', function (event) {
    // checks if target clicked is a button
    if (!event.target.matches('button')) {
        return;
    }

    // when reset button is clicked
    if (event.target.classList.contains('reset')) {
        console.log('reset', event.target.innerText);
        reset();
        updateScreen();
        return;
    }

    // when backspace button is clicked
    if (event.target.classList.contains('backspace')) {
        console.log('backspace', event.target.innerText);
        backspace();
        updateScreen();
        return;
    }

    //when any operator is clicked
    if (event.target.classList.contains('operator')) {
        handleOperators(event.target.innerText);
        updateScreen();
        return;
    }

    // if it doesnt hit any of the above return statements, then it's a number
    console.log('operand', event.target.innerText);
    input(event.target.innerText);
    updateScreen();
})

