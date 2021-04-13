// calculator object to track values
const calculator = {
    operator: null,
    operand: null,
    waitForOperand: false,
    outputNum: '0'
}

// this updates calculator screen output
function updateScreen() {
    const output = document.querySelector('.output');
    output.value = calculator.outputNum;
}

// this handles numbers pressed
function input(number) {
    const outputNum = calculator.outputNum;
    // appends number to output if it's not zero
    if (outputNum === '0') {
        calculator.outputNum = number;
    } else {
        calculator.outputNum = outputNum + number;
    }
}

// handles when operators are pressed
function handleOperator(nextOperator) {
    const operand = calculator.operand;
    const operator = calculator.operand;
    const outputNum = calculator.outputNum;
    const numFromStr = parseFloat(outputNum);

    //verifies numFromStr is a number, and operand is empty, then assign num to operand
    if (!isNaN(numFromStr) && operand === null) {
        calculator.operand = numFromStr;
    }

    calculator.waitForOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

updateScreen();

document.querySelector('.calculator-buttons').addEventListener('click', function (event) {
    // checks if target clicked is a button
    if (!event.target.matches('button')) {
        return;
    }

    // when reset button is clicked
    if (event.target.classList.contains('reset')) {
        console.log('reset', event.target.innerText);
        return;
    }

    // when backspace button is clicked
    if (event.target.classList.contains('backspace')) {
        console.log('backspace', event.target.innerText);
        return;
    }

    //when any operator is clicked
    if (event.target.classList.contains('operator')) {
        handleOperator(event.target.innerText);
        updateScreen();
        return;
    }

    // if it doesnt hit any of the above return statements, then it's a number
    console.log('operand', event.target.innerText);
    input(event.target.innerText);
    updateScreen();
})

