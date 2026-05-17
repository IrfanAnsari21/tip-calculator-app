const bill = document.getElementById('bill-amount');
const people = document.getElementById('number-of-people');
const tipBtn = document.querySelectorAll('.tip-btn');
const customBtn = document.getElementById('custom-tip-btn');
const tipAmount = document.getElementById('tip-per-person');
const totalAmount = document.getElementById('total-per-person');
const resetBtn = document.querySelector('.reset-btn');


function calculateResult() {
    const tipPerPerson = bill.value * tipPercentage / people.value;
    const totalPerPerson = tipPerPerson + (bill.value / people.value);

    if (bill.value > 0 && people.value > 0) {
        tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
        resetBtn.disabled = false;
    }
    else {
        resetResult();
    }
}

bill.addEventListener('input', () => {
    if (bill.value <= 0) {
        bill.classList.add('error');
    }
    else {
        bill.classList.remove('error');
    }
    calculateResult();
});


people.addEventListener('input', () => {
    const errorMsg = document.querySelector('.error-msg');

    if (people.value <= 0) {
        people.classList.add('error');
        errorMsg.style.visibility = "visible";
    }
    else {
        people.classList.remove('error');
        errorMsg.style.visibility = "hidden";
    }
    calculateResult();
});


let tipPercentage = 0;

tipBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('selected')) {
            btn.classList.remove('selected');
            tipPercentage = 0;
        }
        else {
            tipBtn.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            tipPercentage = btn.value / 100;
        }
        calculateResult();
    });
});

customBtn.addEventListener('input', () => {
    tipPercentage = customBtn.value / 100;
    calculateResult();
});

function resetInput() {
    bill.value = '';
    people.value = '';
    customBtn.value = '';
    tipPercentage = 0;
    tipBtn.forEach(btn => btn.classList.remove('selected'));
}

function resetResult() {
    tipAmount.textContent = `$0.00`;
    totalAmount.textContent = `$0.00`;
}

resetBtn.addEventListener('click', () => {
    resetInput();
    resetResult();
})