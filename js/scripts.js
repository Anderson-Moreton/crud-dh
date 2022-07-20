class Calculator {

    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
    }

    clearValues() {
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
    }

    checkLastDigit(input, upperValue, reg) {

        if ((
                !reg.test(input) &&
                !reg.test(upperValue.substr(upperValue.length - 1))
            )) {
            return true;
        } else {
            return false;
        }

    }

    //Sum method
    sum(n1, n2) {
        return parseFloat(n1) + parseFloat(n2);
    }

    //subtraction method
    subtraction(n1, n2) {
        return parseFloat(n1) - parseFloat(n2);
    }

    //Multiplication method
    multiplication(n1, n2) {
        return parseFloat(n1) * parseFloat(n2);
    }

    //Division method
    division(n1, n2) {
        return parseFloat(n1) / parseFloat(n2);
    }

    //Update values
    refreshValues(total) {
        this.upperValue.textContent = total;
        this.resultValue.textContent = total;
    }

    //Solve the operation
    resolution() {

        //explode a string into an array
        let upperValueArray = (this.upperValue.textContent).split(" ");
        //result of the operation
        let result = 0;

        for (let i = 0; i <= upperValueArray.length; i++) {

            let operation = 0;
            let actualItem = upperValueArray[i];

            //Do the multiplication
            if (actualItem == "x") {
                result = calc.multiplication(upperValueArray[i - 1], upperValueArray[i + 1]);
                operation = 1;
                //Do the division
            } else if (actualItem == "/") {
                result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1]);
                operation = 1;
                //checks if the array still has multiplication and division to be done
            } else if (!upperValueArray.includes('x') && !upperValueArray.includes('/')) {
                //Sum e Subtraction
                if (actualItem == "+") {
                    result = calc.sum(upperValueArray[i - 1], upperValueArray[i + 1]);
                    operation = 1;
                } else if (actualItem == "-") {
                    result = calc.subtraction(upperValueArray[i - 1], upperValueArray[i + 1]);
                    operation = 1;
                }
            }

            //Update array values ​​for next iteration
            if (operation) {
                //Previous index in the result of the operation
                upperValueArray[i - 1] = result;
                //Removes items already used for the operation
                upperValueArray.splice(i, 2);
                //Update index value
                i = 0;
            }

        }

        if (result) {
            calc.reset = 1;
        }

        //Update the totals
        calc.refreshValues(result);

    }

    btnPress() {

        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;
        //Check if you have numbers
        var reg = new RegExp('^\\d+$');

        //If you need to reset, clear the display
        if (calc.reset && reg.test(input)) {
            upperValue = '0';
        }

        //clear the reset prop
        calc.reset = 0;

        //Clear screen
        if (input == 'AC') {

            calc.clearValues();

        } else if (input == '=') {

            calc.resolution();

        } else {

            //Check if need to add or not
            if (calc.checkLastDigit(input, upperValue, reg)) {
                return false;
            }

            //Add spaces to operators
            if (!reg.test(input)) {
                input = ` ${input} `;
            }

            if (upperValue == "0") {
                if (reg.test(input)) {
                    calc.upperValue.textContent = input;
                }
            } else {
                calc.upperValue.textContent += input;
            }

        }

    }
}

//Start Object
let calc = new Calculator;

// Start btns
let buttons = document.querySelectorAll('.btn');

//map all buttons
for (let i = 0; buttons.length > i; i++) {
    buttons[i].addEventListener('click', calc.btnPress);
}