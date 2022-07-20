class Calculator {

    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
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

    btnPress() {

        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;
        //Check if you have numbers
        var reg = new RegExp('^\\d+$');

        //Check if need to add or not
        if(calc.checkLastDigit(input, upperValue, reg)) {
            return false;
        }

        if (upperValue == "0") {
            calc.upperValue.textContent = input;
        } else {
            calc.upperValue.textContent += input;
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