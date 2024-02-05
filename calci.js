let display = document.getElementById('display');

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    display.value += operator;
}

function appendDecimal() {
    if (!display.value.includes('.')) {
        display.value += '.';
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLastCharacter() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const result = Function('"use strict";return (' + display.value + ')')();
        
        // Check if the result is an integer or float
        display.value = Number.isInteger(result) ? result : (Math.abs(result % 1) !== 0 ? result.toFixed(2) : result);

        // Add open and close braces to the display
        display.value = display.value.replace(/\(/g, "(").replace(/\)/g, ")");
    } catch (error) {
        display.value = 'Error';
    }
}
